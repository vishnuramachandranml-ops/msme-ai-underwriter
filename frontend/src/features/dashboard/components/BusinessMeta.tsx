import type { ReactNode } from "react";

interface BusinessMetaProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

const BusinessMeta = ({
  icon,
  label,
  value,
}: BusinessMetaProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="text-slate-500">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-500">
          {label}
        </p>

        <p className="text-sm font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
};

export default BusinessMeta;