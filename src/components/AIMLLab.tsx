import React, { useState } from "react";
import { 
  Brain, Terminal, Code, Cpu, Sliders, Database, 
  HelpCircle, ChevronRight, BarChart2, BookOpen, AlertCircle, FileText, CheckCircle2
} from "lucide-react";

interface AIMLLabProps {
  onClose: () => void;
  jobTitle: string;
  skillsRequired: string[];
}

export function AIMLLab({ onClose, jobTitle, skillsRequired }: AIMLLabProps) {
  const [activeTab, setActiveTab] = useState<"architecture" | "playground" | "parameters" | "comparison">("architecture");
  
  // Playground state for temperature demonstration
  const [temperature, setTemperature] = useState<number>(0.1);
  const [topP, setTopP] = useState<number>(0.95);
  const [topK, setTopK] = useState<number>(40);

  // Example Prompt
  const promptTemplate = `You are an expert HR Recruitment Specialist and Technical Screener.
Evaluate the candidate's resume against the following Job Description (which contains required skills and customized evaluation criteria).

Job Description Details:
{
  "title": "${jobTitle}",
  "skillsRequired": ${JSON.stringify(skillsRequired.slice(0, 5))},
  "criteria": [ ... ]
}

Evaluate carefully and generate:
1. Candidate's basic info: Name, Email, Phone.
2. Match Score (0 to 100): Be objective and critical.
3. Criteria Scores: For EACH criteria item specified in the Job Description, provide a score from 0-100 and brief explanation.
4. Summary, Strengths, Weaknesses, and Missing Skills list.
5. Recommendation Action ('shortlist' | 'interview' | 'review' | 'reject').
6. Custom tailored interview questions and professional outreach email draft.`;

  // Example Response Schema (Structured Output representation)
  const schemaJSON = `{
  "type": "OBJECT",
  "properties": {
    "name": { "type": "STRING" },
    "email": { "type": "STRING" },
    "phone": { "type": "STRING" },
    "matchScore": { "type": "INTEGER" },
    "criteriaScores": {
      "type": "ARRAY",
      "items": {
        "properties": {
          "name": { "type": "STRING" },
          "score": { "type": "INTEGER" },
          "feedback": { "type": "STRING" }
        },
        "required": ["name", "score", "feedback"]
      }
    },
    "strengths": { "type": "ARRAY", "items": { "type": "STRING" } },
    "weaknesses": { "type": "ARRAY", "items": { "type": "STRING" } },
    "recAction": { "type": "STRING" },
    "interviewQuestions": { "type": "ARRAY", "items": { "type": "STRING" } }
  }
}`;

  // Describe effect of temperature
  const getTemperatureExplanation = (temp: number) => {
    if (temp < 0.2) {
      return "Highly Deterministic: Ideal for technical screening, factual extraction, and mathematical grading. Generates identical, highly-constrained candidate profiles on multiple runs.";
    }
    if (temp < 0.6) {
      return "Balanced Reasoning: Adds slight phrasing variety to recommendation emails and summaries while maintaining precise, strict score evaluations.";
    }
    return "Creative/Hallucination-Prone: Too erratic for professional screening. Might invent skills, overestimate match scores, or write highly poetic but inappropriate outreach emails.";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative bg-slate-950 text-slate-100 rounded-xl shadow-2xl border border-slate-800 max-w-4xl w-full flex flex-col h-[85vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white shadow-md animate-pulse">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                Generative AI & ML Engine Lab 
                <span className="text-[9px] bg-blue-500/20 text-blue-400 font-mono px-2 py-0.5 rounded border border-blue-500/30 font-bold uppercase tracking-widest">Active Academic Core</span>
              </h2>
              <p className="text-[10px] text-slate-400 font-mono -mt-0.5">
                Inspect LLM Engineering Metrics, Prompts, and Comparative Paradigms
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xs font-mono border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded transition-all bg-slate-900 cursor-pointer"
          >
            Exit Lab
          </button>
        </div>

        {/* Dashboard Tabs bar */}
        <div className="flex border-b border-slate-800 bg-slate-900/50 shrink-0">
          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-4 py-3 border-b-2 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === "architecture" ? "border-blue-500 text-blue-400 bg-slate-950/40" : "border-transparent text-slate-400 hover:text-slate-200"}`}
          >
            <Cpu className="w-3.5 h-3.5" />
            01. System Architecture Map
          </button>
          <button
            onClick={() => setActiveTab("playground")}
            className={`px-4 py-3 border-b-2 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === "playground" ? "border-blue-500 text-blue-400 bg-slate-950/40" : "border-transparent text-slate-400 hover:text-slate-200"}`}
          >
            <Terminal className="w-3.5 h-3.5" />
            02. Prompts & JSON Schema
          </button>
          <button
            onClick={() => setActiveTab("parameters")}
            className={`px-4 py-3 border-b-2 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === "parameters" ? "border-blue-500 text-blue-400 bg-slate-950/40" : "border-transparent text-slate-400 hover:text-slate-200"}`}
          >
            <Sliders className="w-3.5 h-3.5" />
            03. Hyperparameter Lab
          </button>
          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-4 py-3 border-b-2 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === "comparison" ? "border-blue-500 text-blue-400 bg-slate-950/40" : "border-transparent text-slate-400 hover:text-slate-200"}`}
          >
            <Database className="w-3.5 h-3.5" />
            04. BERT vs. Generative LLMs
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {/* TAB 1: System Architecture Map */}
          {activeTab === "architecture" && (
            <div className="space-y-6 animate-fade-in text-slate-300">
              <div className="bg-blue-950/20 border border-blue-900/40 p-4 rounded-lg">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest font-mono mb-1 flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-blue-400" />
                  How This Project Uses Machine Learning
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Unlike traditional hardcoded keyword match systems, **ResuMatch AI** uses an **unsupervised, deep-learning based LLM pipeline**. 
                  It ingests unstructured multimodal documents (PDF/Text) and maps them into a high-dimensional semantic space via attention-based transformers (Gemini-3.5-Flash). 
                  It then parses and generates deterministic, structured criteria evaluations directly based on the weights you provide.
                </p>
              </div>

              {/* Graphical Flow representation */}
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-3">Model Pipeline Workflow</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-stretch text-center">
                  
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded flex flex-col justify-between items-center">
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono font-bold mb-2">01. INGESTION</span>
                    <FileText className="w-6 h-6 text-slate-400 mb-1" />
                    <p className="text-[11px] font-bold text-slate-200">Unstructured Resume</p>
                    <p className="text-[9px] text-slate-500 font-mono mt-1">Raw PDF binary or text buffers uploaded by client.</p>
                  </div>

                  <div className="hidden md:flex items-center justify-center text-slate-600 font-bold">&rarr;</div>

                  <div className="p-3 bg-slate-900 border border-slate-800 rounded flex flex-col justify-between items-center">
                    <span className="text-[10px] bg-blue-950 text-blue-400 px-2 py-0.5 rounded font-mono font-bold mb-2">02. NORMALIZE</span>
                    <Cpu className="w-6 h-6 text-blue-400 mb-1" />
                    <p className="text-[11px] font-bold text-blue-200">Multimodal Context</p>
                    <p className="text-[9px] text-slate-500 font-mono mt-1">Files are converted into native tokens and formatted as an inline dataset payload.</p>
                  </div>

                  <div className="hidden md:flex items-center justify-center text-slate-600 font-bold">&rarr;</div>

                  <div className="p-3 bg-slate-900 border border-slate-800 rounded flex flex-col justify-between items-center">
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold mb-2">03. REASONING</span>
                    <Brain className="w-6 h-6 text-emerald-400 mb-1 animate-pulse" />
                    <p className="text-[11px] font-bold text-emerald-200">Gemini-3.5-Flash</p>
                    <p className="text-[9px] text-slate-500 font-mono mt-1">Model processes input against job descriptions using massive multi-billion parameter attention layers.</p>
                  </div>

                </div>
              </div>

              {/* Evaluation scoring algorithm formulation */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                <h4 className="text-xs font-bold text-slate-200 font-mono mb-2">Mathematical Formulation for Ranking</h4>
                <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-center text-sm my-2 text-emerald-400">
                  {"Match Score = \u2211 (Criteria Score\u1D62 \u00D7 (Weight\u1D62 / Total Weight))"}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  The model extracts a normalized continuous assessment <span className="text-slate-200 font-mono">Score&#7522; &isin; [0, 100]</span> for each customized criteria metric. 
                  These scores are linearly combined using the user-defined hyperparameter weight allocation to determine the absolute final decimal percentage, guaranteeing mathematically deterministic ranking despite the generative nature of the parser.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Prompts & JSON Schema */}
          {activeTab === "playground" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Prompt template panel */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">System Prompt Template</label>
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-mono">Input Context</span>
                  </div>
                  <pre className="flex-1 p-3 bg-slate-900 text-slate-300 font-mono text-[10px] leading-relaxed rounded border border-slate-800 overflow-x-auto whitespace-pre-wrap max-h-[350px]">
                    {promptTemplate}
                  </pre>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">
                    * The template forces the LLM to adopt a persona ("expert HR specialist") and evaluates specific criteria parameters.
                  </p>
                </div>

                {/* Structured schema panel */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Structured JSON Schema</label>
                    <span className="text-[9px] bg-blue-950 text-blue-400 px-1.5 py-0.2 rounded font-mono">API Enforcement</span>
                  </div>
                  <pre className="flex-1 p-3 bg-slate-900 text-slate-300 font-mono text-[10px] leading-relaxed rounded border border-slate-800 overflow-x-auto whitespace-pre-wrap max-h-[350px]">
                    {schemaJSON}
                  </pre>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">
                    * Utilizing <span className="text-blue-400 font-bold">responseSchema</span> forces the Gemini model to compile output as structured JSON. This prevents text output noise and ensures seamless full-stack data binding.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: Hyperparameter Lab */}
          {activeTab === "parameters" && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono mb-2 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-blue-400" />
                  Model Generation Hyperparameters
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Large Language Models generate text sequentially by sampling from a probability distribution of token candidates. 
                  Adjust the sliders below to explore how the server-side configuration affects output scoring.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/50 p-5 rounded-lg border border-slate-800">
                
                {/* Slider 1: Temperature */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-200 font-mono">Temperature</span>
                    <span className="text-xs font-bold text-blue-400 font-mono">{temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-[9px] text-slate-500 font-mono flex justify-between">
                    <span>0.0 (Deterministic)</span>
                    <span>1.0 (Creative)</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-850 text-[11px] text-slate-400 leading-normal min-h-[90px]">
                    {getTemperatureExplanation(temperature)}
                  </div>
                </div>

                {/* Slider 2: Top-P (Nucleus Sampling) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-200 font-mono">Top-P (Nucleus)</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">{topP}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1"
                    step="0.01"
                    value={topP}
                    onChange={(e) => setTopP(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-[9px] text-slate-500 font-mono flex justify-between">
                    <span>0.5 (Conservative)</span>
                    <span>1.0 (Full Pool)</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-850 text-[11px] text-slate-400 leading-normal min-h-[90px]">
                    {topP === 1 
                      ? "Deactivates Nucleus Sampling. All vocabulary tokens are considered, allowing highly creative sentence completions." 
                      : `Filters candidate tokens down to the top cumulative probability set of ${Math.round(topP * 100)}%. Greatly limits nonsense phrase generation.`}
                  </div>
                </div>

                {/* Slider 3: Top-K */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-200 font-mono">Top-K</span>
                    <span className="text-xs font-bold text-purple-400 font-mono">{topK}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={topK}
                    onChange={(e) => setTopK(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-[9px] text-slate-500 font-mono flex justify-between">
                    <span>K=1 (Strict)</span>
                    <span>K=100 (Unconstrained)</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded border border-slate-850 text-[11px] text-slate-400 leading-normal min-h-[90px]">
                    {topK <= 5 
                      ? "Extreme restriction. The model selects only from the top-most frequent vocabulary tokens. Highly repetitive sentences."
                      : `Considers only the top ${topK} most likely words at each token completion step. Ideal for maintaining general readability and grammatical fluidity.`}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: Comparison Study Table */}
          {activeTab === "comparison" && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-left font-sans text-slate-300">
                  <thead className="bg-slate-900 text-slate-100 font-mono text-[10px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Feature Metric</th>
                      <th className="px-4 py-3 text-red-400">TF-IDF / Cosine (Classic NLP)</th>
                      <th className="px-4 py-3 text-blue-400">BERT Embeddings (Traditional ML)</th>
                      <th className="px-4 py-3 text-emerald-400">Generative LLM (This Project)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 bg-slate-950 text-[11px]">
                    <tr>
                      <td className="px-4 py-3.5 font-bold font-mono text-slate-400">Search Paradigm</td>
                      <td className="px-4 py-3.5">Strict Keyword / Substring Matching</td>
                      <td className="px-4 py-3.5">Dense Vector Semantic Distance</td>
                      <td className="px-4 py-3.5 font-bold text-emerald-400">Attention-Based Cognitive Assessment</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3.5 font-bold font-mono text-slate-400">Handles Synonym Matching?</td>
                      <td className="px-4 py-3.5 text-red-500">❌ No (Matches only exact strings)</td>
                      <td className="px-4 py-3.5 text-emerald-400">✓ Yes (Via dense vector angles)</td>
                      <td className="px-4 py-3.5 text-emerald-400 font-bold">✓ Exceptional (Understands deep jargon)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3.5 font-bold font-mono text-slate-400">Experience Year Deduction?</td>
                      <td className="px-4 py-3.5 text-red-500">❌ No</td>
                      <td className="px-4 py-3.5 text-red-500">❌ Hard (Needs manual token parsers)</td>
                      <td className="px-4 py-3.5 text-emerald-400 font-bold">✓ Exceptional (Interprets historical ranges)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3.5 font-bold font-mono text-slate-400">Can Output Explanations?</td>
                      <td className="px-4 py-3.5 text-red-500">❌ No (Only returns float numbers)</td>
                      <td className="px-4 py-3.5 text-red-500">❌ No (Requires secondary networks)</td>
                      <td className="px-4 py-3.5 text-emerald-400 font-bold">✓ Full reasoning, tailored questions, emails</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3.5 font-bold font-mono text-slate-400">Multimodal (Reads PDF Images)</td>
                      <td className="px-4 py-3.5 text-red-500">❌ No</td>
                      <td className="px-4 py-3.5 text-red-500">❌ No (Text input only)</td>
                      <td className="px-4 py-3.5 text-emerald-400 font-bold">✓ Full native support (multimodal parsing)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-900/40 p-4 rounded border border-slate-800 flex gap-3 mt-4 items-start">
                <HelpCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-200 font-mono">Academic Project Summary Tip</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                    When presenting this project to your faculty, explain that while BERT is useful for raw sequence embedding similarity, a state-of-the-art recruiter workspace requires **generative orchestration and structured multi-criteria output**, which is natively accomplished here through server-side **structured JSON response schemas** over a **multimodal context window**.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono shrink-0 select-none">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Code className="w-3.5 h-3.5" /> Engine: Gemini-3.5-Flash</span>
            <span className="flex items-center gap-1"><Sliders className="w-3.5 h-3.5" /> Temp: {temperature}</span>
          </div>
          <div>
            ResuMatch Research Lab
          </div>
        </div>

      </div>
    </div>
  );
}
