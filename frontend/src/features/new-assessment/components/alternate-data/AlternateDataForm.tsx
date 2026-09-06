import { useFormContext } from "react-hook-form";

import type { Assessment } from "../../schema/assessmentSchema";
import BooleanRadioField from "../common/BooleanRadioField";

const AlternateDataForm = () => {

    const { register } = useFormContext<Assessment>();

    const inputClass =
        "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

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

    return (

        <div className="space-y-8">

            {/* GST & Banking */}

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">

                <Field label="GST Registered" required>
                    <BooleanRadioField
                        name="alternate_data.gst_registered"
                    />
                </Field>

                <Field label="GST Filing Rate" required>

                    <input
                        type="number"
                        step="0.01"
                        {...register("alternate_data.gst_filing_rate", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />

                </Field>

                <Field label="GST Turnover" required>

                    <input
                        type="number"
                        {...register("alternate_data.gst_turnover", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />

                </Field>

                <Field label="UPI Transaction Count" required>

                    <input
                        type="number"
                        {...register("alternate_data.upi_transaction_count", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />

                </Field>

                <Field label="UPI Transaction Volume" required>

                    <input
                        type="number"
                        {...register("alternate_data.upi_transaction_volume", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />

                </Field>

                <Field label="Average Bank Balance" required>

                    <input
                        type="number"
                        {...register("alternate_data.average_bank_balance", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />

                </Field>

                <Field label="Digital Payment Ratio" required>

                    <input
                        type="number"
                        step="0.01"
                        {...register("alternate_data.digital_payment_ratio", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />

                </Field>

                <Field label="Positive Bank Statement Months" required>

                    <input
                        type="number"
                        {...register("alternate_data.positive_bank_statement_months", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />

                </Field>

                <Field label="Online Rating" required>

                    <input
                        type="number"
                        step="0.1"
                        {...register("alternate_data.online_rating", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />

                </Field>

            </div>

            {/* Electricity */}

            <div>

                <h3 className="mb-4 text-lg font-semibold">
                    Electricity Units
                </h3>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

                    {Array.from({ length: 6 }).map((_, index) => (

                        <Field
                            key={index}
                            label={`Month ${index + 1}`}
                            required
                        >

                            <input
                                type="number"
                                {...register(
                                    `alternate_data.electricity_units.values.${index}`,
                                    { valueAsNumber: true }
                                )}
                                className={inputClass}
                            />

                        </Field>

                    ))}

                </div>

            </div>

            {/* Fuel */}

            <div>

                <h3 className="mb-4 text-lg font-semibold">
                    Fuel Expense
                </h3>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

                    {Array.from({ length: 6 }).map((_, index) => (

                        <Field
                            key={index}
                            label={`Month ${index + 1}`}
                            required
                        >

                            <input
                                type="number"
                                {...register(
                                    `alternate_data.fuel_expense.values.${index}`,
                                    { valueAsNumber: true }
                                )}
                                className={inputClass}
                            />

                        </Field>

                    ))}

                </div>

            </div>

        </div>

    );

};

export default AlternateDataForm;