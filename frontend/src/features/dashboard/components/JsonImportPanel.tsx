import { useRef, useState } from "react";
import { UploadCloud, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { parseAssessmentJson } from "../utils/parseAssessmentJson";
import type { AssessmentFormValues } from "@/types/assessment";

interface JsonImportPanelProps {
    onImportSuccess: (data: AssessmentFormValues) => void;
}

const JsonImportPanel = ({ onImportSuccess }: JsonImportPanelProps) => {

    const [rawText, setRawText] = useState("");
    const [errors, setErrors] = useState<string[] | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const runParse = (text: string) => {
        const result = parseAssessmentJson(text);

        if (!result.success || !result.data) {
            setErrors(result.errors ?? ["Unknown error while parsing JSON."]);
            return;
        }

        setErrors(null);
        onImportSuccess(result.data);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            const text = String(reader.result ?? "");
            setRawText(text);
            runParse(text);
        };

        reader.readAsText(file);

        // reset input so selecting the same file again still fires onChange
        e.target.value = "";
    };

    const handlePasteValidate = () => {
        runParse(rawText);
    };

    return (
        <div className="space-y-4">

            <div
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center transition-colors hover:bg-slate-100"
                onClick={() => fileInputRef.current?.click()}
            >
                <UploadCloud className="h-6 w-6 text-slate-400" />

                <p className="text-sm font-medium text-slate-600">
                    Click to upload a JSON file
                </p>

                <p className="text-xs text-slate-400">
                    or paste the JSON below
                </p>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/json,.json"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            <div>
                <Textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste assessment JSON here..."
                    className="h-40 font-mono text-xs"
                />

                <div className="mt-2 flex justify-end">
                    <Button
                        type="button"
                        size="sm"
                        onClick={handlePasteValidate}
                        disabled={!rawText.trim()}
                    >
                        Validate &amp; Populate Form
                    </Button>
                </div>
            </div>

            {errors && errors.length > 0 && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">

                    <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.length} issue{errors.length > 1 ? "s" : ""} found
                    </div>

                    <ul className="max-h-32 space-y-1 overflow-y-auto text-[11px] text-red-500">
                        {errors.map((err, i) => (
                            <li key={i}>• {err}</li>
                        ))}
                    </ul>

                </div>
            )}

        </div>
    );
};

export default JsonImportPanel;