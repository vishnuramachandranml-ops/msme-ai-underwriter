import AppCard from "@/components/shared/AppCard";
import WaterfallChart from "./WaterfallChart";
import type { ComponentBreakdown } from "@/types/assessmentResponse";

interface ScoreExplanationCardProps {
    totalScore: number;
    componentBreakdown: ComponentBreakdown[];
}

const ScoreExplanationCard = ({
    totalScore,
    componentBreakdown
    ,
}: ScoreExplanationCardProps) => {

    return (
        <AppCard className="mt-4 p-4">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2
                        className="text-base font-bold text-slate-800"
                        style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
                    >
                        Why Financial Health Score is {totalScore}?
                    </h2>

                </div>
            </div>

            <WaterfallChart
                totalScore={totalScore}
                componentBreakdown={componentBreakdown}
            />
        </AppCard>
    );
};

export default ScoreExplanationCard;
