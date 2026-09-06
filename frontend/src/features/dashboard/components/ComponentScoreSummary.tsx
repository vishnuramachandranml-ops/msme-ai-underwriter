import type { LucideIcon } from "lucide-react";
import {
  Wallet,
  BarChart3,
  ShieldCheck,
  Factory,
  Database,
} from "lucide-react";

import type { ComponentScore } from "@/types/assessmentResponse";

interface ComponentScoreSummaryProps {
  scores: ComponentScore[];
}

const componentConfig: Record<
  string,
  {
    color: "green" | "blue" | "purple" | "orange";
    icon: LucideIcon;
  }
> = {
  "Cash Flow": {
    color: "green",
    icon: Wallet,
  },
  "Financial Position": {
    color: "orange",
    icon: BarChart3,
  },
  Compliance: {
    color: "purple",
    icon: ShieldCheck,
  },
  Operations: {
    color: "blue",
    icon: Factory,
  },
  "Alternate Data": {
    color: "blue",
    icon: Database,
  },
};

const colorClasses: Record<
  string,
  {
    cardBg: string;
    border: string;
    iconBg: string;
    iconText: string;
    label: string;
  }
> = {
  green: {
    cardBg: "bg-green-50/40",
    border: "border-green-100",
    iconBg: "bg-green-100",
    iconText: "text-green-600",
    label: "text-green-700",
  },
  blue: {
    cardBg: "bg-blue-50/40",
    border: "border-blue-100",
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
    label: "text-blue-700",
  },
  purple: {
    cardBg: "bg-violet-50/40",
    border: "border-violet-100",
    iconBg: "bg-violet-100",
    iconText: "text-violet-600",
    label: "text-violet-700",
  },
  orange: {
    cardBg: "bg-orange-50/40",
    border: "border-orange-100",
    iconBg: "bg-orange-100",
    iconText: "text-orange-600",
    label: "text-orange-700",
  },
};

// Weights are fractional (e.g. 0.25) in the API contract; render as a
// percentage for readability without altering the underlying value.
const formatWeight = (weight: number) =>
  weight <= 1 ? `${Math.round(weight * 100)}%` : `${weight}`;

// Rounds to at most 1 decimal place without adding a trailing ".0"
// (93 -> 93, 94.8 -> 94.8, 100 -> 100) and without altering the raw score
// used anywhere else (waterfall chart, gauge, etc.).
const formatScore = (score: number) => Math.round(score * 10) / 10;

const ComponentScoreSummary = ({
  scores,
}: ComponentScoreSummaryProps) => {

  if (!scores.length) {
    return (
      <p className="text-xs text-slate-500">
        Component scores are not available for this assessment.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-2">

      {scores.map((item) => {

        const config =
          componentConfig[item.name] ?? {
            color: "blue" as const,
            icon: Database,
          };

        const Icon = config.icon;
        const colors = colorClasses[config.color];
        const displayScore = formatScore(item.score);

        return (
          <div
            key={item.name}
            className={`flex h-full flex-col rounded-lg border ${colors.border} ${colors.cardBg} p-2 shadow-sm`}
          >

            <div className="mb-1.5 flex items-center gap-1 overflow-hidden">

              <div
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${colors.iconBg}`}
              >
                <Icon className={`h-2.5 w-2.5 ${colors.iconText}`} />
              </div>

              <span
                className={`min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[9px] font-semibold leading-tight tracking-tight ${colors.label}`}
              >
                {item.name}
              </span>

            </div>

            <p className="leading-none">
              <span className="text-xl font-bold text-slate-900">
                {displayScore}
              </span>
              <span className="ml-0.5 text-[10px] font-medium text-slate-400">
                /100
              </span>
            </p>

            <p className="mt-1 text-[10px] text-slate-500">
              Weight {formatWeight(item.weight)}
            </p>

          </div>
        );
      })}

    </div>
  );
};

export default ComponentScoreSummary;