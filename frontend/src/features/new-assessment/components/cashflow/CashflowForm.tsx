import { useFormContext } from "react-hook-form";

import type { Assessment } from "../../schema/assessmentSchema";

const inputClass =
    "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

interface FieldProps {
    label: string;
    children: React.ReactNode;
}

const Field = ({ label, children }: FieldProps) => (

    <div>

        <label className="mb-2 block text-sm font-medium text-slate-700">

            {label}

        </label>

        {children}

    </div>

);

const CashflowForm = () => {

    const { register } = useFormContext<Assessment>();

    return (

        <div className="space-y-8">

            {/* Monthly Revenue */}

            <div>

                <h3 className="mb-4 text-base font-semibold">

                    Monthly Revenue

                </h3>

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">

                    {Array.from({ length: 6 }).map((_, index) => (

                        <Field
                            key={index}
                            label={`Month ${index + 1}`}
                        >

                            <input
                                type="number"
                                {...register(
                                    `cashflow.monthly_revenue.values.${index}`,
                                    {
                                        valueAsNumber: true,
                                    },
                                )}
                                className={inputClass}
                            />

                        </Field>

                    ))}

                </div>

            </div>

            {/* Monthly Expenses */}

            <div>

                <h3 className="mb-4 text-base font-semibold">

                    Monthly Expenses

                </h3>

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">

                    {Array.from({ length: 6 }).map((_, index) => (

                        <Field
                            key={index}
                            label={`Month ${index + 1}`}
                        >

                            <input
                                type="number"
                                {...register(
                                    `cashflow.monthly_expenses.values.${index}`,
                                    {
                                        valueAsNumber: true,
                                    },
                                )}
                                className={inputClass}
                            />

                        </Field>

                    ))}

                </div>

            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                <Field label="Average Collection Days">

                    <input
                        type="number"
                        {...register(
                            "cashflow.average_collection_days",
                            {
                                valueAsNumber: true,
                            },
                        )}
                        className={inputClass}
                    />

                </Field>

                <Field label="Average Supplier Payment Days">

                    <input
                        type="number"
                        {...register(
                            "cashflow.average_supplier_payment_days",
                            {
                                valueAsNumber: true,
                            },
                        )}
                        className={inputClass}
                    />

                </Field>

            </div>

        </div>

    );

};

export default CashflowForm;