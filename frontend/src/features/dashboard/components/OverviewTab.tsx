import InsightCards from "./InsightCards";
import aiBot from "@/assets/assistant.png";
import type { AssessmentResponse } from "@/types/assessmentResponse";

interface OverviewTabProps {
  assessmentResponse: AssessmentResponse;
}

const OverviewTab = ({
  assessmentResponse,
}: OverviewTabProps) => {
  const analysis = assessmentResponse.llm_analysis;

  return (
    <div className="space-y-5">

      {/* Summary Header */}

      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-blue-50
          "
        >
          {/* <Bot className="h-5 w-5 text-blue-600" /> */}
          <img
            src={aiBot}
            alt="AI Underwriter"
            className="h-10 w-9 object-contain"
          />
        </div>

        <h3 className="text-base font-semibold text-slate-900">
          AI Underwriter Summary
        </h3>

      </div>

      {/* Summary */}

      <div className="max-w-xl space-y-5">

        {/* {copilot.overview.map((paragraph) => (
          <p
            key={paragraph}
            className="text-[13px] leading-4 text-slate-700"
          >
            {paragraph}
          </p>
        ))} */}

        <p className="text-[13px] leading-6 text-slate-700">
          {
            analysis?.executive_summary.trim()
              ? analysis.executive_summary
              : "AI summary is not available for this assessment."
          }
        </p>

      </div>

      {/* Insight Cards */}

      <InsightCards
        positiveSignals={assessmentResponse?.positive_signals}
        monitoringPoints={analysis?.monitoring_points}
        creditOpinion={analysis?.credit_opinion}
      />

    </div>
  );
};

export default OverviewTab;
