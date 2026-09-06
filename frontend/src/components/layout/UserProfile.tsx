import { ChevronDown } from "lucide-react";

const UserProfile = () => {
  return (
    <button
      className="
        flex
        items-center
        gap-3
        rounded-xl
        px-2
        py-1.5
        transition-colors
        hover:bg-slate-100
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-blue-600
          font-semibold
          text-white
        "
      >
        J
      </div>

      <div className="text-left">
        <p className="text-sm font-semibold">
          Vishnu Ramachandran
        </p>

        <p className="text-xs text-slate-500">
          Senior Underwriter
        </p>
      </div>

      <ChevronDown className="h-4 w-4 text-slate-400" />
    </button>
  );
};

export default UserProfile;