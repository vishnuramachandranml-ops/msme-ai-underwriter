import { Button } from "@/components/ui/button";

interface AssessmentFooterProps {
    activeStep: number;
    totalSteps: number;
    onPrevious: () => void;
    onNext: () => void;
}

const AssessmentFooter = ({
    activeStep,
    totalSteps,
    onPrevious,
    onNext,
}: AssessmentFooterProps) => {


    return (

        <div
            className="
        flex
        items-center
        justify-between
        border-t
        px-8
        py-5
      "
        >

            <Button
                variant="outline"
            >

                Save as Draft

            </Button>

            <div className="flex gap-3">

                <Button
                    type="button"
                    variant="outline"
                    disabled={activeStep === 1}
                    onClick={onPrevious}
                    className="
                        border-slate-300
                        hover:border-blue-600
                        hover:bg-blue-50
                        hover:text-blue-700
                        transition-all
                        duration-200
                    "
                >
                    Previous
                </Button>

                <Button
                    type={
                        activeStep === totalSteps
                            ? "submit"
                            : "button"
                    }
                    onClick={
                        activeStep === totalSteps
                            ? undefined
                            : onNext
                    }
                    className="
                        bg-blue-700
                        text-white
                        font-medium
                        shadow-sm
                        hover:bg-blue-800
                        hover:shadow-md
                        active:bg-blue-900
                        active:scale-[0.98]
                        transition-all
                        duration-200
                    "
                >
                    {activeStep === totalSteps
                        ? "Submit Assessment"
                        : "Save & Continue"}
                </Button>

            </div>

        </div>

    );

};

export default AssessmentFooter;