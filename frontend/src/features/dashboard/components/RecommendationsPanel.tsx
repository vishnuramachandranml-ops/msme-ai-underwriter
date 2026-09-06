import { Info, Lightbulb } from "lucide-react";

interface RecommendationsPanelProps {
  recommendations?: string[];
}

const RecommendationsPanel = ({
  recommendations = [],
}: RecommendationsPanelProps) => {

  if (!recommendations.length) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
        <Info className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        <p className="text-xs text-slate-500">
          No additional recommendations for this assessment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {recommendations.map((recommendation) => (
        <div
          key={recommendation}
          className="flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50/60 p-2"
        >
          <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />

          <p className="text-xs font-medium leading-4 text-slate-800">
            {recommendation}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsPanel;
