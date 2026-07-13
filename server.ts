import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Helper function to thoroughly extract any nested string values from any error object
function getFullErrorString(error: any): string {
  if (!error) return "";
  const parts: string[] = [];
  
  if (typeof error === "string") return error;
  if (error.message) parts.push(error.message);
  if (error.status) parts.push(String(error.status));
  if (error.code) parts.push(String(error.code));
  
  if (error.error) {
    if (typeof error.error === "string") parts.push(error.error);
    else {
      if (error.error.message) parts.push(error.error.message);
      if (error.error.status) parts.push(error.error.status);
      if (error.error.code) parts.push(String(error.error.code));
    }
  }

  try {
    parts.push(error.toString());
  } catch (e) {}

  try {
    // Recursively collect all string values to completely bypass JSON.stringify's non-enumerable properties limit on Errors
    const collectStrings = (obj: any, depth = 0) => {
      if (depth > 5 || !obj || typeof obj !== "object") return;
      for (const key of Object.keys(obj)) {
        try {
          const val = obj[key];
          if (typeof val === "string" || typeof val === "number") {
            parts.push(String(val));
          } else if (typeof val === "object" && val !== null) {
            collectStrings(val, depth + 1);
          }
        } catch (e) {}
      }
    };
    collectStrings(error);
  } catch (e) {}

  return parts.join(" ").toLowerCase();
}

