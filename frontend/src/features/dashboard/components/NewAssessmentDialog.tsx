import { useState } from "react";
import { FileJson, PenLine } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import type { AssessmentFormValues } from "@/types/assessment";

import AssessmentForm from "./AssessmentForm";
import JsonImportPanel from "./JsonImportPanel";

interface NewAssessmentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: AssessmentFormValues) => void;
}

type EntryMode = "choose" | "manual" | "import";

const NewAssessmentDialog = ({
    open,
    onOpenChange,
    onSubmit,
}: NewAssessmentDialogProps) => {

    const [mode, setMode] = useState<EntryMode>("choose");
    const [importedValues, setImportedValues] = useState<AssessmentFormValues | undefined>(undefined);

    const resetAndClose = () => {
        setMode("choose");
        setImportedValues(undefined);
        onOpenChange(false);
    };

    const handleImportSuccess = (data: AssessmentFormValues) => {
        setImportedValues(data);
        setMode("manual"); // JSON successfully parsed -> drop into the same form, pre-filled
    };

    const handleSubmit = (values: AssessmentFormValues) => {
        onSubmit(values);
        resetAndClose();
    };

    return (
        <Dialog open={open} onOpenChange={(next) => (next ? onOpenChange(true) : resetAndClose())}>
            <DialogContent
                className="
                !w-[95vw] !max-w-[1100px] !h-[90vh] !max-h-[90vh]
                flex flex-col
                overflow-hidden
                bg-white
                p-6
                shadow-2xl
                "
            >
                <DialogHeader>
                    <DialogTitle className="text-base font-bold">
                        New Assessment
                    </DialogTitle>
                </DialogHeader>


                {mode === "choose" && (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4">

                        <p className="mb-2 text-sm text-slate-500">
                            How would you like to create this assessment?
                        </p>

                        <div className="flex gap-4">

                            <button
                                type="button"
                                onClick={() => setMode("manual")}
                                className={cn(
                                    "flex w-48 flex-col items-center gap-2 rounded-xl border border-slate-200 p-6",
                                    "transition-colors hover:border-blue-300 hover:bg-blue-50"
                                )}
                            >
                                <PenLine className="h-6 w-6 text-blue-600" />
                                <span className="text-sm font-semibold text-slate-800">Fill Manually</span>
                                <span className="text-xs text-slate-400">Enter details field by field</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setMode("import")}
                                className={cn(
                                    "flex w-48 flex-col items-center gap-2 rounded-xl border border-slate-200 p-6",
                                    "transition-colors hover:border-blue-300 hover:bg-blue-50"
                                )}
                            >
                                <FileJson className="h-6 w-6 text-blue-600" />
                                <span className="text-sm font-semibold text-slate-800">Import JSON</span>
                                <span className="text-xs text-slate-400">Upload or paste a JSON file</span>
                            </button>

                        </div>

                    </div>
                )}

                {mode === "import" && (
                    <div className="flex-1 overflow-y-auto">
                        <JsonImportPanel onImportSuccess={handleImportSuccess} />
                    </div>
                )}

                {mode === "manual" && (
                    <AssessmentForm
                        initialValues={importedValues}
                        onSubmit={handleSubmit}
                        onCancel={resetAndClose}
                    />
                )}

            </DialogContent>
        </Dialog>
    );
};

export default NewAssessmentDialog;