import type { Control } from "react-hook-form";
import type { AssessmentFormValues } from "@/types/assessment";
import { NumberField } from "@/components/shared/form-fields/NumberField";

interface Props {
    control: Control<AssessmentFormValues>;
}

const FinancialPositionSection = ({ control }: Props) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <NumberField control={control} name="financial_position.total_assets" label="Total Assets (₹)" />
            <NumberField control={control} name="financial_position.current_assets" label="Current Assets (₹)" />
            <NumberField control={control} name="financial_position.fixed_assets" label="Fixed Assets (₹)" />
            <NumberField control={control} name="financial_position.cash_and_bank" label="Cash and Bank (₹)" />
            <NumberField control={control} name="financial_position.inventory" label="Inventory (₹)" />
            <NumberField control={control} name="financial_position.accounts_receivable" label="Accounts Receivable (₹)" />
            <NumberField control={control} name="financial_position.total_liabilities" label="Total Liabilities (₹)" />
            <NumberField control={control} name="financial_position.current_liabilities" label="Current Liabilities (₹)" />
            <NumberField control={control} name="financial_position.long_term_debt" label="Long Term Debt (₹)" />
            <NumberField control={control} name="financial_position.net_worth" label="Net Worth (₹)" />
            <NumberField control={control} name="financial_position.book_value" label="Book Value (₹)" />
            <NumberField control={control} name="financial_position.working_capital" label="Working Capital (₹)" />
        </div>
    );
};

export default FinancialPositionSection;