import React, { useState } from "react";
import { JobDescription, EvaluationCriteria } from "../types";
import { jobTemplates } from "../data/jobTemplates";
import { Sparkles, Plus, Trash2, HelpCircle, FileText, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";

interface JobEditorProps {
  job: JobDescription;
  onChange: (updated: JobDescription) => void;
}

export function JobEditor({ job, onChange }: JobEditorProps) {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadTemplate = (indexStr: string) => {
    setSelectedTemplateIndex(indexStr);
    if (indexStr === "") return;

    const idx = parseInt(indexStr);
    const tmpl = jobTemplates[idx];
    if (tmpl) {
      onChange({
        id: job.id,
        title: tmpl.title,
        department: tmpl.department,
        descriptionText: tmpl.descriptionText,
        experienceLevel: tmpl.experienceLevel,
        skillsRequired: [...tmpl.skillsRequired],
        criteria: tmpl.criteria.map((c) => ({ ...c })),
      });
      setErrorMsg(null);
    }
  };

  const updateField = (key: keyof JobDescription, value: any) => {
    let updatedText = job.descriptionText;
    if (key === "experienceLevel") {
      const level = value;
      if (level === "Entry Level") {
        updatedText = updatedText
          .replace(/\b[3456789]\+?\s*(?:-\s*\d+)?\s*years?\b/gi, "0-1 years")
          .replace(/\b[12]\d\+?\s*years?\b/gi, "0-1 years")
          .replace(/\b(?:Senior|Lead|Staff|Executive)\b/g, "Junior")
          .replace(/\b(?:senior|lead|staff|executive)\b/g, "junior")
          .replace(/mentoring junior/gi, "learning from senior")
          .replace(/mentor junior/gi, "learn from senior");
      } else if (level === "Mid" || level === "Mid-to-Senior") {
        updatedText = updatedText
          .replace(/\b[56789]\+?\s*(?:-\s*\d+)?\s*years?\b/gi, "2-4 years")
          .replace(/\b0-1\s*years?\b/gi, "2-4 years")
          .replace(/\b(?:Senior|Lead|Staff|Executive)\b/g, "Mid-level")
          .replace(/\b(?:senior|lead|staff|executive)\b/g, "mid-level");
      } else if (level === "Senior" || level === "Lead") {
        updatedText = updatedText
          .replace(/\b[0-2]\s*years?\b/gi, "5+ years")
          .replace(/\b2-4\s*years?\b/gi, "5+ years")
          .replace(/\b(?:Junior|Entry-level|Mid-level)\b/g, "Senior")
          .replace(/\b(?:junior|entry-level|mid-level)\b/g, "senior");
      }
    }
    onChange({
      ...job,
      [key]: value,
      descriptionText: updatedText,
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !job.skillsRequired.includes(newSkill.trim())) {
      onChange({
        ...job,
        skillsRequired: [...job.skillsRequired, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({
      ...job,
      skillsRequired: job.skillsRequired.filter((s) => s !== skillToRemove),
    });
  };

  const updateCriteria = (index: number, key: keyof EvaluationCriteria, value: any) => {
    const updatedCriteria = [...job.criteria];
    updatedCriteria[index] = {
      ...updatedCriteria[index],
      [key]: value,
    };
    onChange({
      ...job,
      criteria: updatedCriteria,
    });
  };

  const addCriteria = () => {
    onChange({
      ...job,
      criteria: [
        ...job.criteria,
        {
          name: "New Evaluation Parameter",
          weight: 20,
          description: "Explain what qualifications or accomplishments to look for.",
        },
      ],
    });
  };

  const removeCriteria = (index: number) => {
    onChange({
      ...job,
      criteria: job.criteria.filter((_, i) => i !== index),
    });
  };

  const handleAiGenerate = async () => {
    if (!job.title.trim()) {
      setErrorMsg("Please specify a job title first.");
      return;
    }
    if (!job.descriptionText.trim() || job.descriptionText.length < 50) {
      setErrorMsg("Please provide a more detailed job description (minimum 50 characters) so Gemini can analyze it accurately.");
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/generate-criteria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: job.title,
          descriptionText: job.descriptionText,
          experienceLevel: job.experienceLevel,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate criteria.");
      }

      const data = await response.json();
      if (data.criteria && data.skillsRequired) {
        onChange({
          ...job,
          skillsRequired: data.skillsRequired,
          criteria: data.criteria,
        });
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred while calling the Gemini API on the server.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-xs overflow-hidden">
      {/* Header Toggle */}
      <div 
        className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-4 cursor-pointer hover:bg-gray-100/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">1. Job Description & Criteria Configuration</h2>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 space-y-6">
          {/* Quick-Load Template */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Quick Load Template
            </label>
            <select
              value={selectedTemplateIndex}
              onChange={(e) => loadTemplate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">-- Choose a preset template or create custom --</option>
              {jobTemplates.map((tmpl, idx) => (
                <option key={idx} value={idx}>
                  {tmpl.title} ({tmpl.department})
                </option>
              ))}
            </select>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={job.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g. Senior Backend Engineer"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                value={job.department}
                onChange={(e) => updateField("department", e.target.value)}
                placeholder="e.g. Engineering"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Experience Level
              </label>
              <select
                value={job.experienceLevel}
                onChange={(e) => updateField("experienceLevel", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="Mid-to-Senior">Mid-to-Senior Level</option>
                <option value="Senior">Senior Level</option>
                <option value="Lead">Lead / Staff Level</option>
                <option value="Executive">Executive</option>
              </select>
            </div>
          </div>

          {/* Description Text */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-gray-700">
                Job Description text (Copy & Paste here) *
              </label>
              <span className="text-xs text-gray-400">
                {job.descriptionText.length} characters
              </span>
            </div>
            <textarea
              value={job.descriptionText}
              onChange={(e) => updateField("descriptionText", e.target.value)}
              placeholder="Paste full job description requirements, responsibilities, and about us section here..."
              rows={6}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-sans"
            />
          </div>

          {/* AI Trigger Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-100 gap-3">
            <div className="space-y-0.5">
              <h4 className="text-sm font-semibold text-blue-900 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-blue-600" />
                Gemini Intelligent Setup
              </h4>
              <p className="text-xs text-blue-700">
                Let AI auto-generate professional required skills and custom evaluation parameters directly from the Job Description text!
              </p>
            </div>
            <button
              type="button"
              onClick={handleAiGenerate}
              disabled={isGenerating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 disabled:bg-blue-400 cursor-pointer shadow-xs transition-colors shrink-0"
            >
              {isGenerating ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  Generate Skills & Criteria
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="flex gap-2 items-center text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Required Skills list */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Key Required Skills (Tags)
            </label>
            <div className="flex flex-wrap gap-1.5 p-3 border border-gray-200 rounded-lg bg-gray-50/50 mb-2">
              {job.skillsRequired.length === 0 ? (
                <span className="text-xs text-gray-400 italic">No skills listed yet. Add skills below or let AI generate them.</span>
              ) : (
                job.skillsRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-md bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded p-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. AWS"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 shadow-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addSkill}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Skill
              </button>
            </div>
          </div>

          {/* Evaluation Criteria Weights */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-gray-700">
                Evaluation Criteria & Score Weights
              </label>
              <button
                type="button"
                onClick={addCriteria}
                className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Parameter
              </button>
            </div>

            <div className="space-y-3">
              {job.criteria.length === 0 ? (
                <div className="text-center p-6 border border-dashed border-gray-200 rounded-lg text-xs text-gray-500">
                  No criteria defined. Standard matching will be used, or click "Generate Skills & Criteria" above.
                </div>
              ) : (
                job.criteria.map((crit, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-white shadow-xs space-y-3">
                    <div className="flex items-center gap-3 justify-between">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={crit.name}
                          onChange={(e) => updateCriteria(idx, "name", e.target.value)}
                          placeholder="Criteria Title (e.g. Technical Proficiency)"
                          className="w-full bg-transparent border-b border-dashed border-gray-300 pb-0.5 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:outline-hidden"
                        />
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <label className="text-xs text-gray-500 font-medium">Weight:</label>
                        <input
                          type="number"
                          value={crit.weight}
                          onChange={(e) => updateCriteria(idx, "weight", Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-14 rounded-lg border border-gray-300 px-2 py-1 text-center text-xs font-bold text-blue-800"
                        />
                        <span className="text-xs text-gray-500">%</span>
                        <button
                          type="button"
                          onClick={() => removeCriteria(idx)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <textarea
                        value={crit.description}
                        onChange={(e) => updateCriteria(idx, "description", e.target.value)}
                        placeholder="Define what qualifies high, medium, and low scores for this criteria item..."
                        rows={2}
                        className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
            {job.criteria.length > 0 && (
              <div className="mt-2 text-right">
                <span className="text-xs text-gray-500 font-mono">
                  Total Weight Weightage sum:{" "}
                  <span className="font-bold text-gray-700">
                    {job.criteria.reduce((sum, c) => sum + c.weight, 0)}%
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
