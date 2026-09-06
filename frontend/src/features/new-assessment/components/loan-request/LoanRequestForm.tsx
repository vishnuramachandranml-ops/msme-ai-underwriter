import { useFormContext } from "react-hook-form";

import type { Assessment } from "../../schema/assessmentSchema";
import BooleanRadioField from "../common/BooleanRadioField";

const LoanRequestForm = () => {

    const { register } = useFormContext<Assessment>();

    const Field = ({
        label,
        required,
        children,
    }: {
        label: string;
        required?: boolean;
        children: React.ReactNode;
    }) => (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
        </div>
    );

    const inputClass =
        "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

    return (

        <div className="space-y-8">

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">

                <Field label="Loan Type" required>
                    <input
                        {...register("loan_request.loan_type")}
                        className={inputClass}
                    />
                </Field>

                <Field label="Requested Amount" required>
                    <input
                        type="number"
                        {...register("loan_request.requested_amount", { valueAsNumber: true })}
                        className={inputClass}
                    />
                </Field>

                <Field label="Loan Tenure (Months)" required>
                    <input
                        type="number"
                        {...register("loan_request.loan_tenure_months", { valueAsNumber: true })}
                        className={inputClass}
                    />
                </Field>

                <Field label="Loan Purpose" required>
                    <input
                        {...register("loan_request.loan_purpose")}
                        className={inputClass}
                    />
                </Field>

                <Field label="Existing Loan Amount">
                    <input
                        type="number"
                        {...register("loan_request.existing_loan_amount", { valueAsNumber: true })}
                        className={inputClass}
                    />
                </Field>

                <Field label="Existing EMI">
                    <input
                        type="number"
                        {...register("loan_request.existing_emi", { valueAsNumber: true })}
                        className={inputClass}
                    />
                </Field>

            </div>

            <div>

                <h3 className="mb-5 text-lg font-semibold">
                    Collateral Details
                </h3>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">

                    <Field label="Collateral Available">

                        <BooleanRadioField
                            name="loan_request.collateral.available"
                        />

                    </Field>

                    <Field label="Collateral Type">

                        <input
                            {...register("loan_request.collateral.collateral_type")}
                            className={inputClass}
                        />

                    </Field>

                    <Field label="Estimated Value">

                        <input
                            type="number"
                            {...register("loan_request.collateral.estimated_value", { valueAsNumber: true })}
                            className={inputClass}
                        />

                    </Field>

                </div>

            </div>

        </div>

    );

};

export default LoanRequestForm;