import type { CopilotTab } from "@/types/copilot";
import type { AssessmentResponse } from "@/types/assessmentResponse";

import OverviewTab from "./OverviewTab";
import ComponentScoreSummary from "./ComponentScoreSummary";
import EvidencePanel from "./EvidencePanel";
import RecommendationsPanel from "./RecommendationsPanel";

interface Props {
  activeTab: CopilotTab;
  assessmentResponse: AssessmentResponse;
}

const CopilotContent = ({
  activeTab,
  assessmentResponse,
}: Props) => {

  switch (activeTab) {

    case "overview":
      return (
        <OverviewTab
          assessmentResponse={assessmentResponse}
        />
      );

    case "why":
      return (
        <ComponentScoreSummary
          scores={assessmentResponse.component_scores ?? []}
        />
      );

    case "evidence":
      return (
        <EvidencePanel
          positiveSignals={assessmentResponse.positive_signals}
          negativeSignals={assessmentResponse.negative_signals}
          componentBreakdown={assessmentResponse.component_breakdown}
        />
      );

    case "recommendations":
      return (
        <RecommendationsPanel
          recommendations={assessmentResponse.recommendations}
        />
      );
  }

};

export default CopilotContent;
