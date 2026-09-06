import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

const DownloadReportButton = () => {
  return (
    <Button
      variant="outline"
      className="
        h-11
        gap-2
        rounded-xl
        border-slate-200
        bg-white
        px-5
        text-slate-700
        shadow-sm
        hover:bg-slate-50
      "
    >
      <Download className="h-4 w-4" />

      Download Report
    </Button>
  );
};

export default DownloadReportButton;