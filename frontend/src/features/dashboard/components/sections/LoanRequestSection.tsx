import type { Control } from "react-hook-form";
import type { AssessmentFormValues } from "@/types/assessment";
import { NumberField } from "@/components/shared/form-fields/NumberField";
import { TextField } from "@/components/shared/form-fields/TextField";
import { SelectField } from "@/components/shared/form-fields/SelectField";
import { SwitchField } from "@/components/shared/form-fields/SwitchField";

interface Props {
    control: Control<AssessmentFormValues>;
}

const LOAN_TYPE_OPTIONS = [
    { value: "WORKING_CAPITAL", label: "Working Capital" },
    { value: "TERM_LOAN", label: "Term Loan" },
    { value: "EQUIPMENT_FINANCE", label: "Equipment Finance" },
    { value: "TRADE_FINANCE", label: "Trade Finance" },
];

const LoanRequestSection = ({ control }: Props) => {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <SelectField control={control} name="loan_request.loan_type" label="Loan Type" options={LOAN_TYPE_OPTIONS} />
                <NumberField control={control} name="loan_request.requested_amount" label="Requested Amount (₹)" />
                <NumberField control={control} name="loan_request.loan_tenure_months" label="Loan Tenure (Months)" />
                <NumberField control={control} name="loan_request.existing_loan_amount" label="Existing Loan Amount (₹)" />
                <NumberField control={control} name="loan_request.existing_emi" label="Existing EMI (₹)" />
            </div>

            <TextField control={control} name="loan_request.loan_purpose" label="Loan Purpose" placeholder="Working capital expansion" />

            <div className="rounded-lg border border-slate-200 p-3 space-y-3">
                <SwitchField control={control} name="loan_request.collateral.available" label="Collateral Available" />

                <div className="grid grid-cols-2 gap-4">
                    <TextField control={control} name="loan_request.collateral.collateral_type" label="Collateral Type" placeholder="LAND" />
                    <NumberField control={control} name="loan_request.collateral.estimated_value" label="Estimated Value (₹)" />
                </div>
            </div>
        </div>
    );
};

export default LoanRequestSection;