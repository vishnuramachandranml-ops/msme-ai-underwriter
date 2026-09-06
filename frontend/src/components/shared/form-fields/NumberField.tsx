import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    step?: number;
}

export function NumberField<T extends FieldValues>({
    control,
    name,
    label,
    step = 1,
}: Props<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                        {label}
                    </label>

                    <Input
                        type="number"
                        step={step}
                        className={cn(
                            "h-9 text-sm",
                            fieldState.error && "border-red-400"
                        )}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                        onBlur={field.onBlur}
                        ref={field.ref}
                    />

                    {fieldState.error && (
                        <p className="mt-1 text-[11px] text-red-500">
                            {fieldState.error.message}
                        </p>
                    )}
                </div>
            )}
        />
    );
}