import { useLocation } from "react-router-dom";

import BusinessHeader from "@/features/dashboard/components/BusinessHeader";
import FinancialHealthCard from "@/features/dashboard/components/FinancialHealthCard";
import AISummaryCard from "@/features/dashboard/components/AISummaryCard";
import WhatIfSimulator from "@/features/dashboard/components/WhatIfSimulator";
import ComponentScoreCard from "@/features/dashboard/components/ComponentScoreCard";
import ScoreExplanationCard from "@/features/dashboard/components/ScoreExplanationCard";
import AlternateDataCards from "@/features/dashboard/components/AlternateDataCards";
import type { AssessmentRequest } from "@/features/new-assessment/schema/assessmentSchema";
import type { AssessmentResponse } from "@/types/assessmentResponse";

interface DashboardLocationState {
  assessmentRequest: AssessmentRequest;
  assessmentResponse: AssessmentResponse;
}

const Dashboard = () => {

  const location = useLocation();

  const { assessmentRequest, assessmentResponse } =
    (location.state ?? {}) as Partial<DashboardLocationState>;

  if (!assessmentRequest || !assessmentResponse) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            No Assessment Available
          </h2>

          <p className="mt-2 text-slate-500">
            Please create a new assessment from the Assessments page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <BusinessHeader
        businessProfile={assessmentResponse.business_profile}
      />

      <div className="grid grid-cols-12 gap-2.5">

        {/* Left + Center wrapper (spans 9) */}

        <div className="col-span-9">

          <div className="grid grid-cols-9 gap-2.5">

            {/* Left Column */}

            <div className="col-span-3">
              <div className="space-y-4">
                <FinancialHealthCard
                  summary={assessmentResponse.summary}
                />
                <ComponentScoreCard scores={assessmentResponse.component_scores ?? []} />
              </div>
            </div>

            {/* Center Column */}

            <div className="col-span-6">
              <AISummaryCard
                assessmentResponse={assessmentResponse}
              />
              <ScoreExplanationCard
                totalScore={
                  assessmentResponse.summary.financial_health_score ?? 0
                }
                componentBreakdown={
                  assessmentResponse.component_breakdown ?? []
                }
              />
            </div>

          </div>

          {/* Alternate data - spans the full left and center area. */}

          <div className="mt-4">
            <AlternateDataCards
              cards={assessmentResponse.alternate_data_cards ?? []}
            />
          </div>

        </div>

        {/* Right Column */}

        <div className="col-span-3">
          <WhatIfSimulator
            assessmentRequest={assessmentRequest}
            assessmentResponse={assessmentResponse}
          />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
