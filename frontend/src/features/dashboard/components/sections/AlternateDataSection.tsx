import type { Control } from "react-hook-form";
import type { AssessmentFormValues } from "@/types/assessment";
import { NumberField } from "@/components/shared/form-fields/NumberField";
import { SwitchField } from "@/components/shared/form-fields/SwitchField";
import { MonthlySeriesField } from "@/components/shared/form-fields/MonthlySeriesField";

interface Props {
    control: Control<AssessmentFormValues>;
}

const AlternateDataSection = ({ control }: Props) => {
    return (
        <div className="space-y-5">
            <SwitchField control={control} name="alternate_data.gst_registered" label="GST Registered" />

            <div className="grid grid-cols-2 gap-4">
                <NumberField control={control} name="alternate_data.gst_filing_rate" label="GST Filing Rate (0-1)" step={0.01} />
                <NumberField control={control} name="alternate_data.gst_turnover" label="GST Turnover (₹)" />
                <NumberField control={control} name="alternate_data.upi_transaction_count" label="UPI Transaction Count" />
                <NumberField control={control} name="alternate_data.upi_transaction_volume" label="UPI Transaction Volume (₹)" />
                <NumberField control={control} name="alternate_data.average_bank_balance" label="Average Bank Balance (₹)" />
                <NumberField control={control} name="alternate_data.digital_payment_ratio" label="Digital Payment Ratio (0-1)" step={0.01} />
                <NumberField control={control} name="alternate_data.positive_bank_statement_months" label="Positive Bank Statement Months" />
                <NumberField control={control} name="alternate_data.online_rating" label="Online Rating (0-5)" step={0.1} />
            </div>

            <MonthlySeriesField control={control} name="alternate_data.electricity_units.values" label="Electricity Units" />
            <MonthlySeriesField control={control} name="alternate_data.fuel_expense.values" label="Fuel Expense" />
        </div>
    );
};

export default AlternateDataSection;