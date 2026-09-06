import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

const MONTH_LABELS = ["M1", "M2", "M3", "M4", "M5", "M6"];

interface Props<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
}

export function MonthlySeriesField<T extends FieldValues>({
    control,
    name,
    label,
}: Props<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                        {label}
                        <span className="ml-1 font-normal text-slate-400">(last 6 months)</span>
                    </label>

                    <div className="grid grid-cols-6 gap-2">
                        {(field.value as number[]).map((val, index) => (
                            <div key={index}>
                                <span className="mb-1 block text-center text-[10px] text-slate-400">
                                    {MONTH_LABELS[index]}
                                </span>
                                <Input
                                    type="number"
                                    className="h-8 px-2 text-center text-xs"
                                    value={val}
                                    onChange={(e) => {
                                        const next = [...field.value];
                                        next[index] = e.target.valueAsNumber || 0;
                                        field.onChange(next);
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {fieldState.error && (
                        <p className="mt-1 text-[11px] text-red-500">
                            {fieldState.error.message as string}
                        </p>
                    )}
                </div>
            )}
        />
    );
}