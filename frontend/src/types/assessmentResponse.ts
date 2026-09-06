export type AssessmentStatus = "SUCCESS" | "FAILED" | "PARTIAL";

export type RiskLevel =
  | "EXCELLENT"
  | "LOW RISK"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

export type CreditDecision =
  | "APPROVE"
  | "CONDITIONAL APPROVAL"
  | "REVIEW"
  | "REJECT";

export type MonitoringFrequency =
  | "MONTHLY"
  | "QUARTERLY"
  | "HALF YEARLY"
  | "YEARLY";

export interface AssessmentSummary {
  financial_health_score?: number | null;
  risk_level?: RiskLevel | null;
  confidence_score?: number | null;
  credit_decision: CreditDecision;
  suggested_loan_amount: number;
  loan_limit_min: number;
  loan_limit_max: number;
  monitoring_frequency: MonitoringFrequency;
  risk_grade: string;
}

export interface BusinessProfile {
  business_id: string;
  business_name: string;
  industry?: "MANUFACTURING";
  business_type: string;
  msme_registered?: boolean;
  udyam_registration_number?: string | null;
  gstin?: string | null;
  cin?: string | null;
  business_age_years: number;
  employee_count: number;
  annual_turnover: number;
  location: string;
}

export interface ComponentScore {
  name: string;
  score: number;
  weight: number;
  confidence?: number;
}

export interface MetricBreakdown {
  metric: string;
  value: number;
  score: number;
  weight: number;
}

export interface ComponentBreakdown {
  component: string;
  score: number;
  confidence: number;
  metrics?: MetricBreakdown[];
  positive_signals?: string[];
  negative_signals?: string[];
}

export interface CashFlowSimulationInputs {
  revenue_growth?: number | null;
  operating_margin?: number | null;
  expense_ratio?: number | null;
  collection_days?: number | null;
}

export interface FinancialPositionSimulationInputs {
  current_ratio?: number | null;
  debt_asset_ratio?: number | null;
  working_capital?: number | null;
}

export interface OperationsSimulationInputs {
  sales_growth?: number | null;
  capacity_utilization?: number | null;
}

export interface ComplianceSimulationInputs {
  gst_filing_rate?: number | null;
  epfo_compliance_rate?: number | null;
  tax_delay_days?: number | null;
}

export interface AlternateDataSimulationInputs {
  digital_payment_ratio?: number | null;
  average_bank_balance?: number | null;
}

export interface SimulationInputs {
  cashflow?: CashFlowSimulationInputs | null;
  financial_position?: FinancialPositionSimulationInputs | null;
  operations?: OperationsSimulationInputs | null;
  compliance?: ComplianceSimulationInputs | null;
  alternate_data?: AlternateDataSimulationInputs | null;
}

export interface LlmAnalysis {
  executive_summary: string;
  credit_opinion: string;
  monitoring_points?: string[];
}

export type AlternateDataStatus =
  | "Excellent"
  | "Good"
  | "Average"
  | "Needs Improvement";

export interface AlternateDataCard {
  name: string;
  score: number;
  status: AlternateDataStatus;
  metric?: string | null;
  value?: number | null;
}

export interface AssessmentResponse {
  request_id?: string | null;
  status: AssessmentStatus;
  summary: AssessmentSummary;
  business_profile: BusinessProfile;
  component_scores?: ComponentScore[];
  component_breakdown?: ComponentBreakdown[];
  positive_signals?: string[];
  negative_signals?: string[];
  warnings?: string[];
  recommendations?: string[];
  simulation_inputs?: SimulationInputs | null;
  llm_analysis?: LlmAnalysis | null;
  alternate_data_cards?: AlternateDataCard[];
}
