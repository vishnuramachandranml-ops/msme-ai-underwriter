import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
    assessmentSchema,
    assessmentDefaultValues,
    type AssessmentFormValues,
} from "@/types/assessment";

import MetadataSection from "./sections/MetadataSection";
import BusinessProfileSection from "./sections/BusinessProfileSection";
import CashflowSection from "./sections/CashflowSection";
import OperationsSection from "./sections/OperationsSection";
import AlternateDataSection from "./sections/AlternateDataSection";
import ComplianceSection from "./sections/ComplianceSection";
import FinancialPositionSection from "./sections/FinancialPositionSection";
import LoanRequestSection from "./sections/LoanRequestSection";

// Each tab knows which top-level schema key(s) it owns, so we can
// check react-hook-form's error object for that key to derive status.
const SECTIONS = [
    { id: "metadata", label: "Metadata", keys: ["metadata"], Component: MetadataSection },
    { id: "business_profile", label: "Business Profile", keys: ["business_profile"], Component: BusinessProfileSection },
    { id: "cashflow", label: "Cashflow", keys: ["cashflow"], Component: CashflowSection },
    { id: "operations", label: "Operations", keys: ["operations"], Component: OperationsSection },
    { id: "alternate_data", label: "Alternate Data", keys: ["alternate_data"], Component: AlternateDataSection },
    { id: "compliance", label: "Compliance", keys: ["compliance"], Component: ComplianceSection },
    { id: "financial_position", label: "Financial Position", keys: ["financial_position"], Component: FinancialPositionSection },
    { id: "loan_request", label: "Loan Request", keys: ["loan_request"], Component: LoanRequestSection },
] as const;

type SectionKey = (typeof SECTIONS)[number]["keys"][number];

interface AssessmentFormProps {
    initialValues?: AssessmentFormValues;
    onSubmit: (values: AssessmentFormValues) => void;
    onCancel: () => void;
}

const AssessmentForm = ({
    initialValues,
    onSubmit,
    onCancel,
}: AssessmentFormProps) => {

    const form = useForm<AssessmentFormValues>({
        resolver: zodResolver(assessmentSchema),
        defaultValues: initialValues ?? assessmentDefaultValues,
        mode: "onBlur",
    });

    const { control, handleSubmit, formState } = form;
    const { errors, dirtyFields, isSubmitted } = formState;

    // Determine badge status per section:
    // - "error"    → this section has validation errors
    // - "complete" → no errors AND at least one field in this section has been touched/dirty
    // - "none"     → untouched, no badge shown
    const getSectionStatus = (keys: readonly SectionKey[]): "error" | "complete" | "none" => {

        const hasError = keys.some((key) => Boolean(errors[key]));
        if (hasError) return "error";

        const hasDirtyField = keys.some((key) => Boolean(dirtyFields[key]));
        if (hasDirtyField || isSubmitted) return "complete";

        return "none";
    };

    const handleFormSubmit = (values: AssessmentFormValues) => {
        onSubmit(values);
    };

    return (
        <FormProvider {...form}>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex h-full flex-col"
            >
                <Tabs defaultValue={SECTIONS[0].id} className="flex flex-1 flex-col overflow-hidden">

                    <TabsList className="mb-4 h-auto flex-wrap justify-start gap-1 bg-slate-100 p-1">
                        {SECTIONS.map(({ id, label, keys }) => {

                            const status = getSectionStatus(keys);

                            return (
                                <TabsTrigger
                                    key={id}
                                    value={id}
                                    className="flex items-center gap-1.5 text-xs data-[state=active]:bg-white"
                                >
                                    {label}

                                    {status === "error" && (
                                        <AlertCircle className="h-3 w-3 text-red-500" />
                                    )}

                                    {status === "complete" && (
                                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                                    )}
                                </TabsTrigger>
                            );

                        })}
                    </TabsList>

                    <div className="flex-1 overflow-y-auto px-1 pb-2">
                        {SECTIONS.map(({ id, Component }) => (
                            <TabsContent key={id} value={id} className="mt-0">
                                <Component control={control} />
                            </TabsContent>
                        ))}
                    </div>

                </Tabs>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">

                    <span
                        className={cn(
                            "text-xs font-medium",
                            Object.keys(errors).length > 0 ? "text-red-500" : "text-slate-400"
                        )}
                    >
                        {Object.keys(errors).length > 0
                            ? `${Object.keys(errors).length} section(s) need attention`
                            : "All sections look good"}
                    </span>

                    <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>

                        <Button type="submit">
                            Submit Assessment
                        </Button>
                    </div>

                </div>
            </form>
        </FormProvider>
    );
};

export default AssessmentForm;