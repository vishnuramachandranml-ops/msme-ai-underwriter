import type { AssessmentRequest } from "@/features/new-assessment/schema/assessmentSchema";
import type { AssessmentResponse, SimulationInputs } from "@/types/assessmentResponse";

export type ScenarioInput = SimulationInputs;

export interface WhatIfRequest {
  original_request: AssessmentRequest;
  scenario: ScenarioInput;
}

export type SimulationSnapshot = AssessmentResponse;

export interface ComponentChange {
  component: string;
  before_score: number;
  after_score: number;
  score_change: number;
}

export interface SimulationDelta {
  score_change: number;
  previous_risk: string;
  new_risk: string;
  component_changes?: ComponentChange[];
}

export interface ChangedParameter {
  parameter: string;
  before?: number | null;
  after?: number | null;
}

export type Impact = "positive" | "negative" | "neutral";

export interface MetricChange {
  component: string;
  metric: string;
  before_value: number;
  after_value: number;
  value_change: number;
  before_score: number;
  after_score: number;
  score_change: number;
  impact: Impact;
}

export interface ImpactDriver {
  component: string;
  metric: string;
  before_score: number;
  after_score: number;
  score_change: number;
  impact: Impact;
}

export interface SimulationInsight {
  headline: string;
  summary: string;
  business_impact: string;
  recommendation: string;
}

export interface WhatIfResponse {
  before: SimulationSnapshot;
  after: SimulationSnapshot;
  delta: SimulationDelta;
  changed_parameters?: ChangedParameter[];
  comparison_summary?: string | null;
  simulation?: {
    metric_changes?: MetricChange[];
    top_impact_drivers?: ImpactDriver[];
    insight?: SimulationInsight | null;
  } | null;
}
