import type { Control } from "react-hook-form";
import type { AssessmentFormValues } from "@/types/assessment";
import { TextField } from "@/components/shared/form-fields/TextField";
import { NumberField } from "@/components/shared/form-fields/NumberField";
import { SelectField } from "@/components/shared/form-fields/SelectField";
import { SwitchField } from "@/components/shared/form-fields/SwitchField";

interface Props {
    control: Control<AssessmentFormValues>;
}

const INDUSTRY_OPTIONS = [
    { value: "MANUFACTURING", label: "Manufacturing" },
    { value: "SERVICES", label: "Services" },
    { value: "TRADING", label: "Trading" },
    { value: "AGRICULTURE", label: "Agriculture" },
    { value: "CONSTRUCTION", label: "Construction" },
    { value: "OTHER", label: "Other" },
];

const BusinessProfileSection = ({ control }: Props) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <TextField control={control} name="business_profile.business_id" label="Business ID" placeholder="MSME001" />
            <TextField control={control} name="business_profile.business_name" label="Business Name" placeholder="Metro Engineering" />
            <SelectField control={control} name="business_profile.industry" label="Industry" options={INDUSTRY_OPTIONS} />
            <TextField control={control} name="business_profile.business_type" label="Business Type" placeholder="Private Limited" />
            <TextField control={control} name="business_profile.udyam_registration_number" label="Udyam Registration Number" placeholder="UDYAM-XX-1234567" />
            <TextField control={control} name="business_profile.location" label="Location" placeholder="Coimbatore" />
            <NumberField control={control} name="business_profile.business_age_years" label="Business Age (Years)" />
            <NumberField control={control} name="business_profile.employee_count" label="Employee Count" />
            <NumberField control={control} name="business_profile.annual_turnover" label="Annual Turnover (₹)" />

            <div className="col-span-2">
                <SwitchField control={control} name="business_profile.msme_registered" label="MSME Registered" />
            </div>
        </div>
    );
};

export default BusinessProfileSection;