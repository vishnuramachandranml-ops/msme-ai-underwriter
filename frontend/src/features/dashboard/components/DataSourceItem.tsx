import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    label: string;
    coverage: number;
    quality: "Excellent" | "Good" | "Fair" | "Poor";
    icon: LucideIcon;
}

const qualityColor: Record<Props["quality"], string> = {
    Excellent: "text-green-600",
    Good: "text-green-600",
    Fair: "text-amber-600",
    Poor: "text-red-600",
};

const DataSourceItem = ({
    label,
    coverage,
    quality,
    icon: Icon,
}: Props) => {
    return (
        <div className="w-fit min-w-[100px] shrink-0 rounded-lg border border-slate-150 bg-slate-100 p-2.5">

            <div className="mb-2 flex items-center gap-1.5">

                <Icon className="h-4 w-4 shrink-0 text-slate-500" />

                <span className="whitespace-nowrap text-xs font-semibold text-slate-800">
                    {label}
                </span>
            </div>

            <p className="mb-1 text-base font-bold text-slate-900">
                {coverage}%
            </p>

            <div className={cn("flex items-center gap-1 text-[11px] font-semibold", qualityColor[quality])}>
                <span>{quality}</span>

                <div className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-green-600">
                    <Check className="h-2 w-2 text-white" strokeWidth={3} />
                </div>
            </div>

        </div>
    );
};

export default DataSourceItem;