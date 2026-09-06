import { useFormContext } from "react-hook-form";

import type { Assessment } from "../../schema/assessmentSchema";
import BooleanRadioField from "../common/BooleanRadioField";

const ComplianceForm = () => {

    const { register } = useFormContext<Assessment>();

    const inputClass =
        "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";


    return (

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    GST Registered
                </label>

                <BooleanRadioField
                    name="compliance.gst_registered"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    ITR Filed (Last 3 Years)
                </label>

                <BooleanRadioField
                    name="compliance.itr_filed_last_3_years"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    EPFO Registered
                </label>

                <BooleanRadioField
                    name="compliance.epfo_registered"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Statutory Dues Pending
                </label>

                <BooleanRadioField
                    name="compliance.statutory_dues_pending"
                />
            </div>
            
            <div>

                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    GST Return Filing Rate
                </label>

                <input
                    type="number"
                    step="0.01"
                    {...register("compliance.gst_return_filing_rate", {
                        valueAsNumber: true,
                    })}
                    className={inputClass}
                />

            </div>

            <div>

                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    EPFO Compliance Rate
                </label>

                <input
                    type="number"
                    step="0.01"
                    {...register("compliance.epfo_compliance_rate", {
                        valueAsNumber: true,
                    })}
                    className={inputClass}
                />

            </div>

            <div>

                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Tax Payment Delay (Days)
                </label>

                <input
                    type="number"
                    {...register("compliance.tax_payment_delay_days", {
                        valueAsNumber: true,
                    })}
                    className={inputClass}
                />

            </div>

            <div>

                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Regulatory Notices
                </label>

                <input
                    type="number"
                    {...register("compliance.regulatory_notices", {
                        valueAsNumber: true,
                    })}
                    className={inputClass}
                />

            </div>

        </div>

    );

};

export default ComplianceForm;