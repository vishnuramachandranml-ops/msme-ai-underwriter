import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import AssessmentDialog from "@/features/new-assessment/components/AssessmentDialog";

const NewAssessmentButton = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="outline"
                onClick={() => setOpen(true)}
                className="
                    h-11
                    gap-2
                    rounded-xl
                    border-blue-200
                    bg-white
                    px-5
                    text-blue-600
                    shadow-sm
                    transition-all
                    hover:bg-blue-50
                    hover:text-blue-700
                "
            >
                <Plus className="h-4 w-4" />
                <span>New Assessment</span>
            </Button>

            <AssessmentDialog
                open={open}
                onOpenChange={setOpen}
            />

            {/* <NewAssessmentDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={handleAssessmentSubmit}
            /> */}
        </>
    );
};

export default NewAssessmentButton;