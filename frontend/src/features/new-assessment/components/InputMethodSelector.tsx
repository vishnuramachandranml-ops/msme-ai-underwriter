import { FileJson, PencilLine } from "lucide-react";

import AppCard from "@/components/shared/AppCard";

interface InputMethodSelectorProps {
    onManual: () => void;
    onImport: () => void;
}

const InputMethodSelector = ({
    onManual,
    onImport,
}: InputMethodSelectorProps) => {
    return (
        <div className="flex h-full items-center justify-center">

            <div className="mx-auto w-full max-w-2xl">

                <div className="mb-10 text-center">

                    {/* <h2 className="text-3xl font-bold">
            Create New Assessment
          </h2> */}

                    <h2 className="mt-4 font-bold text-slate-600">
                        Choose how you would like to start the assessment.
                    </h2>

                </div>

                <div className="grid grid-cols-2 gap-5">

                    {/* Import JSON */}

                    <div
                        role="button"
                        tabIndex={0}
                        onClick={onImport}
                        className="cursor-pointer"
                    >

                        <AppCard
                            className="
                        h-[250px]
                        w-[300px]
                        cursor-pointer
                        border-2
                        p-5
                        transition-all
                        duration-200
                        hover:-translate-y-1
                        hover:border-blue-600
                        hover:shadow-xl
                        active:scale-[0.98]
                    "
                        >

                            <div className="flex flex-col items-center text-center">

                                <div className="mb-5 rounded-full bg-blue-100 p-5">

                                    <FileJson className="h-5 w-5 text-blue-700" />

                                </div>

                                <h3 className="text-xl font-semibold">

                                    Import JSON

                                </h3>

                                <p className="mt-4 text-xs leading-5 text-slate-500">

                                    Upload an assessment JSON exported.

                                </p>

                                <div className="mt-6 flex items-center justify-center text-sm font-medium text-blue-700">
                                    Click to import →
                                </div>

                            </div>

                        </AppCard>
                    </div>

                    {/* Manual */}

                    <div
                        role="button"
                        tabIndex={0}
                        onClick={onManual}
                        className="cursor-pointer"
                    >

                        <AppCard
                            className="
                        h-[250px]
                        w-[300px]
                        cursor-pointer
                        border-2
                        p-5
                        transition-all
                        duration-200
                        hover:-translate-y-1
                        hover:border-green-600
                        hover:shadow-xl
                        active:scale-[0.98]
                    "
                        >

                            <div className="flex flex-col items-center text-center">

                                <div className="mb-5 rounded-full bg-green-100 p-5">

                                    <PencilLine className="h-5 w-5 text-green-700" />

                                </div>

                                <h3 className="text-xl font-semibold">

                                    Fill Manually

                                </h3>

                                <p className="mt-4 text-xs leading-5 text-slate-500">

                                    Enter business details section by section.

                                </p>

                                <div className="mt-6 flex items-center justify-center text-sm font-medium text-green-700">
                                    Click to start →
                                </div>

                            </div>

                        </AppCard>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default InputMethodSelector;