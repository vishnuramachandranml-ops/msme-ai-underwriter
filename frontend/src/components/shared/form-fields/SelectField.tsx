import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Props<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    options: { value: string; label: string }[];
}

export function SelectField<T extends FieldValues>({
    control,
    name,
    label,
    options,
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

                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger
                            className={cn(
                                "h-9 text-sm",
                                fieldState.error && "border-red-400"
                            )}
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-[100]">
                            {options.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

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