import { CheckCircle2, Clock3, ShieldCheck, Info } from "lucide-react";

import AppCard from "@/components/shared/AppCard";
import type { AssessmentSummary } from "@/types/assessmentResponse";

import ScoreGauge from "./ScoreGauge";

interface FinancialHealthCardProps {
  summary: AssessmentSummary;
}

const FinancialHealthCard = ({
  summary,
}: FinancialHealthCardProps) => {

  const formatToLakhs = (amount: number) => {
    const lakhs = amount / 100000;

    return `₹${lakhs.toLocaleString("en-IN", {
      minimumFractionDigits: lakhs % 1 === 0 ? 0 : 1,
      maximumFractionDigits: 2,
    })} Lakh`;
  };

  return (
    <AppCard className="space-y-3 p-3">

      {/* Title */}

      <div className="flex items-center gap-2 mb-3">
        <h2
          className="text-base font-bold text-slate-800"
          style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
        >
          Financial Health Score
        </h2>

        <Info className="h-4 w-4 text-slate-400" />

      </div>

      {/* Gauge */}

      <div className="space-y-5">

        <ScoreGauge
          score={summary.financial_health_score ?? 0}
          maxScore={100}
          risk={summary.risk_level ?? "MEDIUM"}
        />

      </div>

      {/* Confidence */}

      <div className="space-x-5 flex items-center justify-between mb-2">

        <span className="text-sm text-slate-500">
          Confidence Score
        </span>

        <span
          className="
            rounded-md
            bg-green-100
            px-2.5
            py-0.5
            text-sm
            font-semibold
            text-green-700
          "
        >
          {summary.confidence_score ?? 0}%
        </span>

      </div>

      {/* Recommendation */}

      <div
        className="
          rounded-lg
          border
          border-green-100
          bg-gradient-to-br
          from-green-50
          to-white
          p-3
          mb-4
        "
      >

        <h3 className="mb-2 text-sm font-semibold text-slate-800">
          Recommendation
        </h3>

        <div className="flex items-center gap-2">

          <CheckCircle2
            className="h-6 w-6 text-green-600"
          />

          <span className="text-2xl font-bold text-green-700">
            {summary.credit_decision}
          </span>

        </div>

        <hr className="my-3" />

        <div className="space-y-2">

          <div>

            <p
              className="text-[14px] text-slate-500 mb-0.75"
              style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
            >
              Suggested Loan Amount
            </p>

            <p className="text-2xl font-bold text-slate-900 mb-1">
              {formatToLakhs(summary.suggested_loan_amount)}
            </p>

          </div>

          <div>

            <p
              className="text-[14px] text-slate-500 mb-0.75"
              style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
            >
              Loan Limit Range
            </p>

            <p className="text-[18px] font-semibold text-slate-900 mb-1">
              {formatToLakhs(summary.loan_limit_min)} -{" "}
              {formatToLakhs(summary.loan_limit_max)}
            </p>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="grid grid-cols-2 gap-2">

        <div className="flex items-center gap-2">

          <Clock3 className="h-4 w-4 text-slate-500" />

          <div>

            <p className="text-[10px] text-slate-500">
              Monitoring Frequency
            </p>

            <p className="text-sm font-semibold">
              {summary.monitoring_frequency}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-2">

          <ShieldCheck className="h-4 w-4 text-slate-500" />

          <div>

            <p className="text-[10px] text-slate-500">
              Risk Grade
            </p>

            <p className="text-sm font-semibold">
              {summary.risk_grade}
            </p>

          </div>

        </div>

      </div>

    </AppCard>
  );
};

export default FinancialHealthCard;
