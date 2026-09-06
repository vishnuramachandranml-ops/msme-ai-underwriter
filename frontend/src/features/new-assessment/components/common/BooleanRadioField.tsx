import { Controller, useFormContext } from "react-hook-form";

import type { Assessment } from "../../schema/assessmentSchema";

interface BooleanRadioFieldProps {
    name: keyof any;
}

const BooleanRadioField = ({
    name,
}: BooleanRadioFieldProps) => {

    const { control } = useFormContext<Assessment>();

    return (
        <Controller
            name={name as any}
            control={control}
            render={({ field }) => (
                <div className="flex items-center gap-6 py-2">
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="radio"
                            checked={field.value === true}
                            onChange={() => field.onChange(true)}
                            className="h-4 w-4 accent-blue-600"
                        />
                        Yes
                    </label>

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="radio"
                            checked={field.value === false}
                            onChange={() => field.onChange(false)}
                            className="h-4 w-4 accent-blue-600"
                        />
                        No
                    </label>
                </div>
            )}
        />
    );
};

export default BooleanRadioField;