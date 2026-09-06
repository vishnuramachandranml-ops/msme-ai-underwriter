import { Building2 } from "lucide-react";

const AssessmentHeader = () => {

  return (

    <div className="flex items-start justify-between border-b px-8 py-6">

      <div className="flex gap-4">

        <div className="rounded-lg bg-blue-50 p-3">

          <Building2 className="h-7 w-7 text-blue-700" />

        </div>

        <div>

          <h2 className="text-3xl font-bold">

            MSME Business Profile & Loan Request

          </h2>

          <p className="mt-1 text-slate-500">

            Provide business and financial details for underwriting evaluation

          </p>

        </div>

      </div>

    </div>

  );

};

export default AssessmentHeader;