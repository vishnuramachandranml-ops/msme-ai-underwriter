import { assessmentSteps } from "../constants/assessmentSteps";
import { cn } from "@/lib/utils";

interface AssessmentStepperProps {
    activeStep: number;
    onStepChange: (step: number) => void;
}

const AssessmentStepper = ({
    activeStep,
    onStepChange,
}: AssessmentStepperProps) => {
    return (
        <div
            className="
            w-[270px]
            shrink-0
            border-r
            bg-slate-50
            overflow-y-auto
        "
        >

            <div className="px-6 py-8">

                <div className="space-y-2">

                    {assessmentSteps.map((step, index) => {

                        const Icon = step.icon;

                        const isActive = step.id === activeStep;

                        const isCompleted = step.id < activeStep;

                        const isLast = index === assessmentSteps.length - 1;

                        return (

                            <div
                                key={step.id}
                                onClick={() => onStepChange(step.id)}
                                className="relative flex cursor-pointer gap-4"
                            >

                                {/* Timeline */}

                                <div className="flex flex-col items-center">

                                    <div
                                        className={cn(
                                            "flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all",

                                            isCompleted &&
                                            "border-blue-700 bg-blue-700 text-white",

                                            isActive &&
                                            "border-blue-700 bg-white text-blue-700",

                                            !isCompleted &&
                                            !isActive &&
                                            "border-slate-300 bg-white text-slate-400"
                                        )}
                                    >

                                        {step.id}

                                    </div>

                                    {!isLast && (

                                        <div
                                            className={cn(
                                                "mt-1 h-8 w-px",

                                                isCompleted
                                                    ? "bg-blue-700"
                                                    : "border-l border-dashed border-slate-300"
                                            )}
                                        />

                                    )}

                                </div>

                                {/* Content */}

                                <div
                                    className={cn(
                                        "flex-1 rounded-[12px] px-3 py-5 transition-all",

                                        isActive &&
                                        "border border-blue-200 bg-white shadow-sm"
                                    )}
                                >

                                    <div className="flex items-start gap-2">

                                        <Icon
                                            className={cn(
                                                "h-5 w-5",

                                                isActive
                                                    ? "text-blue-700"
                                                    : "text-slate-500"
                                            )}
                                        />

                                        <div>

                                            <h4
                                                className={cn(
                                                    "font-[20px]",

                                                    isActive
                                                        ? "text-blue-700"
                                                        : "text-slate-800"
                                                )}
                                            >
                                                {step.title}
                                            </h4>

                                            {/* <p className="mt-1 text-xs leading-5 text-slate-500">
                                                {step.description}
                                            </p> */}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

                {/* Bottom Info */}

                <div className="mt-10 rounded-xl border bg-blue-50 p-4">

                    <p className="text-sm text-blue-700">

                        💾 You can save progress and continue later.

                    </p>

                </div>

            </div>
        </div>
    );
};

export default AssessmentStepper;