import { useFormContext } from "react-hook-form";

import type { Assessment } from "../../schema/assessmentSchema";
import BooleanRadioField from "../common/BooleanRadioField";

const BusinessProfileForm = () => {

    const { register } = useFormContext<Assessment>();

    const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
        </div>
    );

    return (

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">

            <div>
                <Field label="Business ID" required>
                    <input
                        {...register("business_profile.business_id")}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </Field>
            </div>

            <div>
                <Field label="Business Name" required>
                    <input
                        {...register("business_profile.business_name")}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </Field>
            </div>

            <div>
                <Field label="Industry" required>
                    <input
                        {...register("business_profile.industry")}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </Field>

            </div>

            <div>
                <Field label="Business Type" required>
                    <input
                        {...register("business_profile.business_type")}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </Field>
            </div>

            <div>
                <Field label="MSME Registered" required>
                    <BooleanRadioField
                        name="business_profile.msme_registered"
                    />
                </Field>
            </div>

            <div>
                <Field label="Udyam Registration Number" required>
                    <input
                        {...register(
                            "business_profile.udyam_registration_number",
                        )}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </Field>
            </div>

            <div>
                <Field label="Business Age (Years)" required>
                    <input
                        type="number"
                        {...register("business_profile.business_age_years", {
                            valueAsNumber: true,
                        })}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </Field>
            </div>

            <div>
                <Field label="Employee Count" required>

                    <input
                        type="number"
                        {...register("business_profile.employee_count", {
                            valueAsNumber: true,
                        })}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    /></Field>
            </div>

            <div>
                <Field label="Annual Turnover" required>
                    <input
                        type="number"
                        {...register("business_profile.annual_turnover", {
                            valueAsNumber: true,
                        })}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    /></Field>
            </div>

            <div>
                <Field label="Location" required>
                    <input
                        {...register("business_profile.location")}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    /></Field>
            </div>

        </div>

    );

};

export default BusinessProfileForm;