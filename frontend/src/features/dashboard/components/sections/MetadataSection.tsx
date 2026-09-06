import type { Control } from "react-hook-form";
import type { AssessmentFormValues } from "@/types/assessment";
import { TextField } from "@/components/shared/form-fields/TextField";

interface Props {
    control: Control<AssessmentFormValues>;
}

const MetadataSection = ({ control }: Props) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <TextField control={control} name="metadata.request_id" label="Request ID" placeholder="REQ-002" />
            <TextField control={control} name="metadata.source_system" label="Source System" placeholder="Swagger" />
            <TextField control={control} name="metadata.model_version" label="Model Version" placeholder="1.0" />
        </div>
    );
};

export default MetadataSection;