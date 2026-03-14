/* ── Demo Assessment Types ── */

export type QualitativeScore = "Strong" | "Moderate" | "Gap Identified" | "Critical Gap";

export interface SubdimensionAssessment {
  subdimensionId: string;
  subdimensionName: string;
  score: QualitativeScore;
  justification: string;
  risks: string[];
  recommendedActions: string[];
}

export interface DomainAssessment {
  domainId: string;
  domainName: string;
  theoreticalBasis: string;
  subdimensions: SubdimensionAssessment[];
  domainSummary: string;
}

export interface DomainAnalysis {
  domains: DomainAssessment[];
}

export interface StrategicSynthesis {
  overallReadiness: string;
  resistanceProfile: string;
  tacticalRecommendations: string[];
  highestPriority: string;
  frameworksReferenced: string[];
  engagementFit: string;
}

export interface AssessmentResult {
  domainAnalysis: DomainAnalysis;
  strategicSynthesis: StrategicSynthesis | null;
  pipeline: {
    stage1Model: string;
    stage2Model: string;
  };
}

export type AssessmentStatus = "idle" | "analyzing" | "synthesizing" | "complete" | "error";

export interface AssessmentState {
  status: AssessmentStatus;
  domainAnalysis: DomainAnalysis | null;
  strategicSynthesis: StrategicSynthesis | null;
  synthesisPartialText: string;
  error: string | null;
  remainingRequests: number | null;
}

export interface DemoScenario {
  id: string;
  title: string;
  icon: string;
  badge: string;
  shortDescription: string;
  fullDescription: string;
}

export interface AssessmentError {
  error: string;
  code: "RATE_LIMITED" | "INVALID_INPUT" | "API_ERROR" | "EMPTY_INPUT";
  retryAfter?: number;
}
