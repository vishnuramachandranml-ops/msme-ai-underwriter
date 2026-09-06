import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";

import type { Assessment } from "../schema/assessmentSchema";
import AssessmentService from "@/services/assessment.service"
import type { AssessmentResponse } from "@/types/assessmentResponse";

interface AssessmentFormProviderProps {

    children: React.ReactNode;

    assessmentData: Assessment | null;

    onAssessmentCompleted?: (result: {
        request: Assessment;
        response: AssessmentResponse;
    }) => void;

}

const AssessmentFormProvider = ({
    children,
    assessmentData,
    onAssessmentCompleted,
}: AssessmentFormProviderProps) => {

    const methods = useForm<Assessment>({
        mode: "onChange",
    });

    const onSubmit = async (data: Assessment) => {

        try {

            console.log("Submitting Assessment...");

            const response = await AssessmentService.assess(data);

            onAssessmentCompleted?.({
                request: data,
                response,
            });
            
            console.log("Assessment Submitted Successfully");

            console.log(response);

        } catch (error) {

            console.error("Assessment Submission Failed");

            console.error(error);

        }

    };

    useEffect(() => {

        if (assessmentData) {
            methods.reset(assessmentData);
        }

    }, [assessmentData, methods]);

    return (

        <FormProvider {...methods}>

            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="flex min-h-0 flex-1 flex-col"
            >

                {children}

            </form>

        </FormProvider>

    );

};

export default AssessmentFormProvider;
