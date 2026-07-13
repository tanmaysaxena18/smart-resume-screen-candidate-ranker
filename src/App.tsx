import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { JobEditor } from "./components/JobEditor";
import { AIMLLab } from "./components/AIMLLab";
import { CandidateComparer } from "./components/CandidateComparer";
import { ResumeViewer } from "./components/ResumeViewer";
import { ResumeBank } from "./components/ResumeBank";
import { JobDescription, Candidate } from "./types";
import { jobTemplates } from "./data/jobTemplates";
import { demoCandidates } from "./data/demoCandidates";
import { 
  Briefcase, Users, Upload, FileText, Sparkles, CheckCircle2, 
  AlertCircle, ChevronRight, User, Mail, Copy, Check, Info, Search,
  Filter, Plus, Trash2, ArrowUpDown, Terminal, BookOpen, Star, AlertTriangle, FileUp, Edit3, X, Download, RotateCcw,
  Scale, Archive, Database
} from "lucide-react";

export default function App() {
  // 1. Core States
  const [job, setJob] = useState<JobDescription>({
    id: "job-1",
    title: jobTemplates[0].title,
    department: jobTemplates[0].department,
    experienceLevel: jobTemplates[0].experienceLevel,
    skillsRequired: [...jobTemplates[0].skillsRequired],
    criteria: jobTemplates[0].criteria.map(c => ({ ...c })),
    descriptionText: jobTemplates[0].descriptionText,
  });

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [showJobEditor, setShowJobEditor] = useState<boolean>(false);
  const [showAIMLLab, setShowAIMLLab] = useState<boolean>(false);
  const [showComparer, setShowComparer] = useState<boolean>(false);
  const [showResumeBank, setShowResumeBank] = useState<boolean>(false);
  const [candidateToDelete, setCandidateToDelete] = useState<Candidate | null>(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState<string>("all");
  const [viewArchiveMode, setViewArchiveMode] = useState<"active" | "archived">("active");

  // Manual Paste vs File Upload Mode
  const [uploadMode, setUploadMode] = useState<"file" | "text">("file");
  const [manualText, setManualText] = useState("");
  const [manualCandidateName, setManualCandidateName] = useState("");
  
  // File Upload State
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    type: string;
    base64: string;
  } | null>(null);

  // Active Tab for Selected Candidate Detail View
  const [activeDetailTab, setActiveDetailTab] = useState<"overview" | "resume" | "gaps" | "interview" | "email">("overview");

  // UI state feedback
  const [isScreening, setIsScreening] = useState(false);
  const [screenError, setScreenError] = useState<string | null>(null);
  const [screenSuccess, setScreenSuccess] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [emailText, setEmailText] = useState("");

  // Private persistent recruiter notes state
  const [privateNotes, setPrivateNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("resumatch_private_notes");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Sync private notes to local storage
  useEffect(() => {
    try {
      localStorage.setItem("resumatch_private_notes", JSON.stringify(privateNotes));
    } catch (e) {
      console.error("Failed to save private notes to localStorage", e);
    }
  }, [privateNotes]);

  const handleUpdateNotes = (candidateId: string, notes: string) => {
    setPrivateNotes(prev => ({
      ...prev,
      [candidateId]: notes,
    }));
  };

  const handleDownloadReport = (cand: Candidate) => {
    const rank = [...candidates].sort((a,b) => b.matchScore - a.matchScore).findIndex(c => c.id === cand.id) + 1;
    const notes = privateNotes[cand.id] || "No custom recruiter notes recorded.";
    
    const markdown = `# RESUMATCH AI - CANDIDATE SCREENING DOSSIER

## CANDIDATE PROFILE
* **Full Name:** ${cand.name}
* **Email:** ${cand.email}
* **Phone:** ${cand.phone}
* **Applied For:** ${job.title} (${job.department})
* **Experience Level:** ${job.experienceLevel}
* **Screened Resume File:** ${cand.fileName} (${cand.fileSize})

---

## SCREENING PERFORMANCE METRICS
* **Overall Fit Score:** ${cand.matchScore}%
* **Target Spec Match Rank:** #${rank} of ${candidates.length} candidates
* **Recommendation Action:** ${cand.recAction.toUpperCase()}

### Individual Criteria Evaluation Breakdown:
${cand.criteriaScores.map(cs => {
  const weight = job.criteria.find(c => c.name === cs.name)?.weight || 25;
  return `### 🌟 ${cs.name} (${cs.score}% / Weight Impact: ${weight}%)
> ${cs.feedback}`;
}).join("\n\n")}

---

## EXECUTIVE MATCH SUMMARY
${cand.summary}

### Proven Strengths:
${cand.strengths.map(str => `- ${str}`).join("\n")}

### Experience & Keyword Gaps:
${cand.weaknesses.map(gap => `- ${gap}`).join("\n")}

### Missing Required Tech Stack Keywords:
${cand.missingSkills.length === 0 ? "- None! Perfect tech stack fit." : cand.missingSkills.map(s => `- ${s}`).join("\n")}

---

## TAILORED CUSTOM INTERVIEW QUESTIONS
${cand.interviewQuestions.map((q, idx) => `${idx + 1}. ${q}`).join("\n\n")}

---

## AI PREPARED OUTREACH EMAIL DRAFT
\`\`\`text
${emailText || cand.emailDraft}
\`\`\`

---

## PERSISTENT PRIVATE RECRUITER NOTES
${notes}

---
*Report Generated on: ${new Date().toLocaleDateString()} via ResuMatch AI Recruiter Workspace.*
`;

    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `ResuMatch_Report_${cand.name.replace(/\s+/g, '_')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleArchive = (candidateId: string) => {
    setCandidates(prev => {
      const updated = prev.map(c => {
        if (c.id === candidateId) {
          return { ...c, isArchived: !c.isArchived };
        }
        return c;
      });

      const updatedCand = updated.find(c => c.id === candidateId);
      const isArchived = updatedCand ? !!updatedCand.isArchived : false;
      const targetState = isArchived ? "archived successfully" : "restored from archive";

      // If we're archiving/restoring the currently selected candidate, select another one
      if (selectedCandidateId === candidateId) {
        const remainingInView = updated.filter(c => {
          const matchesArchive = viewArchiveMode === "archived" ? !!c.isArchived : !c.isArchived;
          return matchesArchive;
        });
        setSelectedCandidateId(remainingInView.length > 0 ? remainingInView[0].id : null);
      }

      setScreenSuccess(`Candidate "${updatedCand?.name || 'Candidate'}" ${targetState}.`);
      setTimeout(() => setScreenSuccess(null), 3000);
      return updated;
    });
  };

  const handleDeleteCandidate = (candidateId: string) => {
    const cand = candidates.find(c => c.id === candidateId);
    if (cand) {
      setCandidateToDelete(cand);
    }
  };

  const confirmDeleteCandidate = () => {
    if (!candidateToDelete) return;
    const targetId = candidateToDelete.id;
    const targetName = candidateToDelete.name;

    setCandidates(prev => {
      const remaining = prev.filter(c => c.id !== targetId);
      if (selectedCandidateId === targetId) {
        const filteredRemaining = remaining.filter(c => {
          const matchesArchive = viewArchiveMode === "archived" ? !!c.isArchived : !c.isArchived;
          return matchesArchive;
        });
        setSelectedCandidateId(filteredRemaining.length > 0 ? filteredRemaining[0].id : null);
      }
      return remaining;
    });

    setCandidateToDelete(null);
    setScreenSuccess(`Candidate "${targetName}" deleted successfully.`);
    setTimeout(() => setScreenSuccess(null), 3000);
  };

  const getActiveRecruiterName = (): string => {
    try {
      const saved = localStorage.getItem("resumatch_active_recruiter");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.name || "Sarah Jenkins";
      }
    } catch (e) {}
    return "Sarah Jenkins";
  };

  const handleSaveToResumeBank = (cand: Candidate) => {
    try {
      const savedRaw = localStorage.getItem("resumatch_resume_bank");
      const currentBank = savedRaw ? JSON.parse(savedRaw) : [];
      
      // Check for duplicate in bank
      const duplicateIndex = currentBank.findIndex((r: any) => r.email === cand.email);
      
      const newStoredResume = {
        ...cand,
        id: cand.id.startsWith("bank-") ? cand.id : `bank-${Date.now()}`,
        roleTag: job.title,
        savedAt: new Date().toLocaleDateString(),
        savedBy: getActiveRecruiterName()
      };

      if (duplicateIndex !== -1) {
        currentBank[duplicateIndex] = newStoredResume;
      } else {
        currentBank.unshift(newStoredResume);
      }

      localStorage.setItem("resumatch_resume_bank", JSON.stringify(currentBank));
      setScreenSuccess(`Candidate "${cand.name}" saved to Shared Resume Storage under "${job.title}"!`);
      setTimeout(() => setScreenSuccess(null), 4000);
    } catch (e) {
      console.error("Failed to save to Resume Bank", e);
      setScreenError("Failed to save candidate to shared storage.");
      setTimeout(() => setScreenError(null), 3000);
    }
  };

  const handleImportFromResumeBank = (cand: Candidate) => {
    setCandidates(prev => {
      // Avoid duplicate in active session
      const exists = prev.some(c => c.email === cand.email);
      if (exists) {
        // Just update existing or select existing
        const existingCand = prev.find(c => c.email === cand.email);
        if (existingCand) {
          setSelectedCandidateId(existingCand.id);
        }
        return prev;
      }
      
      const updated = [cand, ...prev];
      setSelectedCandidateId(cand.id);
      return updated;
    });
  };

  // Re-seed or load candidates when job title/template changes (using LocalStorage for persistence)
  useEffect(() => {
    const saved = localStorage.getItem(`resumatch_candidates_${job.title}`);
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        setCandidates(parsed);
        const filtered = parsed.filter((c: Candidate) => {
          const isArchived = !!c.isArchived;
          return viewArchiveMode === "archived" ? isArchived : !isArchived;
        });
        if (filtered.length > 0) {
          setSelectedCandidateId(filtered[0].id);
        } else if (parsed.length > 0) {
          setSelectedCandidateId(parsed[0].id);
        } else {
          setSelectedCandidateId(null);
        }
        return;
      } catch (e) {
        console.error("Failed to parse saved candidates from localStorage", e);
      }
    }

    const demos = demoCandidates[job.title] || [];
    setCandidates([...demos]);
    if (demos.length > 0) {
      setSelectedCandidateId(demos[0].id);
    } else {
      setSelectedCandidateId(null);
    }
  }, [job.title]);

  // Sync candidates to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(`resumatch_candidates_${job.title}`, JSON.stringify(candidates));
  }, [candidates, job.title]);

  // Sync draft email state whenever active candidate changes
  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId);
  useEffect(() => {
    if (selectedCandidate) {
      setEmailText(selectedCandidate.emailDraft || "");
    } else {
      setEmailText("");
    }
  }, [selectedCandidateId, candidates]);

  // Handle template selection change in App level
  const handleJobChange = (updatedJob: JobDescription) => {
    setJob(updatedJob);
    setScreenError(null);
    setScreenSuccess(null);
  };

  // Drag-and-Drop state
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setScreenError("File is too large. Resumes must be smaller than 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setUploadedFile({
        name: file.name,
        size: formatBytes(file.size),
        type: file.type || "application/pdf",
        base64: base64String,
      });
      setScreenError(null);
    };
    reader.onerror = () => {
      setScreenError("Failed to read file.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const formatBytes = (bytes: number, decimals = 1) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Submit candidate to screening API
  const handleScreenResume = async () => {
    if (uploadMode === "file" && !uploadedFile) {
      setScreenError("Please upload a resume file first.");
      return;
    }
    if (uploadMode === "text" && !manualText.trim()) {
      setScreenError("Please paste the resume text first.");
      return;
    }

    setIsScreening(true);
    setScreenError(null);
    setScreenSuccess(null);

    const payload = {
      fileName: uploadMode === "file" ? uploadedFile?.name : `${manualCandidateName || "Candidate"}_Resume.txt`,
      fileType: uploadMode === "file" ? uploadedFile?.type : "text/plain",
      fileBase64: uploadMode === "file" ? uploadedFile?.base64 : null,
      resumeText: uploadMode === "text" ? manualText : null,
      jobDescription: {
        title: job.title,
        department: job.department,
        descriptionText: job.descriptionText,
        experienceLevel: job.experienceLevel,
        skillsRequired: job.skillsRequired,
        criteria: job.criteria,
      },
    };

    try {
      const response = await fetch("/api/screen-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze and screen resume.");
      }

      const data = await response.json();

      const newCandidate: Candidate = {
        id: `cand-${Date.now()}`,
        name: data.name || manualCandidateName || "Extracted Candidate",
        email: data.email || "info@candidate.com",
        phone: data.phone || "N/A",
        fileName: uploadMode === "file" ? uploadedFile!.name : "Direct Input Text",
        fileSize: uploadMode === "file" ? uploadedFile!.size : `${Math.round(manualText.length / 1024)} KB`,
        matchScore: data.matchScore ?? 75,
        criteriaScores: data.criteriaScores || [],
        summary: data.summary || "Completed screening successfully.",
        strengths: data.strengths || [],
        weaknesses: data.weaknesses || [],
        missingSkills: data.missingSkills || [],
        recAction: data.recAction || "review",
        recNotes: data.recNotes || "",
        interviewQuestions: data.interviewQuestions || [],
        emailDraft: data.emailDraft || "",
        parsedSuccess: true,
        pdfBase64: uploadMode === "file" ? uploadedFile?.base64 : undefined,
        rawResumeText: uploadMode === "text" ? manualText : undefined,
      };

      setCandidates(prev => [newCandidate, ...prev]);
      setSelectedCandidateId(newCandidate.id);
      setScreenSuccess(`Success! ${newCandidate.name} screened with a ${newCandidate.matchScore}% Match Score.`);

      // Clear input state
      setUploadedFile(null);
      setManualText("");
      setManualCandidateName("");
    } catch (err: any) {
      console.error(err);
      setScreenError(err.message || "An unexpected error occurred while communicating with the Gemini engine.");
    } finally {
      setIsScreening(false);
    }
  };

  // Reset candidates back to original demo values
  const handleResetToDemo = () => {
    const demos = demoCandidates[job.title] || [];
    setCandidates([...demos]);
    if (demos.length > 0) {
      setSelectedCandidateId(demos[0].id);
    } else {
      setSelectedCandidateId(null);
    }
    setScreenSuccess("Reset dashboard candidates to template defaults.");
    setScreenError(null);
  };

  const handleClearAllCandidates = () => {
    setCandidates([]);
    setSelectedCandidateId(null);
    setScreenSuccess("Cleared candidate pool.");
  };

  // Copy helper
  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Export CSV
  const handleExportCSV = () => {
    if (candidates.length === 0) {
      setScreenError("No candidates available to export.");
      return;
    }
    const headers = ["Rank", "Candidate Name", "Email", "Phone", "Match Score", "Recommendation", "Strengths", "Missing Skills"];
    const sorted = [...candidates].sort((a, b) => b.matchScore - a.matchScore);
    const rows = sorted.map((c, idx) => [
      idx + 1,
      `"${c.name}"`,
      c.email,
      c.phone,
      `${c.matchScore}%`,
      c.recAction,
      `"${c.strengths.slice(0, 2).join(', ')}"`,
      `"${c.missingSkills.join(', ')}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ResuMatch_Screening_${job.title.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filters application
  const filteredCandidates = candidates.filter(c => {
    const isArchived = !!c.isArchived;
    const matchesArchive = viewArchiveMode === "archived" ? isArchived : !isArchived;
    if (!matchesArchive) return false;

    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.missingSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterAction === "all") return matchesSearch;
    return matchesSearch && c.recAction === filterAction;
  });

  // Sorting
  const sortedCandidates = [...filteredCandidates].sort((a, b) => b.matchScore - a.matchScore);

  // Recommendations Colors helper
  const getRecStyles = (action: Candidate["recAction"]) => {
    switch (action) {
      case "shortlist":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "interview":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "review":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "reject":
        return "bg-slate-100 text-slate-600 border-slate-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* 1. Universal Top Header */}
      <Header 
        onOpenLab={() => setShowAIMLLab(true)} 
        onOpenResumeBank={() => setShowResumeBank(true)}
        activeJobTitle={job.title}
        notesCount={Object.keys(privateNotes).length}
        onClearNotes={() => {
          setPrivateNotes({});
          try {
            localStorage.removeItem("resumatch_private_notes");
          } catch (e) {}
        }}
      />

      {/* 2. Main High Density Flex Container */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden h-[calc(100vh-3.5rem)]">
        
        {/* LEFT COLUMN: Sidebar (350px) - Job Specification & Template Quick Control */}
        <section className="w-full lg:w-[350px] bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col overflow-y-auto shrink-0 select-none">
          
          {/* Active Job Profile Section Header */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <div>
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Active Job Profile</h2>
              <h3 className="text-sm font-bold text-slate-800 leading-tight">{job.title}</h3>
              <p className="text-[10px] text-slate-400 font-mono italic mt-0.5">{job.department} &bull; {job.experienceLevel}</p>
            </div>
            <button
              onClick={() => setShowJobEditor(!showJobEditor)}
              className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-colors border border-slate-100 bg-white shadow-2xs cursor-pointer"
              title="Edit job requirements"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 flex-1 flex flex-col gap-4">
            
            {/* Quick Template Switcher Card */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block tracking-wider">Quick Select Preset</label>
              <select
                value={jobTemplates.findIndex(t => t.title === job.title)}
                onChange={(e) => {
                  const idx = parseInt(e.target.value);
                  if (idx >= 0) {
                    const tmpl = jobTemplates[idx];
                    handleJobChange({
                      id: "job-1",
                      title: tmpl.title,
                      department: tmpl.department,
                      experienceLevel: tmpl.experienceLevel,
                      skillsRequired: [...tmpl.skillsRequired],
                      criteria: tmpl.criteria.map(c => ({ ...c })),
                      descriptionText: tmpl.descriptionText,
                    });
                  }
                }}
                className="w-full rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs"
              >
                {jobTemplates.map((t, idx) => (
                  <option key={idx} value={idx}>{t.title}</option>
                ))}
              </select>
            </div>

            {/* Required Tech Stack */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block tracking-wider">Required Skills ({job.skillsRequired.length})</label>
              <div className="flex flex-wrap gap-1 max-h-[140px] overflow-y-auto p-1 bg-slate-50 border border-slate-100 rounded">
                {job.skillsRequired.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-100 rounded tracking-tight"
                  >
                    {skill}
                  </span>
                ))}
                {job.skillsRequired.length === 0 && (
                  <span className="text-[10px] text-slate-400 italic p-1">No skills configured.</span>
                )}
              </div>
            </div>

            {/* Evaluation Criteria Weights */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block tracking-wider">Evaluation Weights</label>
              <div className="space-y-1.5 bg-slate-50/50 p-2 border border-slate-100 rounded">
                {job.criteria.map((c, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px] text-slate-700">
                    <span className="truncate pr-2 font-medium" title={c.name}>{c.name}</span>
                    <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-600 px-1 py-0.2 rounded border border-blue-100 shrink-0">{c.weight}%</span>
                  </div>
                ))}
                {job.criteria.length === 0 && (
                  <span className="text-[10px] text-slate-400 italic">No parameters configured.</span>
                )}
              </div>
            </div>

            {/* Job Description Summary */}
            <div className="flex-1 flex flex-col min-h-[150px]">
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block tracking-wider">Job Requirements</label>
              <div className="flex-1 text-[11px] leading-relaxed text-slate-500 bg-slate-50 p-3 rounded border border-slate-100 overflow-y-auto max-h-[180px] font-mono">
                {job.descriptionText}
              </div>
            </div>

            {/* Selected Candidate Quick Info & Private Notes in Sidebar */}
            {selectedCandidate && (
              <div className="bg-slate-50 p-3 rounded border border-slate-200/80 flex flex-col gap-1.5 shadow-3xs mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <User className="w-3 h-3 text-blue-500" />
                    Candidate Quick Notes
                  </span>
                  <span className={`px-1.5 py-0.2 text-[8px] font-mono font-bold rounded border ${
                    selectedCandidate.recAction === "shortlist" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    selectedCandidate.recAction === "interview" ? "bg-blue-50 text-blue-600 border-blue-100" :
                    selectedCandidate.recAction === "review" ? "bg-amber-50 text-amber-600 border-amber-100" :
                    "bg-slate-100 text-slate-500 border-slate-200"
                  }`}>
                    {selectedCandidate.recAction.toUpperCase()}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">{selectedCandidate.name}</h4>
                  <p className="text-[9px] text-slate-400 font-mono mt-0.5 leading-none">{selectedCandidate.email}</p>
                </div>

                <div className="border-t border-slate-200/60 pt-1.5">
                  {privateNotes[selectedCandidate.id] ? (
                    <p className="text-[11px] text-slate-600 leading-relaxed font-sans whitespace-pre-wrap max-h-[90px] overflow-y-auto">
                      {privateNotes[selectedCandidate.id]}
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 italic">No notes captured yet. Add notes in the Match Overview tab.</p>
                  )}
                </div>
              </div>
            )}

            {/* Actions button */}
            <button 
              onClick={() => setShowJobEditor(true)}
              className="w-full py-2 bg-slate-800 text-white rounded text-xs font-bold hover:bg-slate-950 transition-colors shadow-2xs mt-auto cursor-pointer"
            >
              Open Full Spec Editor
            </button>
          </div>
        </section>

        {/* CENTER & RIGHT CONTENT PANEL (Scrollable Dashboard) */}
        <section className="flex-1 flex flex-col bg-slate-50 overflow-y-auto">
          
          {/* Dashboard Header Bar */}
          <div className="p-4 border-b border-slate-200 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
            <div>
              <h2 className="text-base font-bold text-slate-800">Candidate Ranking Dashboard</h2>
              <p className="text-[11px] text-slate-500 font-mono">
                {candidates.length} Resumes parsed via Semantic Screen Model &bull; Active Role: <span className="font-semibold text-slate-700">{job.title}</span>
              </p>
            </div>
            
            {/* Quick action buttons */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => setShowComparer(true)}
                disabled={candidates.length < 2}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold transition-colors disabled:bg-slate-200 disabled:text-slate-400 disabled:border-slate-150 cursor-pointer shadow-2xs border border-blue-700"
                title="Compare candidates side-by-side"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare Candidates</span>
              </button>
              <button 
                onClick={handleExportCSV}
                disabled={candidates.length === 0}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
              <button 
                onClick={handleResetToDemo}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer shadow-2xs"
                title="Restore default candidate list for this profile"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
              <button 
                onClick={handleClearAllCandidates}
                className="p-1.5 text-slate-400 hover:text-red-500 rounded border border-slate-200 hover:border-red-200 bg-white transition-colors cursor-pointer"
                title="Clear all candidates"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            
            {/* 1. Resume Input Desk (Uploader) */}
            <div className="bg-white border border-slate-200 rounded shadow-xs p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                  Resume Input Desk
                </h3>
                <div className="flex bg-slate-100 p-0.5 rounded border border-slate-200 text-[10px]">
                  <button
                    onClick={() => { setUploadMode("file"); setScreenError(null); }}
                    className={`px-2.5 py-1 rounded-sm font-semibold transition-colors cursor-pointer ${uploadMode === "file" ? "bg-white text-slate-800 shadow-2xs" : "text-slate-500"}`}
                  >
                    PDF Upload
                  </button>
                  <button
                    onClick={() => { setUploadMode("text"); setScreenError(null); }}
                    className={`px-2.5 py-1 rounded-sm font-semibold transition-colors cursor-pointer ${uploadMode === "text" ? "bg-white text-slate-800 shadow-2xs" : "text-slate-500"}`}
                  >
                    Direct Text Paste
                  </button>
                </div>
              </div>

              {/* Upload Content Area */}
              {uploadMode === "file" ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border border-dashed rounded p-4 text-center cursor-pointer transition-colors ${isDragOver ? "border-blue-500 bg-blue-50/50" : "border-slate-300 hover:border-blue-400 bg-slate-50/50"}`}
                >
                  <input
                    type="file"
                    id="resume-file-picker"
                    accept=".pdf,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="resume-file-picker" className="cursor-pointer block">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-inner">
                        <FileUp className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-slate-700 mt-1">
                        {uploadedFile ? uploadedFile.name : "Click to select or drag PDF resume here"}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {uploadedFile ? `Size: ${uploadedFile.size} - Ready to process` : "PDF format supported up to 10MB"}
                      </p>
                    </div>
                  </label>
                  {uploadedFile && (
                    <button
                      onClick={(e) => { e.preventDefault(); setUploadedFile(null); }}
                      className="mt-2 text-[10px] font-bold text-red-600 hover:underline px-2 py-0.5 rounded bg-red-50"
                    >
                      Remove File
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Candidate Full Name (Optional)"
                      value={manualCandidateName}
                      onChange={(e) => setManualCandidateName(e.target.value)}
                      className="w-full rounded border border-slate-200 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-[10px] text-slate-400 flex items-center italic">
                      Name will be auto-parsed if left empty
                    </span>
                  </div>
                  <textarea
                    placeholder="Paste resume text directly here..."
                    rows={4}
                    value={manualText}
                    onChange={(e) => setManualText(e.target.value)}
                    className="w-full rounded border border-slate-200 p-2 text-xs text-slate-800 font-mono focus:outline-hidden focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
                  />
                </div>
              )}

              {/* Status and Actions Button */}
              <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 border-t border-slate-100 pt-3">
                <div className="flex-1">
                  {screenError && (
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-600">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 animate-bounce" />
                      <span>{screenError}</span>
                    </div>
                  )}
                  {screenSuccess && (
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{screenSuccess}</span>
                    </div>
                  )}
                  {!screenError && !screenSuccess && (
                    <p className="text-[10px] text-slate-400 font-mono">
                      * Uses server-side Gemini 3.5 parsing to calculate exact score and match criteria weights.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleScreenResume}
                  disabled={isScreening || (uploadMode === "file" && !uploadedFile) || (uploadMode === "text" && !manualText.trim())}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 transition-colors cursor-pointer shadow-xs min-w-[130px]"
                >
                  {isScreening ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Analyzing Resume...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Screen & Rank</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 2. Main High Density Candidate List */}
            <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
              
              {/* Table search and filters bar */}
              <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search candidate name, summary, missing skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200 rounded text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500 shadow-2xs"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Folder:</span>
                    <div className="inline-flex rounded-md p-0.5 bg-slate-100 border border-slate-200">
                      <button
                        onClick={() => setViewArchiveMode("active")}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${viewArchiveMode === "active" ? "bg-white text-slate-800 shadow-3xs" : "text-slate-500 hover:text-slate-700"}`}
                      >
                        Active ({candidates.filter(c => !c.isArchived).length})
                      </button>
                      <button
                        onClick={() => setViewArchiveMode("archived")}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${viewArchiveMode === "archived" ? "bg-white text-rose-700 shadow-3xs" : "text-slate-500 hover:text-slate-700"}`}
                      >
                        Archived ({candidates.filter(c => c.isArchived).length})
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Status:</span>
                    <select
                      value={filterAction}
                      onChange={(e) => setFilterAction(e.target.value)}
                      className="rounded border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-500 shadow-2xs"
                    >
                      <option value="all">All Recommendations</option>
                      <option value="shortlist">Shortlisted Only</option>
                      <option value="interview">Interview List</option>
                      <option value="review">Review Requested</option>
                      <option value="reject">Rejected / Hold</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table Grid list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-100/50 border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider w-12 text-center">Rank</th>
                      <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider">Candidate Profile</th>
                      <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider w-40">Match Score</th>
                      <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider w-36">Recommendation</th>
                      <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider hidden md:table-cell">Key Skill Highlights</th>
                      <th className="px-4 py-2.5 text-right text-[10px] font-bold uppercase tracking-wider w-20 pr-5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {sortedCandidates.map((cand, idx) => {
                      const isSelected = cand.id === selectedCandidateId;
                      const rank = idx + 1;
                      
                      return (
                        <tr 
                          key={cand.id} 
                          onClick={() => setSelectedCandidateId(cand.id)}
                          className={`hover:bg-blue-50/20 cursor-pointer transition-colors ${isSelected ? "bg-blue-50/40 font-medium border-l-4 border-l-blue-600" : ""}`}
                        >
                          <td className="px-4 py-3 text-center font-bold text-slate-600">
                            {rank.toString().padStart(2, "0")}
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-bold text-slate-800">{cand.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                              <span>{cand.email}</span>
                              <span>&bull;</span>
                              <span className="truncate max-w-[120px]">{cand.fileName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden shrink-0 border border-slate-200">
                                <div 
                                  className={`h-full rounded-full ${cand.matchScore >= 85 ? "bg-emerald-500" : cand.matchScore >= 70 ? "bg-blue-500" : cand.matchScore >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                                  style={{ width: `${cand.matchScore}%` }}
                                />
                              </div>
                              <span className={`font-bold font-mono text-[11px] ${cand.matchScore >= 85 ? "text-emerald-600" : cand.matchScore >= 70 ? "text-blue-600" : cand.matchScore >= 50 ? "text-amber-600" : "text-red-600"}`}>
                                {cand.matchScore}%
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 border rounded text-[9px] font-bold uppercase tracking-wide inline-block ${getRecStyles(cand.recAction)}`}>
                              {cand.recAction}
                            </span>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell text-slate-500 text-[11px]">
                            <div className="truncate max-w-xs" title={cand.summary}>
                              {cand.summary}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right pr-5" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedCandidateId(cand.id)}
                                className={`text-[11px] font-bold px-2 py-1 rounded transition-all cursor-pointer ${isSelected ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-50"}`}
                                title="Analyze candidate"
                              >
                                Analyze
                              </button>
                              <button
                                onClick={() => handleToggleArchive(cand.id)}
                                className={`p-1 rounded transition-all cursor-pointer ${cand.isArchived ? "text-amber-600 hover:bg-amber-50" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
                                title={cand.isArchived ? "Restore to active list" : "Archive candidate"}
                              >
                                <Archive className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteCandidate(cand.id)}
                                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-all cursor-pointer"
                                title="Delete candidate permanently"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {sortedCandidates.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-10 text-slate-400">
                          <Users className="w-8 h-8 text-slate-300 mx-auto mb-1.5" />
                          <p className="text-xs font-bold">No candidate records fit active search filters</p>
                          <p className="text-[10px] font-mono mt-0.5">Try changing the filter dropdown above or upload a new resume PDF.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Selected Candidate In-depth Analysis Panel */}
            {selectedCandidate ? (
              <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
                
                {/* Candidate Dashboard Top Header bar */}
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {selectedCandidate.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">{selectedCandidate.name}</h3>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {selectedCandidate.email} &bull; {selectedCandidate.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="px-2.5 py-1 bg-white border border-slate-200 rounded text-center shrink-0 shadow-2xs">
                      <span className="text-[9px] text-slate-400 font-bold block leading-none uppercase">Match Rank</span>
                      <span className="text-xs font-bold text-blue-600 font-mono">
                        #{candidates.sort((a,b) => b.matchScore - a.matchScore).findIndex(c => c.id === selectedCandidate.id) + 1}
                      </span>
                    </div>

                    <div className="px-3 py-1 bg-white border border-slate-200 rounded text-center shrink-0 shadow-2xs">
                      <span className="text-[9px] text-slate-400 font-bold block leading-none uppercase">Overall Score</span>
                      <span className="text-xs font-bold text-emerald-600 font-mono">{selectedCandidate.matchScore}%</span>
                    </div>

                    <span className={`px-2.5 py-1.5 border rounded text-[10px] font-bold uppercase tracking-wider shadow-2xs inline-block text-center ${getRecStyles(selectedCandidate.recAction)}`}>
                      {selectedCandidate.recAction}
                    </span>

                    <div className="flex items-center gap-1.5 border-l pl-2.5 border-slate-200 shrink-0">
                      <button
                        onClick={() => handleSaveToResumeBank(selectedCandidate)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 rounded text-xs font-bold transition-all cursor-pointer shadow-2xs"
                        title="Save Candidate to shared Resume Storage bank"
                      >
                        <Database className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">Save to Storage</span>
                      </button>
                      <button
                        onClick={() => handleDownloadReport(selectedCandidate)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded text-xs font-bold transition-all cursor-pointer shadow-2xs"
                        title="Download Candidate Comprehensive Report"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">Download Report</span>
                      </button>
                      <button
                        onClick={() => handleToggleArchive(selectedCandidate.id)}
                        className={`p-1.5 rounded border transition-all cursor-pointer flex items-center justify-center ${selectedCandidate.isArchived ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100" : "bg-white border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
                        title={selectedCandidate.isArchived ? "Restore Candidate from Archive" : "Archive Candidate"}
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCandidate(selectedCandidate.id)}
                        className="p-1.5 bg-white border border-slate-200 rounded text-slate-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all cursor-pointer flex items-center justify-center"
                        title="Delete Candidate permanently"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dashboard Inner Navigation tabs */}
                <div className="flex border-b border-slate-200 bg-slate-50/50">
                  <button
                    onClick={() => setActiveDetailTab("overview")}
                    className={`flex-1 sm:flex-none px-4 py-2.5 border-b-2 text-xs font-bold transition-colors cursor-pointer ${activeDetailTab === "overview" ? "border-blue-600 text-blue-600 bg-white" : "border-transparent text-slate-500 hover:text-slate-800"}`}
                  >
                    Match Overview
                  </button>
                  <button
                    onClick={() => setActiveDetailTab("resume")}
                    className={`flex-1 sm:flex-none px-4 py-2.5 border-b-2 text-xs font-bold transition-colors cursor-pointer ${activeDetailTab === "resume" ? "border-blue-600 text-blue-600 bg-white" : "border-transparent text-slate-500 hover:text-slate-800"}`}
                  >
                    Resume Document
                  </button>
                  <button
                    onClick={() => setActiveDetailTab("gaps")}
                    className={`flex-1 sm:flex-none px-4 py-2.5 border-b-2 text-xs font-bold transition-colors cursor-pointer ${activeDetailTab === "gaps" ? "border-blue-600 text-blue-600 bg-white" : "border-transparent text-slate-500 hover:text-slate-800"}`}
                  >
                    Skills & Gaps Analysis
                  </button>
                  <button
                    onClick={() => setActiveDetailTab("interview")}
                    className={`flex-1 sm:flex-none px-4 py-2.5 border-b-2 text-xs font-bold transition-colors cursor-pointer ${activeDetailTab === "interview" ? "border-blue-600 text-blue-600 bg-white" : "border-transparent text-slate-500 hover:text-slate-800"}`}
                  >
                    Tailored Interview Prep
                  </button>
                  <button
                    onClick={() => setActiveDetailTab("email")}
                    className={`flex-1 sm:flex-none px-4 py-2.5 border-b-2 text-xs font-bold transition-colors cursor-pointer ${activeDetailTab === "email" ? "border-blue-600 text-blue-600 bg-white" : "border-transparent text-slate-500 hover:text-slate-800"}`}
                  >
                    Generated Email Draft
                  </button>
                </div>

                {/* Tab content screens */}
                <div className="p-4">
                  
                  {/* TAB: Resume Document */}
                  {activeDetailTab === "resume" && (
                    <div className="space-y-4 animate-fade-in">
                      <ResumeViewer candidate={selectedCandidate} />
                    </div>
                  )}
                  
                  {/* TAB 1: Match Overview */}
                  {activeDetailTab === "overview" && (
                    <div className="space-y-4 animate-fade-in">
                      
                      {/* Summary text */}
                      <div className="bg-slate-50 p-3 rounded border border-slate-100">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Info className="w-3.5 h-3.5 text-blue-500" />
                          Executive Match Summary
                        </h4>
                        <p className="text-xs text-slate-700 leading-relaxed font-sans">{selectedCandidate.summary}</p>
                      </div>

                      {/* Criteria details mapping */}
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 block">Criteria Weights & Evaluation Scores</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedCandidate.criteriaScores.map((cs, i) => {
                            const parentWeight = job.criteria.find(c => c.name === cs.name)?.weight || 25;
                            return (
                              <div key={i} className="p-3 border border-slate-100 rounded-lg bg-white shadow-2xs">
                                <div className="flex justify-between items-start mb-1.5">
                                  <div className="pr-2">
                                    <h5 className="text-xs font-bold text-slate-800 leading-snug">{cs.name}</h5>
                                    <span className="text-[9px] text-slate-400 font-mono">Weight Impact: {parentWeight}%</span>
                                  </div>
                                  <span className={`text-xs font-mono font-bold bg-slate-50 border px-1.5 py-0.5 rounded ${cs.score >= 85 ? "text-emerald-600 border-emerald-100 bg-emerald-50/50" : cs.score >= 70 ? "text-blue-600 border-blue-100 bg-blue-50/50" : "text-amber-600 border-amber-100 bg-amber-50/50"}`}>
                                    {cs.score}%
                                  </span>
                                </div>
                                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-2">
                                  <div 
                                    className={`h-full rounded-full ${cs.score >= 85 ? "bg-emerald-500" : cs.score >= 70 ? "bg-blue-500" : "bg-amber-500"}`}
                                    style={{ width: `${cs.score}%` }}
                                  />
                                </div>
                                <p className="text-[11px] text-slate-500 leading-snug">{cs.feedback}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Recommendation Notes Card */}
                      {selectedCandidate.recNotes && (
                        <div className="p-3 rounded bg-blue-50/50 border border-blue-100">
                          <h4 className="text-[10px] font-bold text-blue-900 uppercase tracking-wider mb-0.5">Recruiter Recommendation Notes</h4>
                          <p className="text-xs text-blue-800 leading-relaxed">{selectedCandidate.recNotes}</p>
                        </div>
                      )}

                      {/* Private Recruiter Notes Textarea */}
                      <div className="bg-white p-4.5 rounded-lg border border-slate-200 shadow-2xs space-y-2 mt-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-blue-600" />
                            Private Recruiter Notes
                          </h4>
                          <span className="text-[9px] bg-emerald-50 text-emerald-600 font-mono px-2 py-0.5 rounded border border-emerald-100 font-bold flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Auto-saved locally
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-normal">
                          This private feedback is stored persistently in your local browser cache and is never shared with candidates. Use it to log interview thoughts, reference check details, or custom notes.
                        </p>
                        <textarea
                          placeholder="Add private, persistent recruiter screening notes for this candidate..."
                          rows={4}
                          value={privateNotes[selectedCandidate.id] || ""}
                          onChange={(e) => handleUpdateNotes(selectedCandidate.id, e.target.value)}
                          className="w-full text-xs text-slate-800 border border-slate-200 rounded-lg p-3 bg-slate-50/30 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-sans"
                        />
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Skills & Gaps Analysis */}
                  {activeDetailTab === "gaps" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Strengths column */}
                        <div className="p-3 border border-slate-200 rounded-lg bg-emerald-50/10">
                          <h4 className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                            Proven Candidate Strengths
                          </h4>
                          <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
                            {selectedCandidate.strengths.map((str, i) => (
                              <li key={i} className="flex gap-2 items-start">
                                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                                <span>{str}</span>
                              </li>
                            ))}
                            {selectedCandidate.strengths.length === 0 && (
                              <li className="text-slate-400 italic">No prominent strengths identified.</li>
                            )}
                          </ul>
                        </div>

                        {/* Gaps / Weaknesses column */}
                        <div className="p-3 border border-slate-200 rounded-lg bg-amber-50/10">
                          <h4 className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            Key Experience Gaps
                          </h4>
                          <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
                            {selectedCandidate.weaknesses.map((weak, i) => (
                              <li key={i} className="flex gap-2 items-start">
                                <span className="text-amber-500 font-bold shrink-0">&bull;</span>
                                <span>{weak}</span>
                              </li>
                            ))}
                            {selectedCandidate.weaknesses.length === 0 && (
                              <li className="text-slate-400 italic">No prominent gaps identified relative to role specs.</li>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Missing Required Skills */}
                      <div className="bg-slate-50 p-3 rounded border border-slate-100">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Missing Required Skills from Tech Stack</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedCandidate.missingSkills.length === 0 ? (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-white border border-emerald-100 px-2.5 py-1 rounded">
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                              <span>Stellar fit! Matches all core keywords.</span>
                            </div>
                          ) : (
                            selectedCandidate.missingSkills.map((sk, i) => (
                              <span key={i} className="px-2.5 py-1 bg-amber-55 text-amber-900 bg-amber-50 border border-amber-200 text-xs font-medium rounded-sm">
                                {sk}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Interview prep questions */}
                  {activeDetailTab === "interview" && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="flex justify-between items-center bg-slate-50 p-2 border border-slate-100 rounded">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Tailored interview question sheets</span>
                        <button
                          onClick={() => handleCopyToClipboard(selectedCandidate.interviewQuestions.join("\n\n"), "questions")}
                          className="text-[10px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          {copiedText === "questions" ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy All Questions</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="space-y-3">
                        {selectedCandidate.interviewQuestions.map((q, i) => (
                          <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs flex gap-3">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-mono text-xs font-bold border border-blue-100 shrink-0">
                              {i+1}
                            </span>
                            <p className="text-xs text-slate-700 leading-relaxed font-medium">{q}</p>
                          </div>
                        ))}
                        {selectedCandidate.interviewQuestions.length === 0 && (
                          <p className="text-xs text-slate-400 italic">No custom interview questions generated for this candidate.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: Email Composer */}
                  {activeDetailTab === "email" && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="flex justify-between items-center bg-slate-50 p-2 border border-slate-100 rounded">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">AI Prepared Outreach Draft</span>
                        <button
                          onClick={() => handleCopyToClipboard(emailText, "email")}
                          className="text-[10px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          {copiedText === "email" ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Email Text</span>
                            </>
                          )}
                        </button>
                      </div>

                      <textarea
                        value={emailText}
                        onChange={(e) => setEmailText(e.target.value)}
                        rows={12}
                        className="w-full p-3 rounded border border-slate-200 text-xs text-slate-800 font-mono focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-slate-200 bg-white rounded">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-500">No Candidate Selected</p>
                <p className="text-xs text-slate-400">Click any candidate row in the table above to reveal full AI performance, strengths, gaps, interview guides, and draft outreach emails.</p>
              </div>
            )}
          </div>

          {/* Recruiter Workspace Foot Note */}
          <footer className="h-12 bg-white border-t border-slate-200 flex items-center justify-between px-6 shrink-0 mt-auto select-none">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Model: Gemini-3.5-Flash</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Parser: Native Multimodal PDF</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Displaying {filteredCandidates.length} of {candidates.length} processed candidates
            </div>
          </footer>
        </section>
      </main>

      {/* AI/ML Engine Lab Hub Modal */}
      {showAIMLLab && (
        <AIMLLab 
          onClose={() => setShowAIMLLab(false)} 
          jobTitle={job.title} 
          skillsRequired={job.skillsRequired} 
        />
      )}

      {/* 3. Job Specifications Config Editor Popup Modal Drawer */}
      {showJobEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
          <div className="relative bg-white rounded-xl shadow-xl border border-slate-200 max-w-3xl w-full flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-800">Configure Target Job Specifications</h3>
              </div>
              <button
                onClick={() => setShowJobEditor(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 overflow-y-auto flex-1">
              <JobEditor 
                job={job} 
                onChange={handleJobChange} 
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 text-right shrink-0">
              <button
                onClick={() => setShowJobEditor(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded transition-colors shadow-2xs cursor-pointer"
              >
                Apply & Save Specifications
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Candidate Comparer Matrix Modal */}
      {showComparer && (
        <CandidateComparer
          candidates={candidates}
          job={job}
          onClose={() => setShowComparer(false)}
          initialCandidateAId={selectedCandidateId}
        />
      )}

      {/* Recruiter Shared Resume Storage Bank Modal */}
      {showResumeBank && (
        <ResumeBank
          onClose={() => setShowResumeBank(false)}
          activeJob={job}
          onImportCandidate={handleImportFromResumeBank}
          activeRecruiterName={getActiveRecruiterName()}
        />
      )}

      {/* Custom Modern Deletion Confirmation Modal */}
      {candidateToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-800">Permanently delete candidate?</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Are you sure you want to delete <span className="font-bold text-slate-700">"{candidateToDelete.name}"</span>? This will permanently erase their screening scores, feedback, tailored interview questions, and recruiter notes. This action cannot be undone.
                </p>
              </div>
            </div>
            
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setCandidateToDelete(null)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteCandidate}
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
