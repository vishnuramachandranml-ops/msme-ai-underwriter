import { useFormContext } from "react-hook-form";

import type { Assessment } from "../../schema/assessmentSchema";

const OperationsForm = () => {

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

            {/* Monthly Sales Orders */}

            <div>

                <h3 className="mb-4 text-lg font-semibold">
                    Monthly Sales Orders
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
                                    `operations.monthly_sales_orders.values.${index}`,
                                    { valueAsNumber: true }
                                )}
                                className={inputClass}
                            />
                        </Field>

                    ))}

                </div>

            </div>

            {/* Monthly Purchase Orders */}

            <div>

                <h3 className="mb-4 text-lg font-semibold">
                    Monthly Purchase Orders
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
                                    `operations.monthly_purchase_orders.values.${index}`,
                                    { valueAsNumber: true }
                                )}
                                className={inputClass}
                            />
                        </Field>

                    ))}

                </div>

            </div>

            {/* Other Metrics */}

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">

                <Field label="Vendor Count" required>
                    <input
                        type="number"
                        {...register("operations.vendor_count", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />
                </Field>

                <Field label="Customer Count" required>
                    <input
                        type="number"
                        {...register("operations.customer_count", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />
                </Field>

                <Field label="Repeat Customer Ratio" required>
                    <input
                        type="number"
                        step="0.01"
                        {...register("operations.repeat_customer_ratio", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />
                </Field>

                <Field label="Capacity Utilization" required>
                    <input
                        type="number"
                        step="0.01"
                        {...register("operations.capacity_utilization", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />
                </Field>

                <Field label="Inventory Turnover" required>
                    <input
                        type="number"
                        {...register("operations.inventory_turnover", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />
                </Field>

                <Field label="Order Fulfillment Rate" required>
                    <input
                        type="number"
                        step="0.01"
                        {...register("operations.order_fulfillment_rate", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />
                </Field>

                <Field label="Employee Productivity" required>
                    <input
                        type="number"
                        {...register("operations.employee_productivity", {
                            valueAsNumber: true,
                        })}
                        className={inputClass}
                    />
                </Field>

            </div>

        </div>

    );
};

export default OperationsForm;