import { ArrowLeft, UploadCloud } from "lucide-react";
import { useRef } from "react";

import AppCard from "@/components/shared/AppCard";
import { parseAssessmentJson } from "../utils/jsonParser";

import type { Assessment } from "../schema/assessmentSchema";

interface JsonUploaderProps {

    onBack: () => void;

    onImportSuccess: (assessment: Assessment) => void;

}

const JsonUploader = ({
    onBack,
    onImportSuccess,
}: JsonUploaderProps) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleBrowse = () => {
        inputRef.current?.click();
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        try {

            const text = await file.text();

            const json = JSON.parse(text);

            const assessment = parseAssessmentJson(json);

            console.log("Parsed Assessment");

            console.log(assessment);

            onImportSuccess(assessment);;

        } catch (error) {

            console.error("Invalid JSON");

            console.error(error);

        }

    };

    return (

        <div className="flex h-full flex-col">

            {/* Back */}

            <button
                onClick={onBack}
                className="mb-6 inline-flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-all hover"
            >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-blue-100">
                    <ArrowLeft className="h-4 w-4" />
                </span>
                Back
            </button>

            <div className="mb-8 text-center">

                <h2 className="text-2xl font-bold">

                    Import Assessment JSON

                </h2>

                <p className="mt-2 text-slate-500">

                    Upload an assessment JSON file to auto-populate the form.

                </p>

            </div>

            <div
                role="button"
                tabIndex={0}
                onClick={handleBrowse}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleBrowse();
                    }
                }}
                className="mx-auto w-full max-w-3xl cursor-pointer"
            >
                <AppCard
                    className="
                        flex
                        h-[360px]
                        w-full
                        flex-col
                        items-center
                        justify-center
                        border-2
                        border-dashed
                        border-slate-300
                        transition-all
                        hover:border-blue-500
                        hover:bg-blue-50/30
                        hover:shadow-lg
                        "
                >

                    <UploadCloud className="mb-6 h-14 w-14 text-blue-600" />

                    <h3 className="text-xl font-semibold">
                        Drag & Drop JSON
                    </h3>

                    <p className="mt-3 text-sm text-slate-500">
                        or click anywhere to browse
                    </p>

                    <div className="mt-8 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700">
                        Supported format: .json
                    </div>

                </AppCard>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept=".json"
                hidden
                onChange={handleFileChange}
            />

        </div>

    );

};

export default JsonUploader;