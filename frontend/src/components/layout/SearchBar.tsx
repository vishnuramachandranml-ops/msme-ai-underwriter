import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-md">
      <Search
        className="
          absolute
          left-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-slate-400
        "
      />

      <Input
        placeholder="Search business, GSTIN, CIN..."
        className="
          h-11
          rounded-xl
          border-slate-200
          bg-slate-50
          pl-10
          focus:bg-white
        "
      />
    </div>
  );
};

export default SearchBar;