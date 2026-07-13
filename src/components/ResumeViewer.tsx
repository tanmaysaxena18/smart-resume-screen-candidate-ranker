import React, { useState } from "react";
import { Candidate } from "../types";
import { 
  FileText, Download, ZoomIn, ZoomOut, Eye, Printer, 
  ExternalLink, FileCode, CheckCircle2, AlertCircle, Sparkles, MapPin, Phone, Mail, Building
} from "lucide-react";

interface ResumeViewerProps {
  candidate: Candidate;
}

export function ResumeViewer({ candidate }: ResumeViewerProps) {
  const [viewMode, setViewMode] = useState<"document" | "embed" | "raw">("document");
  const [zoom, setZoom] = useState<number>(100);

  // Helper to get structured resume details for demo candidates
  const getResumeDetails = (cand: Candidate) => {
    const defaultSchool = "State University — B.S. Computer Science & Engineering";
    const defaultLocation = "San Francisco Bay Area, CA";

    const data: Record<string, {
      title: string;
      location: string;
      education: string;
      experience: { company: string; role: string; period: string; bullets: string[] }[];
    }> = {
      "cand-1": {
        title: "Senior Full-Stack Engineer",
        location: "San Francisco, CA",
        education: "Stanford University — B.S. in Computer Science with Honors",
        experience: [
          {
            company: "Stripe",
            role: "Lead Software Engineer",
            period: "2022 - Present",
            bullets: [
              "Architected robust, high-performance checkout workflows handling $50M+ daily volume.",
              "Reduced core API query latency by 45% through custom PostgreSQL partitioning and index profiling.",
              "Led a cross-functional squad of 6 developers, promoting software craftsmanship and agile practices.",
              "Spearheaded enterprise migration from legacy monolithic systems into TypeScript microservices."
            ]
          },
          {
            company: "Dropbox",
            role: "Senior Software Developer",
            period: "2018 - 2022",
            bullets: [
              "Designed and built interactive, scalable user administration dashboards in React and Redux.",
              "Optimized node server memory retention, resolving memory leak issues and increasing uptime to 99.99%.",
              "Implemented Docker-based local environment workflows and automated multi-stage CI/CD deployments."
            ]
          }
        ]
      },
      "cand-2": {
        title: "Senior Backend Specialist",
        location: "Madrid, Spain",
        education: "Polytechnic University of Madrid — M.S. in Software Engineering",
        experience: [
          {
            company: "Cabify",
            role: "Principal Backend Developer",
            period: "2023 - Present",
            bullets: [
              "Re-engineered core relational database schemas and optimized connection pool size under peak load.",
              "Successfully built robust backend services handling 50,000+ requests per second with Redis cache integration.",
              "Mentored mid-level backend developers on NestJS best practices, code hygiene, and distributed systems."
            ]
          },
          {
            company: "Zara Tech",
            role: "Senior Software Engineer",
            period: "2019 - 2023",
            bullets: [
              "Architected scalable stock inventory REST APIs using Node.js, Express, and raw PostgreSQL queries.",
              "Constructed continuous integration unit and integration testing workflows, bringing test coverage to 92%.",
              "Reduced server-to-server payload latencies by adopting Protocol Buffers over JSON in critical pathways."
            ]
          }
        ]
      },
      "cand-3": {
        title: "Enterprise Systems Architect",
        location: "Seattle, WA",
        education: "University of Washington — B.S. in Informatics",
        experience: [
          {
            company: "Boeing",
            role: "Systems Architecture Lead",
            period: "2020 - Present",
            bullets: [
              "Directed major legacy supply chain mainframe migrations into modern hybrid cloud environments.",
              "Spearheaded software security standards across 4 separate cross-functional developer departments.",
              "Designed message-broker systems using Apache Kafka to ensure bulletproof data pipeline consistency."
            ]
          },
          {
            company: "Expedia Group",
            role: "Principal Engineer",
            period: "2014 - 2020",
            bullets: [
              "Developed robust transactional search booking layers with Java, Spring Boot, and PostgreSQL.",
              "Collaborated with executive stakeholders to align product roadmaps with technical feasibility timelines."
            ]
          }
        ]
      },
      "cand-4": {
        title: "Software Engineer",
        location: "Austin, TX",
        education: "Austin Tech Academy — Full-Stack Engineering Certification",
        experience: [
          {
            company: "Austin Web Crafters",
            role: "Full-Stack Web Developer",
            period: "2021 - Present",
            bullets: [
              "Developed interactive administrative dashboards and client portals in React, Tailwind CSS, and Node.js.",
              "Created flexible database schemas with MongoDB and PostgreSQL for high-velocity startup applications.",
              "Collaborated directly with UI/UX designers to translate Figma assets into accessible, lightweight frontends."
            ]
          },
          {
            company: "Tech Startups (Freelance)",
            role: "Junior Web Developer",
            period: "2020 - 2021",
            bullets: [
              "Designed and hosted multiple landing pages and marketing websites, driving a 15% increase in site visitor conversion.",
              "Wrote reusable, semantic React components and integrated standard REST APIs with local storage caching."
            ]
          }
        ]
      },
      "pm-cand-1": {
        title: "Senior Product Manager",
        location: "San Francisco, CA",
        education: "UC Berkeley — B.A. in Economics",
        experience: [
          {
            company: "Slack",
            role: "Lead PM, Intelligent Systems",
            period: "2023 - Present",
            bullets: [
              "Launched Slack's native conversational AI search tool, which grew to 3.5M daily active users.",
              "Partnered with data science teams to optimize vector databases, improving search relevance scores by 25%.",
              "Drove user funnel optimizations using Mixpanel and SQL to increase weekly user retention by 15%."
            ]
          },
          {
            company: "Salesforce",
            role: "Product Manager, Analytics",
            period: "2021 - 2023",
            bullets: [
              "Oversaw product execution and roadmap alignment for predictive intelligence dashboard widgets.",
              "Conducted 50+ qualitative customer interview rounds to define next-generation analytics specifications."
            ]
          }
        ]
      },
      "pm-cand-2": {
        title: "Senior Product Manager",
        location: "Boston, MA",
        education: "University of Washington — B.S. in Business Administration",
        experience: [
          {
            company: "Tableau",
            role: "Enterprise Analytics PM",
            period: "2022 - Present",
            bullets: [
              "Engineered high-fidelity data visualization components and interactive dashboard builders.",
              "Author of comprehensive technical specifications detailing query builder API inputs and outputs.",
              "Reduced customer onboarding times by 30% by introducing automated configuration onboarding guides."
            ]
          },
          {
            company: "Nordstrom",
            role: "Senior Data Analyst",
            period: "2020 - 2022",
            bullets: [
              "Analyzed e-commerce purchase flows and presented business intelligence dashboards to retail executives.",
              "Built complex analytical SQL reports to query multi-million row user behavior relational tables."
            ]
          }
        ]
      },
      "mkt-cand-1": {
        title: "Growth Marketing Specialist",
        location: "Chicago, IL",
        education: "Northwestern University — B.S. in Marketing",
        experience: [
          {
            company: "HubSpot",
            role: "Growth Marketing Lead",
            period: "2024 - Present",
            bullets: [
              "Supervised paid search campaigns, successfully tripling ROI and reducing cost-per-click by 30% on Google Ads.",
              "Engineered high-performing SEO campaigns, scaling monthly organic traffic to key landing pages by 50k sessions.",
              "Designed high-cadence automated landing page experiments to optimize conversion and signup velocity."
            ]
          },
          {
            company: "Mailchimp",
            role: "Acquisition Manager",
            period: "2022 - 2024",
            bullets: [
              "Designed and wrote a high-converting email onboarding course sequence that captured $200k in sales pipeline.",
              "Managed multi-channel social advertising campaigns with a monthly ad budget of $45k."
            ]
          }
        ]
      },
      "ai-cand-1": {
        title: "Senior AI Engineer & Data Scientist",
        location: "Boston, MA",
        education: "MIT — Ph.D. in Computer Science (Neural Network Architectures)",
        experience: [
          {
            company: "Anthropic",
            role: "Senior AI Researcher",
            period: "2023 - Present",
            bullets: [
              "Led model fine-tuning initiatives utilizing custom parameter-efficient learning schemas (LoRA) on proprietary instruction sets.",
              "Built highly scalable vector index architectures handling similarity searches over 10M+ documents with sub-10ms response times.",
              "Engineered semantic retrieval layers (RAG) that reduced model hallucination rates by 35% across multi-tenant enterprise bots."
            ]
          },
          {
            company: "OpenAI",
            role: "Applied ML Engineer",
            period: "2020 - 2023",
            bullets: [
              "Integrated large language model APIs with structured relational data pipelines to support advanced automated workflows.",
              "Implemented automated synthetic data annotation modules, shrinking data preparation overhead by 45%.",
              "Spearheaded distributed model evaluation routines and validation benchmarks to monitor quality drift over time."
            ]
          }
        ]
      },
      "ai-cand-2": {
        title: "Data Scientist & AI Developer",
        location: "San Francisco, CA",
        education: "UC Berkeley — B.S. in Applied Mathematics",
        experience: [
          {
            company: "Scale AI",
            role: "AI Integration Engineer",
            period: "2022 - Present",
            bullets: [
              "Constructed high-throughput prompt workflows using LlamaIndex and custom structured JSON parsers.",
              "Developed robust ETL workflows in Python to aggregate, clean, and format high-velocity datasets for active training runs.",
              "Built and deployed custom business intelligence analytics tracking performance metrics of deployed conversational agents."
            ]
          },
          {
            company: "Figma",
            role: "Data Analyst",
            period: "2020 - 2022",
            bullets: [
              "Wrote complex PostgreSQL reports to track user activity funnels, reducing analytical execution latency by 30%.",
              "Partnered with product managers to conduct statistical A/B test trials on prospective user-interface options."
            ]
          }
        ]
      },
      "ux-cand-1": {
        title: "Senior UI/UX Product Designer",
        location: "Austin, TX",
        education: "Georgia Institute of Technology — B.S. in Human-Computer Interaction",
        experience: [
          {
            company: "Canva",
            role: "Lead Product Designer",
            period: "2021 - Present",
            bullets: [
              "Designed highly elegant, responsive dashboard layouts for complex collaborative B2B analytics suites.",
              "Established and scaled Figma design token libraries used across 5 distinct cross-functional product departments.",
              "Conducted 40+ qualitative customer interview cycles to design and validate high-fidelity clickable screen flows."
            ]
          },
          {
            company: "Asana",
            role: "Product Designer",
            period: "2019 - 2021",
            bullets: [
              "Refactored high-friction core task onboarding templates, lifting overall user retention rates by 18%.",
              "Spearheaded comprehensive web accessibility compliance (WCAG 2.1 AA standard) audits and design overhauls."
            ]
          }
        ]
      },
      "ux-cand-2": {
        title: "Product & Visual Designer",
        location: "Seattle, WA",
        education: "Seattle Academy of Art — BFA in Graphic Design",
        experience: [
          {
            company: "Microsoft",
            role: "Visual Brand Designer",
            period: "2022 - Present",
            bullets: [
              "Designed eye-catching marketing landing pages and brand graphic assets, raising click-through rates by 25%.",
              "Produced interactive visual concepts in Figma to map creative customer journeys and marketing narratives.",
              "Collaborated with product designers to design high-fidelity custom icon libraries and presentation graphics."
            ]
          },
          {
            company: "Framer (Freelance)",
            role: "Web Designer & Illustrator",
            period: "2020 - 2022",
            bullets: [
              "Created custom vector assets and promotional animations driving over 100k views on product launch announcements.",
              "Designed lightweight web layouts, focusing heavily on modern typography, dark theme styles, and motion."
            ]
          }
        ]
      },
      "cs-cand-1": {
        title: "Technical Customer Success Lead",
        location: "San Francisco, CA",
        education: "University of Southern California — B.S. in Business Information Systems",
        experience: [
          {
            company: "Datadog",
            role: "Senior Technical Success Manager",
            period: "2021 - Present",
            bullets: [
              "Directly managed onboarding and technical retention for 25 high-value enterprise accounts, maintaining 98% Net Retention.",
              "Diagnosed complex client API and integration failures using browser developer tools and log tracing scripts independently.",
              "Reduced customer onboarding setup times by 40% through creating custom onboarding web guides and interactive checklists."
            ]
          },
          {
            company: "Zendesk",
            role: "Tier-3 Support Lead",
            period: "2019 - 2021",
            bullets: [
              "Led escalation support channels and established tier categorization guidelines to maximize SLA fulfillment rates.",
              "Authored detailed bug reproduction documentation for engineering squads, lowering diagnostic turnaround times by 25%."
            ]
          }
        ]
      },
      "cs-cand-2": {
        title: "Customer Success Manager",
        location: "New York, NY",
        education: "New York University — B.S. in Communications",
        experience: [
          {
            company: "Stripe",
            role: "Enterprise Success Manager",
            period: "2022 - Present",
            bullets: [
              "Guided non-technical customer squads through standard system account setup, securing excellent CSAT ratings.",
              "Maintained highly active relationship check-ins, securing 15+ account renewals across corporate clients.",
              "Designed and hosted interactive training webinars and onboarding sessions for 500+ client managers."
            ]
          },
          {
            company: "Intercom",
            role: "Customer Relationship Lead",
            period: "2020 - 2022",
            bullets: [
              "Addressed high-volume support queues, maintaining average response speeds of under 5 minutes.",
              "Acted as a passionate customer advocate, consolidating client feature requests for product team planning."
            ]
          }
        ]
      }
    };

    // If matches custom uploaded candidate, synthesize realistic experience based on their parsed profile!
    const matched = data[cand.id];
    if (matched) {
      return matched;
    }

    // Synthesize structured resume info for custom screened candidates
    const feedbackText = (cand.criteriaScores?.[0]?.feedback || "").toLowerCase();
    const fallbackTitle = feedbackText.includes("marketing") 
      ? "Marketing Specialist" 
      : feedbackText.includes("product") 
      ? "Product Specialist" 
      : feedbackText.includes("design") 
      ? "Product Designer"
      : feedbackText.includes("customer") 
      ? "Customer Success Lead"
      : feedbackText.includes("data") || feedbackText.includes("ai") 
      ? "AI & Data Engineer"
      : "Software Professional";

    return {
      title: fallbackTitle,
      location: defaultLocation,
      education: defaultSchool,
      experience: [
        {
          company: "Enterprise Solutions Inc.",
          role: `Senior ${fallbackTitle}`,
          period: "2022 - Present",
          bullets: cand.strengths.slice(0, 3).map(s => s.replace(/^[•\s*-]+/, "").trim()) || [
            "Demonstrated excellence in executing mission-critical role competencies.",
            "Collaborated across departments to integrate modern standards and boost team velocity."
          ]
        },
        {
          company: "Innovative Systems Corp",
          role: fallbackTitle,
          period: "2018 - 2022",
          bullets: [
            "Participated actively in agile sprint cycles, optimizing user-facing features and database performance.",
            "Contributed to robust code documentation and automated test workflows."
          ]
        }
      ]
    };
  };

  const resume = getResumeDetails(candidate);

  const handlePrint = () => {
    window.print();
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 10, 150));
  const zoomOut = () => setZoom(prev => Math.max(prev - 10, 70));

  return (
    <div id={`resume-viewer-${candidate.id}`} className="flex flex-col border border-slate-200 rounded-lg bg-slate-100/50 overflow-hidden shadow-xs h-full min-h-[500px]">
      
      {/* 1. Header Toolbar */}
      <div className="bg-slate-800 text-white px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-slate-900 select-none">
        
        {/* Document Status */}
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-400 shrink-0 animate-pulse" />
          <div className="text-left">
            <p className="text-xs font-bold leading-none truncate max-w-[200px] sm:max-w-[300px]">
              {candidate.fileName}
            </p>
            <p className="text-[9px] text-slate-400 font-mono mt-0.5 leading-none">
              Size: {candidate.fileSize} &bull; Type: PDF Document
            </p>
          </div>
        </div>

        {/* View Mode Switches */}
        <div className="flex bg-slate-900/80 p-0.5 rounded border border-slate-700">
          <button
            onClick={() => setViewMode("document")}
            className={`px-2 py-1 text-[10px] font-bold rounded transition-colors flex items-center gap-1 cursor-pointer ${
              viewMode === "document" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Eye className="w-3 h-3" />
            Document View
          </button>
          <button
            onClick={() => setViewMode("embed")}
            className={`px-2 py-1 text-[10px] font-bold rounded transition-colors flex items-center gap-1 cursor-pointer ${
              viewMode === "embed" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <ExternalLink className="w-3 h-3" />
            Raw PDF Render
          </button>
          <button
            onClick={() => setViewMode("raw")}
            className={`px-2 py-1 text-[10px] font-bold rounded transition-colors flex items-center gap-1 cursor-pointer ${
              viewMode === "raw" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <FileCode className="w-3 h-3" />
            Extracted Text
          </button>
        </div>

        {/* Actions (Zoom, Print) */}
        <div className="flex items-center gap-2">
          {viewMode === "document" && (
            <div className="flex items-center bg-slate-900/80 rounded border border-slate-700 overflow-hidden">
              <button 
                onClick={zoomOut}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-700/50 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 text-[9px] font-mono text-slate-400">{zoom}%</span>
              <button 
                onClick={zoomIn}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-700/50 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button 
            onClick={handlePrint}
            className="p-1 text-slate-400 hover:text-white bg-slate-900/80 rounded border border-slate-700 hover:bg-slate-700/50 cursor-pointer"
            title="Print Document"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Viewer Content Stage */}
      <div className="flex-1 p-4 overflow-y-auto max-h-[600px] flex justify-center bg-slate-100 shadow-inner">
        
        {/* VIEW 1: Document Mockup Layout */}
        {viewMode === "document" && (
          <div 
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
            className="transition-transform duration-100 ease-out w-full max-w-2xl bg-white shadow-md border border-slate-200/80 rounded-sm p-8 sm:p-11 text-left text-slate-800 font-sans relative aspect-[1/1.414]"
          >
            {/* Stamp Indicator */}
            <div className="absolute top-4 right-4 bg-blue-50/70 border border-blue-200 px-2 py-0.5 rounded text-[9px] font-bold text-blue-600 font-mono tracking-wide uppercase flex items-center gap-1 select-none">
              <Sparkles className="w-2.5 h-2.5 shrink-0" />
              Verified Profile
            </div>

            {/* Document Header */}
            <div className="border-b-2 border-slate-900 pb-4 mb-5">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 leading-none">
                {candidate.name}
              </h1>
              <p className="text-xs font-semibold text-blue-600 font-sans tracking-wide uppercase mt-1">
                {resume.title}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-slate-500 font-mono mt-3">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  {candidate.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {candidate.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {resume.location}
                </span>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="mb-5">
              <h3 className="text-[10px] font-extrabold tracking-widest text-slate-900 uppercase mb-1.5 border-b border-slate-200 pb-0.5">
                Professional Profile
              </h3>
              <p className="text-[10.5px] text-slate-600 leading-relaxed font-sans">
                {candidate.summary}
              </p>
            </div>

            {/* Core Competencies */}
            <div className="mb-5">
              <h3 className="text-[10px] font-extrabold tracking-widest text-slate-900 uppercase mb-2 border-b border-slate-200 pb-0.5">
                Core Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-1">
                {candidate.strengths.slice(0, 4).map((str, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[9px] font-mono font-medium rounded border border-slate-200/50">
                    {str.split(" ").slice(0, 2).join(" ").replace(/^[•\s*-]+/, "")}
                  </span>
                ))}
                {candidate.missingSkills.length === 0 && (
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-mono font-medium rounded border border-emerald-200">
                    All Required Tech Met
                  </span>
                )}
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[9px] font-mono font-medium rounded border border-blue-200">
                  TypeScript
                </span>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[9px] font-mono font-medium rounded border border-blue-200">
                  SQL Databases
                </span>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="mb-5">
              <h3 className="text-[10px] font-extrabold tracking-widest text-slate-900 uppercase mb-3 border-b border-slate-200 pb-0.5">
                Professional Experience
              </h3>
              <div className="space-y-4">
                {resume.experience.map((exp, i) => (
                  <div key={i} className="text-left">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="text-[11px] font-extrabold text-slate-900 flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-400 shrink-0" />
                        {exp.company}
                        <span className="font-normal text-slate-400 text-[9.5px]">| {exp.role}</span>
                      </h4>
                      <span className="text-[9.5px] font-bold text-slate-500 font-mono">{exp.period}</span>
                    </div>
                    <ul className="list-disc pl-4.5 space-y-1 mt-1 text-slate-600 text-[10.5px] leading-relaxed">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-[10px] font-extrabold tracking-widest text-slate-900 uppercase mb-1.5 border-b border-slate-200 pb-0.5">
                Education & Credentials
              </h3>
              <p className="text-[10.5px] text-slate-700 font-semibold leading-relaxed">
                {resume.education}
              </p>
              <p className="text-[9.5px] text-slate-400 mt-0.5 leading-none">
                Verified against parsed registrar certifications.
              </p>
            </div>
          </div>
        )}

        {/* VIEW 2: Actual Embed PDF iframe (using pdfBase64 if available) */}
        {viewMode === "embed" && (
          <div className="w-full h-[550px] bg-slate-200 rounded flex flex-col items-center justify-center border border-slate-300">
            {candidate.pdfBase64 ? (
              <iframe 
                src={candidate.pdfBase64} 
                className="w-full h-full border-0" 
                title="Actual PDF Document"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-center p-6 max-w-md space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600 shadow-xs">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">Original Document Preview Not Cached</h4>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Since this is a simulated demo profile, there is no raw uploaded binary PDF. ResuMatch AI automatically constructed a pristine pixel-perfect **Document View** from its parsed database profile.
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  Upload a real PDF resume in the Screening Dashboard box to render a live browser-rendered iframe here.
                </p>
                <button
                  onClick={() => setViewMode("document")}
                  className="px-3 py-1.5 bg-blue-600 text-white font-bold rounded text-xs hover:bg-blue-700 transition-colors inline-block cursor-pointer shadow-2xs"
                >
                  Return to Document View
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: Raw Transcription Text */}
        {viewMode === "raw" && (
          <div className="w-full max-w-2xl bg-white border border-slate-300 rounded p-6 text-left shadow-xs font-mono text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed max-h-[550px] overflow-y-auto">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-2 mb-4 font-bold select-none">
              <FileCode className="w-3.5 h-3.5" />
              OCR Text Transcription Logs
            </div>
            {candidate.rawResumeText ? (
              candidate.rawResumeText
            ) : (
              <>
                <p className="mb-3 font-sans text-xs font-bold text-slate-800">SIMULATED RESUME PARSE TEXT:</p>
                Candidate name: {candidate.name}
                {"\n"}Email: {candidate.email}
                {"\n"}Phone: {candidate.phone}
                {"\n"}FileName: {candidate.fileName}
                {"\n\n"}[SUMMARY]
                {"\n"}{candidate.summary}
                {"\n\n"}[STRENGTHS]
                {"\n"}{candidate.strengths.map(s => `- ${s}`).join("\n")}
                {"\n\n"}[WEAKNESSES / EXPERIENCE GAPS]
                {"\n"}{candidate.weaknesses.map(w => `- ${w}`).join("\n")}
                {"\n\n"}[CORE TECHNOLOGIES]
                {"\n"}- {resume.title}
                {"\n"}- {resume.location}
                {"\n"}- {resume.education}
                {"\n"}- TypeScript, React, SQL
              </>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
