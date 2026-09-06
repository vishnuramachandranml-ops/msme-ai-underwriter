import type { Control } from "react-hook-form";
import type { AssessmentFormValues } from "@/types/assessment";
import { NumberField } from "@/components/shared/form-fields/NumberField";
import { SwitchField } from "@/components/shared/form-fields/SwitchField";

interface Props {
    control: Control<AssessmentFormValues>;
}

const ComplianceSection = ({ control }: Props) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <SwitchField control={control} name="compliance.gst_registered" label="GST Registered" />
                <SwitchField control={control} name="compliance.itr_filed_last_3_years" label="ITR Filed (Last 3 Years)" />
                <SwitchField control={control} name="compliance.epfo_registered" label="EPFO Registered" />
                <SwitchField control={control} name="compliance.statutory_dues_pending" label="Statutory Dues Pending" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <NumberField control={control} name="compliance.gst_return_filing_rate" label="GST Return Filing Rate (0-1)" step={0.01} />
                <NumberField control={control} name="compliance.epfo_compliance_rate" label="EPFO Compliance Rate (0-1)" step={0.01} />
                <NumberField control={control} name="compliance.tax_payment_delay_days" label="Tax Payment Delay Days" />
                <NumberField control={control} name="compliance.regulatory_notices" label="Regulatory Notices" />
            </div>
        </div>
    );
};

export default ComplianceSection;