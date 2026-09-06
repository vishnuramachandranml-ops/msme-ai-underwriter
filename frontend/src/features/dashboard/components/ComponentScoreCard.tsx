import { Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
    Wallet,
    BarChart3,
    ShieldCheck,
    Factory,
    Database,
} from "lucide-react";

import AppCard from "@/components/shared/AppCard";
import type { ComponentScore } from "@/types/assessmentResponse";

import ScoreItem from "./ScoreItem";

interface ComponentScoreCardProps {
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

const ComponentScoreCard = ({
    scores,
}: ComponentScoreCardProps) => {
    return (
        <AppCard className="mt-4 p-4">

            <div className="mb-4 flex items-center gap-2 mb-3">

                <h2
                    className="text-base font-bold text-slate-800"
                    style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
                >
                    Component Scores
                </h2>

                <Info className="h-3.5 w-3.5 text-slate-400" />

            </div>

            <div className="space-y-7 wb-2">

                {scores.map((item) => {

                    const config =
                        componentConfig[item.name] ?? {
                            color: "blue",
                            icon: Database,
                        };

                    return (
                        <ScoreItem
                            key={item.name}
                            title={item.name}
                            score={item.score}
                            color={config.color}
                            icon={config.icon}
                        />
                    );

                })}

            </div>

        </AppCard>
    );
};

export default ComponentScoreCard;
