import type { Control } from "react-hook-form";
import type { AssessmentFormValues } from "@/types/assessment";
import { NumberField } from "@/components/shared/form-fields/NumberField";
import { MonthlySeriesField } from "@/components/shared/form-fields/MonthlySeriesField";

interface Props {
    control: Control<AssessmentFormValues>;
}

const CashflowSection = ({ control }: Props) => {
    return (
        <div className="space-y-5">
            <MonthlySeriesField control={control} name="cashflow.monthly_revenue.values" label="Monthly Revenue" />
            <MonthlySeriesField control={control} name="cashflow.monthly_expenses.values" label="Monthly Expenses" />

            <div className="grid grid-cols-2 gap-4">
                <NumberField control={control} name="cashflow.average_collection_days" label="Average Collection Days" />
                <NumberField control={control} name="cashflow.average_supplier_payment_days" label="Average Supplier Payment Days" />
            </div>
        </div>
    );
};

export default CashflowSection;