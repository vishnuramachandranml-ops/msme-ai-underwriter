import { useState } from "react";

import AppCard from "@/components/shared/AppCard";

import type { CopilotTab } from "@/types/copilot";
import type { AssessmentResponse } from "@/types/assessmentResponse";

import CopilotTabs from "./CopilotTabs";
import CopilotContent from "./CopilotContent";

interface AISummaryCardProps {
  assessmentResponse: AssessmentResponse;
}

const AISummaryCard = ({
  assessmentResponse,
}: AISummaryCardProps) => {
  const [activeTab, setActiveTab] =
    useState<CopilotTab>("overview");

  return (
    <AppCard className="space-y-2 p-4">

      {/* Header */}

      <CopilotTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <CopilotContent
        activeTab={activeTab}
        assessmentResponse={assessmentResponse}
      />

    </AppCard>
  );
};

export default AISummaryCard;
