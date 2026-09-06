import { Slider } from "@/components/ui/slider";

interface SimulatorSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (value: number) => void;
}

const SimulatorSlider = ({
  label,
  value,
  min,
  max,
  suffix = "",
  onChange,
}: SimulatorSliderProps) => {

  const formattedValue =
    value > 0 && suffix === "%"
      ? `+${value}`
      : value;

  return (
    <div className="space-y-2">

      {/* Header */}

      <div className="flex items-center justify-between">

        <span className="text-xs font-medium text-slate-700">
          {label}
        </span>

        <div
          className="
            flex
            min-w-[72px]
            items-center
            justify-center
            gap-1
            rounded-lg
            border
            border-slate-200
            bg-white
            px-2.5
            py-1
            shadow-sm
          "
        >
          <span className="text-xs font-semibold">
            {formattedValue}
          </span>

          <span className="text-xs text-slate-500">
            {suffix}
          </span>

        </div>

      </div>

      {/* Slider */}

      <Slider
        value={value}
        min={min}
        max={max}
        step={1}
        onValueChange={(newValue) =>
            onChange(
                Array.isArray(newValue)
                ? newValue[0]
                : newValue
            )
            }
      />

      {/* Min Max */}

      <div className="flex justify-between text-[11px] text-slate-400">

        <span>
          {min}
          {suffix}
        </span>

        <span>
          {max > 0 ? "+" : ""}
          {max}
          {suffix}
        </span>

      </div>

    </div>
  );
};

export default SimulatorSlider;