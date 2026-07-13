export interface EvaluationCriteria {
  name: string;
  weight: number; // e.g. 0 to 100
  description: string;
}

export interface JobDescription {
  id: string;
  title: string;
  department: string;
  descriptionText: string;
  experienceLevel: string; // e.g. Entry, Mid, Senior, Lead
  skillsRequired: string[];
  criteria: EvaluationCriteria[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  fileName: string;
  fileSize: string;
  matchScore: number; // 0 - 100
  criteriaScores: {
    name: string;
    score: number; // 0 - 100
    feedback: string;
  }[];
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  recAction: 'shortlist' | 'interview' | 'review' | 'reject';
  recNotes: string;
  interviewQuestions: string[];
  emailDraft: string;
  parsedSuccess: boolean;
  pdfBase64?: string;
  rawResumeText?: string;
  isArchived?: boolean;
}

export interface ScreeningSession {
  job: JobDescription;
  candidates: Candidate[];
  createdAt: string;
}

export interface JobTemplate {
  title: string;
  department: string;
  experienceLevel: string;
  descriptionText: string;
  skillsRequired: string[];
  criteria: EvaluationCriteria[];
}
