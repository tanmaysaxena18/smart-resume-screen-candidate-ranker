import React, { useState, useEffect } from "react";
import { 
  Database, Search, Trash2, Download, UserPlus, Tag, Briefcase, 
  Calendar, X, Star, FileText, Check, AlertCircle, Share2, Sparkles
} from "lucide-react";
import { Candidate, JobDescription } from "../types";

interface StoredResume extends Candidate {
  roleTag: string;
  savedAt: string;
  savedBy: string;
}

interface ResumeBankProps {
  onClose: () => void;
  activeJob: JobDescription;
  onImportCandidate: (candidate: Candidate) => void;
  activeRecruiterName: string;
}

export function ResumeBank({ onClose, activeJob, onImportCandidate, activeRecruiterName }: ResumeBankProps) {
  const [storedResumes, setStoredResumes] = useState<StoredResume[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("all");
  const [importedStatus, setImportedStatus] = useState<string | null>(null);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);

  // Load stored resumes from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("resumatch_resume_bank");
      if (saved) {
        setStoredResumes(JSON.parse(saved));
      } else {
        // Seed with a couple of high-quality sample resumes in bank for immediate demo value
        const seedResumes: StoredResume[] = [
          {
            id: "bank-seed-1",
            name: "Dianne Russell",
            email: "dianne.russell@talentflow.dev",
            phone: "+1 (555) 019-2834",
            fileName: "Dianne_Russell_Fullstack_2026.pdf",
            fileSize: "142 KB",
            matchScore: 94,
            criteriaScores: [
              { name: "Technical Fit & Stack Alignment", score: 95, feedback: "Exceptional mastery of React 18, TypeScript, Node.js and Tailwind." },
              { name: "Experience & Track Record", score: 92, feedback: "4 years developing complex frontend architectures and state management." }
            ],
            summary: "Highly skilled Fullstack Engineer with comprehensive expertise in building secure, responsive cloud platforms.",
            strengths: ["Expert React/TypeScript state architecture", "Strong SQL & performance optimization", "Clean Code champion"],
            weaknesses: ["Fewer years of AWS infrastructure experience"],
            missingSkills: [],
            recAction: "shortlist",
            recNotes: "Met during tech meetup. Extremely sharp and very strong growth potential.",
            interviewQuestions: ["How do you handle performance bottleneck optimization in server-rendered React applications?"],
            emailDraft: "Hi Dianne, we were incredibly impressed by your resume...",
            parsedSuccess: true,
            roleTag: "Senior Fullstack Engineer",
            savedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            savedBy: "Sarah Jenkins"
          },
          {
            id: "bank-seed-2",
            name: "Marcus Aurelius",
            email: "marcus.philosophy@stoicdev.org",
            phone: "+1 (555) 777-1234",
            fileName: "Marcus_Aurelius_Senior_Backend.pdf",
            fileSize: "210 KB",
            matchScore: 91,
            criteriaScores: [
              { name: "Backend Architecture & Scaling", score: 94, feedback: "Outstanding backend engineering background with distributed systems and Postgres." }
            ],
            summary: "Backend Engineer with 8+ years building robust distributed services, resilient query pipelines, and high throughput APIs.",
            strengths: ["Distributed storage systems expert", "Impeccable database design paradigms", "Exceptional systems thinking"],
            weaknesses: ["No frontend React experience listed"],
            missingSkills: ["React 18", "Tailwind CSS"],
            recAction: "interview",
            recNotes: "Excellent fit for core engineering teams.",
            interviewQuestions: ["Can you explain your strategy for database partitioning at scale?"],
            emailDraft: "Hello Marcus, your background in stoic backend systems caught our eye...",
            parsedSuccess: true,
            roleTag: "Senior Backend Engineer",
            savedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            savedBy: "Michael Chen"
          }
        ];
        localStorage.setItem("resumatch_resume_bank", JSON.stringify(seedResumes));
        setStoredResumes(seedResumes);
      }
    } catch (e) {
      console.error("Error reading resume bank", e);
    }
  }, []);

  const saveToLocalStorage = (list: StoredResume[]) => {
    try {
      localStorage.setItem("resumatch_resume_bank", JSON.stringify(list));
    } catch (e) {
      console.error("Error writing resume bank", e);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = storedResumes.filter(r => r.id !== id);
    setStoredResumes(updated);
    saveToLocalStorage(updated);
    if (selectedResumeId === id) {
      setSelectedResumeId(null);
    }
    setImportedStatus("Resume deleted from storage bank.");
    setTimeout(() => setImportedStatus(null), 3000);
  };

  const handleImport = (resume: StoredResume, e: React.MouseEvent) => {
    e.stopPropagation();
    // Re-create as Candidate
    const candidate: Candidate = {
      id: `cand-imported-${Date.now()}`,
      name: resume.name,
      email: resume.email,
      phone: resume.phone,
      fileName: resume.fileName,
      fileSize: resume.fileSize,
      matchScore: resume.matchScore,
      criteriaScores: resume.criteriaScores,
      summary: resume.summary,
      strengths: resume.strengths,
      weaknesses: resume.weaknesses,
      missingSkills: resume.missingSkills,
      recAction: resume.recAction,
      recNotes: resume.recNotes,
      interviewQuestions: resume.interviewQuestions,
      emailDraft: resume.emailDraft,
      parsedSuccess: resume.parsedSuccess,
      pdfBase64: resume.pdfBase64,
      rawResumeText: resume.rawResumeText,
      isArchived: false
    };

    onImportCandidate(candidate);
    setImportedStatus(`Imported ${resume.name} into your active ${activeJob.title} screening pipeline!`);
    setTimeout(() => setImportedStatus(null), 4000);
  };

  const handleDownloadReport = (resume: StoredResume, e: React.MouseEvent) => {
    e.stopPropagation();
    const rank = [...storedResumes]
      .filter(r => r.roleTag === resume.roleTag)
      .sort((a,b) => b.matchScore - a.matchScore)
      .findIndex(c => c.id === resume.id) + 1;
    
    const markdown = `# RESUMATCH AI - COHORT TALENT REPORT
*Saved in Shared Recruiter Storage*

## TALENT CANDIDATE DOSSIER
* **Full Name:** ${resume.name}
* **Email:** ${resume.email}
* **Phone:** ${resume.phone}
* **Tagged Role / Tag:** ${resume.roleTag}
* **Screened Score:** ${resume.matchScore}%
* **Cohort Role Rank:** #${rank} for ${resume.roleTag}
* **Original File:** ${resume.fileName} (${resume.fileSize})
* **Archived By:** ${resume.savedBy} on ${resume.savedAt}

---

## SCREENING SUMMARY
${resume.summary}

### Key Strengths:
${resume.strengths.map(s => `- ${s}`).join("\n")}

### Core Gaps:
${resume.weaknesses.map(w => `- ${w}`).join("\n")}

### Missing Skills:
${resume.missingSkills.length === 0 ? "- None" : resume.missingSkills.map(ms => `- ${ms}`).join("\n")}

---

## INTERVIEW QUESTIONS
${resume.interviewQuestions.map((q, i) => `${i+1}. ${q}`).join("\n")}

---
*Generated via ResuMatch Shared Recruiter Talent Storage.*
`;

    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Stored_Report_${resume.name.replace(/\s+/g, '_')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Extract unique roles for dropdown filter
  const uniqueRoles = ["all", ...Array.from(new Set(storedResumes.map(r => r.roleTag)))];

  // Filter & Search Resumes
  const filteredResumes = storedResumes.filter(resume => {
    const matchesSearch = 
      resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resume.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resume.strengths.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      resume.roleTag.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRoleFilter === "all" || resume.roleTag === selectedRoleFilter;

    return matchesSearch && matchesRole;
  });

  const selectedResume = storedResumes.find(r => r.id === selectedResumeId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6 md:p-8 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-blue-400">Recruiter Shared Storage</h2>
              <p className="text-xs text-slate-300">Keep, search, and retrieve good resumes tagged by role</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Notifications */}
        {importedStatus && (
          <div className="bg-blue-50 border-b border-blue-100 text-blue-800 px-6 py-2.5 text-xs font-medium flex items-center gap-2 animate-pulse shrink-0">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{importedStatus}</span>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-3 shrink-0 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search talent bank by name, skills, email, role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white text-slate-800 placeholder-slate-400 border border-slate-200 rounded-lg text-xs outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shrink-0">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="text-xs font-semibold text-slate-700 bg-transparent border-none outline-none cursor-pointer pr-1"
              >
                <option value="all">All Role Tags</option>
                {uniqueRoles.filter(r => r !== "all").map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Side: Stored Resumes List */}
          <div className="w-full md:w-2/5 border-r border-slate-200 overflow-y-auto p-4 space-y-2.5 bg-slate-50/50">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Resumes Saved ({filteredResumes.length})
              </span>
              <span className="text-[10px] text-slate-500">
                Active Recruiter: <span className="font-semibold text-slate-700">{activeRecruiterName}</span>
              </span>
            </div>

            {filteredResumes.length === 0 ? (
              <div className="text-center py-12 px-4 bg-white rounded-xl border border-slate-200">
                <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-bold">No saved resumes found</p>
                <p className="text-[11px] text-slate-400 mt-1">Try relaxing your search terms or filters.</p>
              </div>
            ) : (
              filteredResumes.map(resume => (
                <div
                  key={resume.id}
                  onClick={() => setSelectedResumeId(resume.id)}
                  className={`p-3.5 bg-white rounded-xl border transition-all cursor-pointer text-left relative group ${
                    selectedResumeId === resume.id 
                      ? "border-blue-500 ring-1 ring-blue-500 shadow-md bg-blue-50/10" 
                      : "border-slate-200 hover:border-slate-300 hover:shadow-xs"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{resume.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                          <Briefcase className="w-2.5 h-2.5" />
                          {resume.roleTag}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                        resume.matchScore >= 90 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                        resume.matchScore >= 80 ? "bg-blue-50 text-blue-700 border border-blue-100" :
                        "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        {resume.matchScore}% Fit
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">
                    {resume.summary}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {resume.savedAt}
                    </span>
                    <span>Saved by {resume.savedBy}</span>
                  </div>

                  {/* Hover Quick actions */}
                  <div className="absolute right-3 top-3 hidden group-hover:flex items-center gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-lg border border-slate-200 shadow-sm transition-all">
                    <button
                      onClick={(e) => handleImport(resume, e)}
                      className="p-1.5 hover:bg-blue-50 rounded-md text-blue-600 transition-colors"
                      title="Import into Active Screening Pipeline"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDownloadReport(resume, e)}
                      className="p-1.5 hover:bg-slate-100 rounded-md text-slate-600 transition-colors"
                      title="Download Report"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(resume.id, e)}
                      className="p-1.5 hover:bg-rose-50 rounded-md text-rose-600 transition-colors"
                      title="Delete Stored Resume"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Side: Stored Resume Detail Dossier */}
          <div className="hidden md:block md:w-3/5 overflow-y-auto p-6 bg-white">
            {selectedResume ? (
              <div className="space-y-6">
                
                {/* Profile Summary card */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-5">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-800 leading-none">{selectedResume.name}</h3>
                    <p className="text-xs text-slate-400 mt-1.5 font-mono">{selectedResume.email} &bull; {selectedResume.phone}</p>
                    <div className="flex items-center gap-1.5 mt-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded">
                        Tagged Role: <span className="text-slate-800">{selectedResume.roleTag}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Screened Fit</span>
                      <span className="text-2xl font-black text-blue-600">{selectedResume.matchScore}%</span>
                    </div>
                    <button
                      onClick={(e) => handleImport(selectedResume, e)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Import to Active Session</span>
                    </button>
                  </div>
                </div>

                {/* Stored resume details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Executive Fit Summary</h4>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                      {selectedResume.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-3.5">
                      <h5 className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        Proven Strengths
                      </h5>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {selectedResume.strengths.map((str, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-3.5">
                      <h5 className="text-[9px] font-bold text-amber-700 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Key Gaps Identifed
                      </h5>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {selectedResume.weaknesses.map((weak, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                            <span>{weak}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {selectedResume.recNotes && (
                    <div className="border border-slate-200 rounded-xl p-4">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Original Recruiter Notes</h4>
                      <p className="text-xs text-slate-600 italic whitespace-pre-wrap leading-relaxed">
                        "{selectedResume.recNotes}"
                      </p>
                      <div className="mt-3 text-[10px] text-slate-400 font-mono flex justify-between">
                        <span>Stored by {selectedResume.savedBy}</span>
                        <span>Date: {selectedResume.savedAt}</span>
                      </div>
                    </div>
                  )}

                  {/* Interview Questions */}
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tailored Interview Questions</h4>
                    <div className="space-y-2">
                      {selectedResume.interviewQuestions.map((q, idx) => (
                        <div key={idx} className="flex gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-700">
                          <span className="font-bold text-blue-600">{idx + 1}.</span>
                          <span>{q}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <FileText className="w-3.5 h-3.5" />
                      Resume file: {selectedResume.fileName} ({selectedResume.fileSize})
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleDownloadReport(selectedResume, e)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Dossier</span>
                      </button>
                      <button
                        onClick={(e) => handleDelete(selectedResume.id, e)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 rounded-2xl border border-slate-100 border-dashed">
                <Database className="w-12 h-12 text-slate-300 mb-3 animate-pulse" />
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Stored Resume</h3>
                <p className="text-[11px] text-slate-400 max-w-xs mt-1.5 leading-relaxed">
                  Choose a saved candidate resume from the list on the left to inspect their dossier, interview questions, gaps, and private notes.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
