import {
  BadgeCheck,
  Lightbulb,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import type { CopilotTab } from "@/types/copilot";

interface CopilotTabsProps {
  activeTab: CopilotTab;
  onChange: (tab: CopilotTab) => void;
}

const tabs = [
  {
    id: "overview",
    label: "AI Copilot",
    icon: Sparkles,
  },
  {
    id: "why",
    label: "Why This Score?",
    icon: TriangleAlert,
  },
  {
    id: "evidence",
    label: "Evidence",
    icon: BadgeCheck,
  },
  {
    id: "recommendations",
    label: "More",
    icon: Lightbulb,
  },
] satisfies {
  id: CopilotTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[];

const CopilotTabs = ({
  activeTab,
  onChange,
}: CopilotTabsProps) => {
  return (
    <>

      <div className="grid grid-cols-4">

        {tabs.map((tab) => {

          const Icon = tab.icon;

          const active =
            activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                flex
                items-center
                justify-center
                gap-2
                border-b-2
                pb-2
                text-xs
                font-medium
                transition-colors
                relative


                ${
                  active
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }
              `}
            >
              <Icon className="h-4 w-4" />

              {tab.label}

            </button>
          );
        })}

      </div>

      <div className="-mt-2">
          <hr className="border-slate-200" />
      </div>

    </>
  );
};

export default CopilotTabs;