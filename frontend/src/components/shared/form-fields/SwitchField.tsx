import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

interface Props<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
}

export function SwitchField<T extends FieldValues>({
    control,
    name,
    label,
}: Props<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
                    <label className="text-xs font-medium text-slate-600">
                        {label}
                    </label>

                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                </div>
            )}
        />
    );
}