// Helper function to handle robust retries with exponential backoff and fallback models
async function generateContentWithRetry(
  client: GoogleGenAI,
  params: {
    model: string;
    contents: any;
    config?: any;
  },
  maxRetries = 2
): Promise<any> {
  const modelsToTry = ["gemini-3.5-flash", "gemini-2.5-flash", "gemini-2.5-pro"];
  let currentModelIndex = modelsToTry.indexOf(params.model);
  if (currentModelIndex === -1) {
    modelsToTry.unshift(params.model);
    currentModelIndex = 0;
  }

  while (currentModelIndex < modelsToTry.length) {
    const selectedModel = modelsToTry[currentModelIndex];
    const currentParams = { ...params, model: selectedModel };
    let delay = 1000;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[Gemini API] Requesting model "${selectedModel}" (Attempt ${attempt + 1}/${maxRetries + 1})...`);
        return await client.models.generateContent(currentParams);
      } catch (error: any) {
        const errorStr = getFullErrorString(error);
        const isTransient = 
          error.status === "UNAVAILABLE" || 
          error.code === 503 || 
          errorStr.includes("503") || 
          errorStr.includes("unavailable") || 
          errorStr.includes("high demand") || 
          errorStr.includes("temporary") ||
          errorStr.includes("overloaded");

        if (isTransient) {
          // If we hit a high demand / overloaded error, let's immediately try the next fallback model (if any)
          // instead of waiting through long exponential delays, ensuring instant success for the user.
          if (currentModelIndex + 1 < modelsToTry.length) {
            console.warn(`[Gemini API] Model "${selectedModel}" hit high demand / 503. Cascading immediately to fallback model "${modelsToTry[currentModelIndex + 1]}"...`);
            currentModelIndex++;
            break; // Break out of retry loop to transition to the next model
          }

          // If no fallback models are left, do a standard exponential backoff retry
          if (attempt < maxRetries) {
            console.warn(`[Gemini API] 503/Transient error on last fallback "${selectedModel}". Retrying in ${delay}ms... (Attempt ${attempt + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
            continue;
          }
        }

        // For non-transient errors, or if we've run out of options, propagate the error
        if (!isTransient || (attempt === maxRetries && currentModelIndex === modelsToTry.length - 1)) {
          console.error(`[Gemini API] Fatal error calling "${selectedModel}":`, error);
          throw error;
        }
      }
    }
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse large JSON payloads (important for base64 file uploads)
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Shared Gemini client on the server
  let ai: GoogleGenAI | null = null;

  function getGeminiClient(): GoogleGenAI {
    const currentApiKey = process.env.GEMINI_API_KEY;
    if (!currentApiKey) {
      throw new Error(
        "GEMINI_API_KEY environment variable is required. " +
        "If running locally, please create a '.env' file in the root of your project directory and add 'GEMINI_API_KEY=your_actual_api_key'. " +
        "If running in Google AI Studio, please set the GEMINI_API_KEY in the Settings > Secrets menu."
      );
    }
    if (!ai) {
      ai = new GoogleGenAI({
        apiKey: currentApiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return ai;
  }

  // API Route: Health Check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      apiKeyConfigured: !!process.env.GEMINI_API_KEY,
    });
  });

  // API Route: Generate Criteria from Job Description
  app.post("/api/generate-criteria", async (req, res) => {
    try {
      const { title, descriptionText, experienceLevel } = req.body;
      if (!title || !descriptionText) {
        return res.status(400).json({ error: "Job title and description are required." });
      }

      const client = getGeminiClient();

      const prompt = `
        Analyze the following Job Description and extract:
        1. An optimized list of 3-5 core visual Evaluation Criteria (like "Technical Expertise", "Experience level", "System Design", "Communication Skills", etc.).
           For each, define a weight (integer, 1-100, where sum of weights doesn't necessarily have to be 100 but they represent relative importance), and a clear evaluation instruction description.
        2. A list of 5-10 key specific skills (tools, programming languages, methodologies, certifications) required.

        Job Title: ${title}
        Experience Level: ${experienceLevel || "Not specified"}
        Job Description:
        ${descriptionText}
      `;

      const response = await generateContentWithRetry(client, {
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              skillsRequired: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of key skills, technologies, or concepts required for the position."
              },
              criteria: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Name of the criteria, e.g. Technical Proficiency, System Design, Communication" },
                    weight: { type: Type.INTEGER, description: "Importance weight from 10 to 100 (multiple of 5 or 10)" },
                    description: { type: Type.STRING, description: "Detailed description of what to look for in the candidate's resume for this criteria." }
                  },
                  required: ["name", "weight", "description"]
                }
              }
            },
            required: ["skillsRequired", "criteria"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response from Gemini API");
      }

      const parsedData = JSON.parse(responseText.trim());
      res.json(parsedData);

    } catch (error: any) {
      console.error("Error generating criteria:", error);
      res.status(500).json({
        error: error.message || "Failed to generate evaluation criteria from job description."
      });
    }
  });

  // API Route: Screen and Rank Resume
  app.post("/api/screen-resume", async (req, res) => {
    try {
      const { fileName, fileType, fileBase64, resumeText, jobDescription } = req.body;

      if (!jobDescription) {
        return res.status(400).json({ error: "Job description is required for screening." });
      }

      if (!fileBase64 && !resumeText) {
        return res.status(400).json({ error: "Either resume text or a base64 file upload is required." });
      }

      const client = getGeminiClient();

      const jdJson = JSON.stringify(jobDescription);
      const prompt = `
        You are an expert HR Recruitment Specialist and Technical Screener.
        Evaluate the candidate's resume against the following Job Description (which contains required skills and customized evaluation criteria).

        Job Description Details:
        ${jdJson}

        CRITICAL EVALUATION GUIDELINES REGARDING EXPERIENCE LEVEL (CURRENT LEVEL IS "${jobDescription.experienceLevel}"):
        - Check the experienceLevel "${jobDescription.experienceLevel}" and the job description text.
        - Since the current job is set to "${jobDescription.experienceLevel}", if this level is "Entry Level" (or any entry/junior variant):
          1. ABSOLUTELY DO NOT penalize the candidate for having less than 3-5 years or 5+ years of professional experience.
          2. NEVER state as a weakness, gap, or issue that they "lack 5+ years of experience", "lack senior experience", or "lack leadership/authority."
          3. Evaluate them strictly based on their personal projects, academic achievements, internships, bootcamps, technical aptitude, and eager growth potential.
          4. Adjust the score standards: compare them relative to a highly capable entry-level peer, rather than a veteran or senior engineer.
        - If the job is indeed 'Senior' or 'Lead' (e.g. 5+ years), then continue to evaluate strictly for deep seniority, leadership, and system-level authority as normal.

        Evaluate carefully and generate:
        1. Candidate's basic info: Name, Email, Phone. (If not found, use "Unknown" or look at the file header).
        2. Match Score (0 to 100): Be objective and critical. A high match score (85+) should only be awarded to highly qualified candidates matching all key requirements.
        3. Criteria Scores: For EACH criteria item specified in the Job Description, provide:
           - The exact criteria name.
           - A score from 0 to 100.
           - A brief sentence explaining the reasoning.
        4. Summary: A concise, highly-professional 2-3 sentence executive summary of the candidate's qualifications for this role.
        5. Strengths: 3 to 5 clear, bulletproof strengths this candidate has for this specific job.
        6. Weaknesses: 2 to 4 honest areas of improvement or gaps in their experience relative to this job description.
        7. Missing Skills: List specific technologies or skills mentioned in the job description's 'skillsRequired' list that are completely absent or not mentioned in the candidate's resume.
        8. Recommendation Action ('shortlist' | 'interview' | 'review' | 'reject'). Select:
           - 'shortlist': Score is very high (80+) and fits the profile exceptionally.
           - 'interview': Strong candidate with minor gaps.
           - 'review': Edge-case or needs human double-check.
           - 'reject': Gaps are too big or score is low (<60).
        9. Recommendation Notes: A 1-2 sentence recommendation for the hiring manager.
        10. Tailored Interview Questions: 3 high-quality interview questions specifically targeting this candidate's potential weaknesses or background relative to the job.
        11. Professional Email Draft: Draft an elegant, warm, and highly professional email to this candidate. It should be written in a human, encouraging tone:
            - If action is 'shortlist' or 'interview': write an invite for a quick chat / initial interview screen.
            - If action is 'review': write a "thank you, our team is reviewing" email.
            - If action is 'reject': write a highly professional, respectful, and polite rejection email that thanks them for their time.

        Evaluate using the attached resume content.
      `;

      let contentsPayload: any[] = [];

      if (fileBase64 && fileType) {
        // Strip out base64 header if present
        const cleanBase64 = fileBase64.replace(/^data:.*?;base64,/, "");
        contentsPayload.push({
          inlineData: {
            data: cleanBase64,
            mimeType: fileType,
          },
        });
      } else if (resumeText) {
        contentsPayload.push({
          text: `Candidate Resume Text:\n${resumeText}`,
        });
      }

      contentsPayload.push({
        text: prompt,
      });

      const response = await generateContentWithRetry(client, {
        model: "gemini-3.5-flash",
        contents: contentsPayload,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Candidate's full name" },
              email: { type: Type.STRING, description: "Candidate's email address" },
              phone: { type: Type.STRING, description: "Candidate's phone number" },
              matchScore: { type: Type.INTEGER, description: "Overall match score percentage (0-100)" },
              criteriaScores: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "The exact name of the criteria item evaluated" },
                    score: { type: Type.INTEGER, description: "Criteria score percentage (0-100)" },
                    feedback: { type: Type.STRING, description: "Specific explanation of this score based on the resume" }
                  },
                  required: ["name", "score", "feedback"]
                }
              },
              summary: { type: Type.STRING, description: "2-3 sentence executive summary" },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5 key strengths" },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2-4 gaps or areas of improvement" },
              missingSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of missing skills from the job description list" },
              recAction: { type: Type.STRING, description: "Recommendation status: shortlist, interview, review, reject" },
              recNotes: { type: Type.STRING, description: "1-2 sentence recommendation notes" },
              interviewQuestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 tailored interview questions" },
              emailDraft: { type: Type.STRING, description: "Ready-to-send professional email to the candidate" }
            },
            required: [
              "name",
              "email",
              "phone",
              "matchScore",
              "criteriaScores",
              "summary",
              "strengths",
              "weaknesses",
              "missingSkills",
              "recAction",
              "recNotes",
              "interviewQuestions",
              "emailDraft"
            ]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response received from Gemini model.");
      }

      const candidateResult = JSON.parse(responseText.trim());
      res.json(candidateResult);

    } catch (error: any) {
      console.error("Error screening resume:", error);
      res.status(500).json({
        error: error.message || "Failed to screen candidate resume. Please make sure the file is valid and API key is set."
      });
    }
  });

  // Serve static assets in production or use Vite dev server in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

startServer();
