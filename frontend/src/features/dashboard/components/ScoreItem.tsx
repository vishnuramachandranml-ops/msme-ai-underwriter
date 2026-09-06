import type { LucideIcon } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Props {
    title: string;
    score: number;
    color: "green" | "blue" | "purple" | "orange";
    icon: LucideIcon;
}

const ScoreItem = ({
    title,
    score,
    color,
    icon: Icon,
}: Props) => {

    const progressColor = {
        green: "bg-gradient-to-r from-green-500 to-green-300",
        blue: "bg-gradient-to-r from-blue-500 to-blue-300",
        purple: "bg-gradient-to-r from-violet-500 to-violet-300",
        orange: "bg-gradient-to-r from-orange-500 to-orange-300",
    };

    const iconBg = {
        green: "bg-green-500",
        blue: "bg-blue-500",
        purple: "bg-violet-500",
        orange: "bg-orange-500",
    };

    return (
        <div className="space-y-2">

            <div className="flex items-start gap-3">

                {/* Icon */}

                <div
                    className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                        iconBg[color]
                    )}
                >
                    <Icon className="h-3.5 w-3.5 text-white" />
                </div>

                {/* Content */}

                <div className="flex-1">

                    <div className="mb-2 flex items-center justify-between">

                        <span
                            className={cn(
                                "text-xs font-semibold",
                                {
                                    "text-green-600": color === "green",
                                    "text-blue-600": color === "blue",
                                    "text-violet-600": color === "purple",
                                    "text-orange-600": color === "orange",
                                }
                            )}
                        >
                            {title}
                        </span>

                        <div className="text-sm">

                            <span className="font-bold text-slate-900">
                                {score}
                            </span>

                            <span className="text-slate-400">
                                /100
                            </span>

                        </div>

                    </div>

                    <Progress
                        value={score}
                        className="h-2 bg-slate-100"
                        indicatorClassName={cn(progressColor[color], "rounded-full")}
                    />

                </div>

            </div>

        </div>
    );
};

export default ScoreItem;