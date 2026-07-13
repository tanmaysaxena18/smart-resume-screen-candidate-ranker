import React, { useState, useEffect } from "react";
import { Candidate, JobDescription } from "../types";
import { 
  X, Scale, Star, AlertTriangle, CheckCircle2, User, Mail, Phone, 
  HelpCircle, Sparkles, Award, ArrowRightLeft, BookOpen, ThumbsUp, ChevronRight
} from "lucide-react";

interface CandidateComparerProps {
  candidates: Candidate[];
  job: JobDescription;
  onClose: () => void;
  initialCandidateAId?: string | null;
}

export function CandidateComparer({ candidates, job, onClose, initialCandidateAId }: CandidateComparerProps) {
  const [candidateAId, setCandidateAId] = useState<string>("");
  const [candidateBId, setCandidateBId] = useState<string>("");

  // Initialize with initial candidate and next candidate
  useEffect(() => {
    if (candidates.length > 0) {
      const firstId = initialCandidateAId || candidates[0].id;
      setCandidateAId(firstId);
      
      const secondCand = candidates.find(c => c.id !== firstId) || candidates[0];
      setCandidateBId(secondCand.id);
    }
  }, [candidates, initialCandidateAId]);

  const candA = candidates.find(c => c.id === candidateAId);
  const candB = candidates.find(c => c.id === candidateBId);

  // Rec badge helper
  const getRecBadgeStyles = (action?: Candidate["recAction"]) => {
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
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
      <div className="relative bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 max-w-5xl w-full flex flex-col h-[90vh] overflow-hidden animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-slate-800 flex items-center gap-2">
                Candidate Side-by-Side Comparison Matrix
                <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200 uppercase tracking-wide">
                  Active Role: {job.title}
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 font-mono -mt-0.5">
                Analyze and compare experience criteria scores and custom skill strengths.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-lg transition-colors border border-slate-200 bg-white shadow-3xs cursor-pointer"
            title="Close Comparison Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Candidate Selectors Area */}
        <div className="p-4 bg-slate-100/50 border-b border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0">
          
          {/* Candidate A Dropdown */}
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-3xs flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Primary Candidate (A)
            </label>
            <select
              value={candidateAId}
              onChange={(e) => setCandidateAId(e.target.value)}
              className="w-full rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 font-bold focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.matchScore}% Match - {c.recAction.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Candidate B Dropdown */}
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-3xs flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Comparison Candidate (B)
            </label>
            <select
              value={candidateBId}
              onChange={(e) => setCandidateBId(e.target.value)}
              className="w-full rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 font-bold focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id} disabled={c.id === candidateAId}>
                  {c.name} ({c.matchScore}% Match - {c.recAction.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Scrollable Comparison Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {candidates.length < 2 ? (
            <div className="text-center py-16 text-slate-500">
              <Scale className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold">Incompatible Candidate Count</p>
              <p className="text-[11px] font-mono text-slate-400 mt-1 max-w-md mx-auto">
                Please upload or select at least 2 candidates in the dashboard to make a side-by-side comparison.
              </p>
            </div>
          ) : !candA || !candB ? (
            <div className="text-center py-16 text-slate-500">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold">Selecting Candidates</p>
              <p className="text-[11px] font-mono text-slate-400 mt-1">
                Please select two candidates above to begin comparison.
              </p>
            </div>
          ) : (
            <div className="space-y-6">

              {/* 1. Header Profile cards side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Profile A */}
                <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50/20 border border-slate-200 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-bold text-slate-800">{candA.name}</h4>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-0.5"><Mail className="w-3 h-3" /> {candA.email}</span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-0.5"><Phone className="w-3 h-3" /> {candA.phone}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none">Match Score</span>
                        <span className="text-2xl font-black text-blue-600 font-mono leading-none">{candA.matchScore}%</span>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-slate-600 italic bg-white p-2 border border-slate-150 rounded leading-relaxed">
                      "{candA.summary}"
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-2.5 text-[11px]">
                    <span className="text-slate-400 font-mono">Parsed: {candA.fileName}</span>
                    <span className={`px-2 py-0.5 border rounded text-[9px] font-bold uppercase tracking-wide inline-block ${getRecBadgeStyles(candA.recAction)}`}>
                      {candA.recAction}
                    </span>
                  </div>
                </div>

                {/* Profile B */}
                <div className="p-4 border-l-4 border-l-emerald-500 bg-emerald-50/20 border border-slate-200 rounded-lg flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-bold text-slate-800">{candB.name}</h4>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-0.5"><Mail className="w-3 h-3" /> {candB.email}</span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-0.5"><Phone className="w-3 h-3" /> {candB.phone}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none">Match Score</span>
                        <span className="text-2xl font-black text-emerald-600 font-mono leading-none">{candB.matchScore}%</span>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-slate-600 italic bg-white p-2 border border-slate-150 rounded leading-relaxed">
                      "{candB.summary}"
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-2.5 text-[11px]">
                    <span className="text-slate-400 font-mono">Parsed: {candB.fileName}</span>
                    <span className={`px-2 py-0.5 border rounded text-[9px] font-bold uppercase tracking-wide inline-block ${getRecBadgeStyles(candB.recAction)}`}>
                      {candB.recAction}
                    </span>
                  </div>
                </div>

              </div>

              {/* 2. Side-by-Side Scoring Grid for Specific Criteria */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-slate-500" />
                  Criteria Matrix Comparison
                </h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs divide-y divide-slate-100">
                  
                  {/* Grid Header */}
                  <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-50 font-bold text-xs text-slate-600 p-3 items-center">
                    <div className="md:col-span-4 uppercase tracking-wider text-[10px]">Evaluation Category & weight</div>
                    <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0 md:pl-4 uppercase tracking-wider text-[10px] text-blue-700">
                      (A) {candA.name} Score
                    </div>
                    <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0 md:pl-4 uppercase tracking-wider text-[10px] text-emerald-700">
                      (B) {candB.name} Score
                    </div>
                  </div>

                  {/* Dynamic Categories mapping */}
                  {job.criteria.map((criterion, idx) => {
                    const scoreA = candA.criteriaScores.find(c => c.name === criterion.name);
                    const scoreB = candB.criteriaScores.find(c => c.name === criterion.name);

                    return (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-3 items-stretch hover:bg-slate-50/40">
                        
                        {/* Criterion spec */}
                        <div className="md:col-span-4 pr-3 flex flex-col justify-center">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="font-bold text-slate-800 text-xs">{criterion.name}</span>
                            <span className="text-[10px] font-mono bg-blue-50 text-blue-600 px-1.5 py-0.1 border border-blue-100 rounded">
                              {criterion.weight}%
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 leading-tight">
                            {criterion.description}
                          </span>
                        </div>

                        {/* Score A Detail */}
                        <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-150 pt-3 md:pt-0 md:pl-4 flex flex-col justify-center gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded ${scoreA && scoreA.score >= 85 ? "bg-emerald-50 text-emerald-700" : scoreA && scoreA.score >= 70 ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>
                              {scoreA ? `${scoreA.score}%` : "N/A"}
                            </span>
                            <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                              <div 
                                className={`h-full rounded-full ${scoreA && scoreA.score >= 85 ? "bg-emerald-500" : scoreA && scoreA.score >= 70 ? "bg-blue-500" : "bg-amber-500"}`}
                                style={{ width: scoreA ? `${scoreA.score}%` : "0%" }}
                              />
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-normal">
                            {scoreA ? scoreA.feedback : "No feedback record generated."}
                          </p>
                        </div>

                        {/* Score B Detail */}
                        <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-slate-150 pt-3 md:pt-0 md:pl-4 flex flex-col justify-center gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded ${scoreB && scoreB.score >= 85 ? "bg-emerald-50 text-emerald-700" : scoreB && scoreB.score >= 70 ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>
                              {scoreB ? `${scoreB.score}%` : "N/A"}
                            </span>
                            <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                              <div 
                                className={`h-full rounded-full ${scoreB && scoreB.score >= 85 ? "bg-emerald-500" : scoreB && scoreB.score >= 70 ? "bg-blue-500" : "bg-amber-500"}`}
                                style={{ width: scoreB ? `${scoreB.score}%` : "0%" }}
                              />
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-normal">
                            {scoreB ? scoreB.feedback : "No feedback record generated."}
                          </p>
                        </div>

                      </div>
                    );
                  })}

                </div>
              </div>

              {/* 3. Side-by-Side Strengths, Weaknesses, and Missing Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Candidate A Core Traits */}
                <div className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">A</div>
                    <h4 className="text-xs font-bold text-slate-700">Skill Strengths & Gaps for {candA.name}</h4>
                  </div>

                  {/* Strengths */}
                  <div>
                    <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                      <Star className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                      Identified Strengths
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600 pl-3.5 list-disc leading-relaxed">
                      {candA.strengths.map((s, i) => <li key={i}>{s}</li>)}
                      {candA.strengths.length === 0 && <li className="italic text-slate-400">No strengths captured.</li>}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div>
                    <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      Key Gaps / Weaknesses
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600 pl-3.5 list-disc leading-relaxed">
                      {candA.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                      {candA.weaknesses.length === 0 && <li className="italic text-slate-400">No core weaknesses captured.</li>}
                    </ul>
                  </div>

                  {/* Missing Skills Tags */}
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Missing Job Requirements</span>
                    <div className="flex flex-wrap gap-1">
                      {candA.missingSkills.length === 0 ? (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-100 rounded-sm">
                          ✓ Fits all required core skills
                        </span>
                      ) : (
                        candA.missingSkills.map((ms, i) => (
                          <span key={i} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-semibold border border-amber-200 rounded-sm">
                            {ms}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Candidate B Core Traits */}
                <div className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">B</div>
                    <h4 className="text-xs font-bold text-slate-700">Skill Strengths & Gaps for {candB.name}</h4>
                  </div>

                  {/* Strengths */}
                  <div>
                    <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                      <Star className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                      Identified Strengths
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600 pl-3.5 list-disc leading-relaxed">
                      {candB.strengths.map((s, i) => <li key={i}>{s}</li>)}
                      {candB.strengths.length === 0 && <li className="italic text-slate-400">No strengths captured.</li>}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div>
                    <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      Key Gaps / Weaknesses
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600 pl-3.5 list-disc leading-relaxed">
                      {candB.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                      {candB.weaknesses.length === 0 && <li className="italic text-slate-400">No core weaknesses captured.</li>}
                    </ul>
                  </div>

                  {/* Missing Skills Tags */}
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Missing Job Requirements</span>
                    <div className="flex flex-wrap gap-1">
                      {candB.missingSkills.length === 0 ? (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-100 rounded-sm">
                          ✓ Fits all required core skills
                        </span>
                      ) : (
                        candB.missingSkills.map((ms, i) => (
                          <span key={i} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-semibold border border-amber-200 rounded-sm">
                            {ms}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-mono shrink-0 select-none">
          <div className="flex gap-4">
            <span>Criteria: {job.criteria.length} weights calculated</span>
            <span>Candidates Pool Size: {candidates.length}</span>
          </div>
          <div>
            ResuMatch Side-by-Side Comparer
          </div>
        </div>

      </div>
    </div>
  );
}
