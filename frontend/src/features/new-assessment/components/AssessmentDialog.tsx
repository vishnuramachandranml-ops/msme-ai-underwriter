import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

import type { Assessment } from "../schema/assessmentSchema";

import AssessmentFormProvider from "./AssessmentFormProvider";
import AssessmentHeader from "./AssessmentHeader";
import AssessmentStepper from "./AssessmentStepper";
import AssessmentFooter from "./AssessmentFooter";
import InputMethodSelector from "./InputMethodSelector";
import JsonUploader from "./JsonUploader";
import { useState} from "react";
import SectionContainer from "./SectionContainer";
import { useNavigate } from "react-router-dom";


interface AssessmentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const AssessmentDialog = ({
    open,
    onOpenChange,
}: AssessmentDialogProps) => {


    const navigate = useNavigate();


    const [inputMethod, setInputMethod] = useState<
        "select" | "manual" | "json"
    >("select");

    const [activeStep, setActiveStep] = useState(1);

    const [assessmentData, setAssessmentData] =
        useState<Assessment | null>(null);

    const totalSteps = 7;

    const nextStep = () => {

        if (activeStep < totalSteps) {
            setActiveStep((prev) => prev + 1);
        }

    };

    const previousStep = () => {

        if (activeStep > 1) {
            setActiveStep((prev) => prev - 1);
        }

    };


    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {

                if (!isOpen) {
                    setInputMethod("select");
                    setActiveStep(1);
                    setAssessmentData(null);
                }

                onOpenChange(isOpen);

            }}
        >
            <DialogContent
                className="
                !w-[96vw]
                !max-w-[1200px]
                !h-[94vh]
                !max-h-[100vh]
                flex
                flex-col
                overflow-hidden
                rounded-2xl
                bg-white
                p-0
                shadow-2xl
            "
            >
                <div className="flex h-full flex-col">

                    <AssessmentHeader />

                    {inputMethod === "select" && (
                        <InputMethodSelector
                            onManual={() => setInputMethod("manual")}
                            onImport={() => setInputMethod("json")}
                        />
                    )}

                    {inputMethod === "json" && (
                        <JsonUploader
                            onBack={() => setInputMethod("select")}
                            onImportSuccess={(assessment) => {

                                setAssessmentData(assessment);

                                setInputMethod("manual");

                                setActiveStep(1);

                            }}
                        />
                    )}

                    {inputMethod === "manual" && (
                        <>

                            <AssessmentFormProvider
                                assessmentData={assessmentData}
                                onAssessmentCompleted={({ request, response }) => {

                                    onOpenChange(false);

                                    navigate("/dashboard", {
                                        state: {
                                            assessmentRequest: request,
                                            assessmentResponse: response,
                                        },
                                    });

                                }}
                            >
                                {/* <AssessmentProgress progress={progress} /> */}

                                <div className="flex flex-1 overflow-hidden">

                                    <AssessmentStepper
                                        activeStep={activeStep}
                                        onStepChange={setActiveStep}
                                    />

                                    <SectionContainer
                                        activeStep={activeStep}
                                    />

                                </div>

                                <AssessmentFooter
                                    activeStep={activeStep}
                                    totalSteps={totalSteps}
                                    onPrevious={previousStep}
                                    onNext={nextStep}
                                />

                            </AssessmentFormProvider>

                        </>
                    )}

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AssessmentDialog;