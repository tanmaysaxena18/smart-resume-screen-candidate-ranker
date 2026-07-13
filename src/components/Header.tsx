import React, { useState, useEffect, useRef } from "react";
import { 
  Brain, Sparkles, ChevronDown, User, Shield, Info, 
  Download, Trash2, Check, Briefcase, FileText, BadgeHelp, Database
} from "lucide-react";

interface HeaderProps {
  onOpenLab: () => void;
  activeJobTitle?: string;
  notesCount?: number;
  onClearNotes?: () => void;
  onOpenResumeBank?: () => void;
}

interface RecruiterProfile {
  name: string;
  role: string;
  initials: string;
  color: string;
}

const RECRUITERS: RecruiterProfile[] = [
  { name: "Sarah Jenkins", role: "Lead Technical Recruiter", initials: "SJ", color: "bg-blue-600" },
  { name: "Alex Rivera", role: "Technical Sourcing Specialist", initials: "AR", color: "bg-emerald-600" },
  { name: "Michael Chen", role: "Director of Talent Acquisition", initials: "MC", color: "bg-amber-600" }
];

export function Header({ onOpenLab, activeJobTitle = "Senior Full-Stack Engineer", notesCount = 0, onClearNotes, onOpenResumeBank }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState<RecruiterProfile>(() => {
    try {
      const saved = localStorage.getItem("resumatch_active_recruiter");
      if (saved) {
        const parsed = JSON.parse(saved);
        const found = RECRUITERS.find(r => r.name === parsed.name);
        if (found) return found;
      }
    } catch (e) {}
    return RECRUITERS[0];
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectRecruiter = (recruiter: RecruiterProfile) => {
    setSelectedRecruiter(recruiter);
    try {
      localStorage.setItem("resumatch_active_recruiter", JSON.stringify(recruiter));
    } catch (e) {}
    setIsDropdownOpen(false);
  };

  const handleExportNotes = () => {
    try {
      const notes = localStorage.getItem("resumatch_private_notes") || "{}";
      const blob = new Blob([notes], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `resumatch_notes_backup_${selectedRecruiter.name.replace(/\s+/g, "_").toLowerCase()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Failed to export notes.");
    }
  };

  const handleResetNotes = () => {
    if (onClearNotes) {
      onClearNotes();
    } else {
      localStorage.removeItem("resumatch_private_notes");
      window.location.reload();
    }
    setIsDropdownOpen(false);
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 w-full relative z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white shadow-xs">
          <Brain className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-bold tracking-tight text-slate-800 flex items-center gap-1.5">
            ResuMatch <span className="text-blue-600 font-semibold text-[10px] px-1.5 py-0.5 rounded-sm bg-blue-50">GEMINI-v3.5</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-mono -mt-0.5">
            Smart Resume Screening & Candidate Ranking
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Shared Resume Storage Trigger Button */}
        {onOpenResumeBank && (
          <button
            onClick={onOpenResumeBank}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-mono font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-xs cursor-pointer border border-slate-800"
            title="Open Shared Resume Bank"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Resume Storage</span>
          </button>
        )}

        {/* Shiny AI/ML Lab Trigger Button */}
        <button
          onClick={onOpenLab}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-mono font-bold hover:bg-blue-600 hover:text-white transition-all shadow-xs cursor-pointer border border-slate-800"
          title="Open AI/ML Lab"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>AI/ML Engine Lab</span>
        </button>

        <div className="hidden md:flex items-center gap-2 rounded bg-slate-50 px-2.5 py-1 text-[10px] font-mono text-slate-600 border border-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Gemini-3.5-Flash</span>
        </div>

        {/* INTERACTIVE RECRUITER ACCESS PROFILE DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            id="recruiter-access-dropdown-btn"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer text-left select-none outline-hidden focus:ring-2 focus:ring-blue-500/20"
          >
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Shield className="w-2.5 h-2.5 text-blue-500" />
                Recruiter Access
              </span>
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                {selectedRecruiter.name}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </span>
            </div>
            <div className={`w-8 h-8 rounded-full ${selectedRecruiter.color} text-white flex items-center justify-center text-xs font-bold shadow-inner`}>
              {selectedRecruiter.initials}
            </div>
          </button>

          {/* Dropdown Menu Overlay */}
          {isDropdownOpen && (
            <div 
              id="recruiter-access-dropdown-menu"
              className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in"
            >
              {/* Header section */}
              <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${selectedRecruiter.color} text-white flex items-center justify-center text-sm font-extrabold shadow-md`}>
                  {selectedRecruiter.initials}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800">{selectedRecruiter.name}</h3>
                  <p className="text-[10px] text-slate-500 leading-none mt-0.5">{selectedRecruiter.role}</p>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100 mt-1.5 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SECURE RECRUITER MODE
                  </span>
                </div>
              </div>

              {/* Statistics & Session info */}
              <div className="p-3 bg-slate-50/50 border-b border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-slate-400" />
                    Active Job Spec:
                  </span>
                  <span className="font-bold text-slate-700 truncate max-w-[140px]" title={activeJobTitle}>
                    {activeJobTitle}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3 text-slate-400" />
                    Saved Local Notes:
                  </span>
                  <span className="font-mono font-bold bg-blue-50 text-blue-600 px-1.5 py-0.2 rounded border border-blue-100">
                    {notesCount} candidates
                  </span>
                </div>
              </div>

              {/* SWITCH USER SECTION */}
              <div className="p-2 border-b border-slate-100">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Switch Active Recruiter Profile
                </p>
                <div className="space-y-0.5">
                  {RECRUITERS.map((rec) => {
                    const isCurrent = rec.name === selectedRecruiter.name;
                    return (
                      <button
                        key={rec.name}
                        onClick={() => handleSelectRecruiter(rec)}
                        className={`w-full text-left px-2 py-1.5 rounded-md text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                          isCurrent 
                            ? "bg-blue-50/50 text-blue-700" 
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${rec.color}`} />
                          <div className="flex flex-col">
                            <span className="font-bold leading-tight">{rec.name}</span>
                            <span className="text-[9px] text-slate-400 font-normal leading-none mt-0.2">{rec.role}</span>
                          </div>
                        </div>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ACTION UTILITIES */}
              <div className="p-2 bg-slate-50/20 space-y-0.5">
                {onOpenResumeBank && (
                  <button
                    onClick={() => {
                      onOpenResumeBank();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 hover:bg-emerald-50 rounded-md flex items-center gap-2 cursor-pointer transition-all"
                    title="Open shared resume storage bank"
                  >
                    <Database className="w-3.5 h-3.5 text-emerald-500" />
                    Open Shared Resume Storage
                  </button>
                )}
                <button
                  onClick={handleExportNotes}
                  className="w-full text-left px-2.5 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-100 rounded-md flex items-center gap-2 cursor-pointer transition-all"
                  title="Export offline backup of persistent screening notes"
                >
                  <Download className="w-3.5 h-3.5 text-blue-500" />
                  Export Recruiter Notes (.json)
                </button>
                <button
                  onClick={handleResetNotes}
                  className="w-full text-left px-2.5 py-1.5 text-[11px] font-bold text-rose-600 hover:bg-rose-50 rounded-md flex items-center gap-2 cursor-pointer transition-all"
                  title="Clear persistent browser cache notes"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  Clear Notes Cache
                </button>
              </div>

              {/* Footer info note */}
              <div className="p-2.5 bg-slate-100/60 border-t border-slate-100 text-[10px] text-slate-500 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <p className="leading-tight">
                  Recruiter accounts run entirely client-side. Persistent screening data is synced locally to your browser cache.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
