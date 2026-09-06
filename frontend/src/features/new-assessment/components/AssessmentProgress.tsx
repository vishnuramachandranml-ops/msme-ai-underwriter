import { Progress } from "@/components/ui/progress";

interface Props {
    progress: number;
}

const AssessmentProgress = ({
    progress,
}: Props) => {

    return (

        <div className="border-b px-10 py-6">

            <div className="mb-3 flex items-center justify-between">

                <span className="font-medium">
                    Overall Progress
                </span>

                <span className="font-semibold text-blue-700">
                    {progress}% Completed
                </span>

            </div>

            <Progress
                value={progress}
                className="h-2"
            />

        </div>

    );

};

export default AssessmentProgress;