import { CheckCircle2, TriangleAlert } from "lucide-react";

import type { ComponentBreakdown } from "@/types/assessmentResponse";

interface EvidencePanelProps {
  positiveSignals?: string[];
  negativeSignals?: string[];
  componentBreakdown?: ComponentBreakdown[];
}

interface SupportingMetric {
  metric: string;
  value: number;
  score: number;
}

// Only attaches a supporting metric when the signal text and a real metric
// name from component_breakdown clearly overlap. Never fabricates a value —
// if nothing matches, the signal renders on its own with no supporting data.
const findSupportingMetric = (
  signal: string,
  componentBreakdown: ComponentBreakdown[],
): SupportingMetric | null => {
  const normalizedSignal = signal.toLowerCase();

  for (const component of componentBreakdown) {
    for (const metric of component.metrics ?? []) {
      const metricName = metric.metric.toLowerCase();

      if (
        normalizedSignal.includes(metricName) ||
        metricName.includes(normalizedSignal)
      ) {
        return {
          metric: metric.metric,
          value: metric.value,
          score: metric.score,
        };
      }
    }
  }

  return null;
};

interface EvidenceListProps {
  items: string[];
  componentBreakdown: ComponentBreakdown[];
  tone: "positive" | "negative";
  emptyMessage: string;
}

const EvidenceList = ({
  items,
  componentBreakdown,
  tone,
  emptyMessage,
}: EvidenceListProps) => {

  if (!items.length) {
    return (
      <p className="text-xs text-slate-500">
        {emptyMessage}
      </p>
    );
  }

  const visibleItems = items.slice(0, 5);
  const Icon = tone === "positive" ? CheckCircle2 : TriangleAlert;
  const iconColor = tone === "positive" ? "text-green-600" : "text-amber-600";
  const borderColor = tone === "positive" ? "border-green-100" : "border-amber-100";
  const bgColor = tone === "positive" ? "bg-green-50/60" : "bg-amber-50/60";

  return (
    <div className="space-y-1.5">

      {visibleItems.map((item) => {

        const supporting = findSupportingMetric(item, componentBreakdown);

        return (
          <div
            key={item}
            className={`flex items-start gap-2 rounded-lg border ${borderColor} ${bgColor} p-2`}
          >

            <Icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${iconColor}`} />

            <div className="min-w-0">

              <p className="text-xs font-medium leading-4 text-slate-800">
                {item}
              </p>

              {supporting && (
                <p className="mt-0.5 text-[10px] text-slate-500">
                  {supporting.metric}: {supporting.value} · Score {supporting.score}
                </p>
              )}

            </div>

          </div>
        );
      })}

      {items.length > visibleItems.length && (
        <p className="text-[11px] font-medium text-blue-600">
          + {items.length - visibleItems.length} more...
        </p>
      )}

    </div>
  );
};

const EvidencePanel = ({
  positiveSignals = [],
  negativeSignals = [],
  componentBreakdown = [],
}: EvidencePanelProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">

      <div>
        <h4 className="mb-2 text-xs font-semibold text-green-700">
          Strengths
        </h4>

        <EvidenceList
          items={positiveSignals}
          componentBreakdown={componentBreakdown}
          tone="positive"
          emptyMessage="No strengths identified."
        />
      </div>

      <div>
        <h4 className="mb-2 text-xs font-semibold text-amber-700">
          Watchlist
        </h4>

        <EvidenceList
          items={negativeSignals}
          componentBreakdown={componentBreakdown}
          tone="negative"
          emptyMessage="No watchlist items identified."
        />
      </div>

    </div>
  );
};

export default EvidencePanel;
