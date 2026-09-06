import "react-circular-progressbar/dist/styles.css";

import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { getRiskColor } from "@/lib/risk";

interface ScoreGaugeProps {
  score: number;
  maxScore: number;
  risk: string;
}

const ScoreGauge = ({
  score,
  maxScore,
  risk,
}: ScoreGaugeProps) => {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="mx-auto h-40 w-56">
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={5}
        circleRatio={0.5}
        styles={buildStyles({
          rotation: 0.75,
          pathColor: getRiskColor(risk),
          trailColor: "#E5E7EB",
          strokeLinecap: "round",
        })}
      >
        <div className="flex flex-col items-center -mt-10">
          <div className="flex items-end gap-1">
            <span className="text-4xl font-bold text-slate-900">
              {score}
            </span>

            <span className="mb-1 text-base text-slate-500">
              /{maxScore}
            </span>
          </div>

          <p className="mt-2 text-lg font-semibold text-green-600 uppercase">
            {risk}
          </p>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default ScoreGauge;