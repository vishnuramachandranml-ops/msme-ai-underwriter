import CashflowForm from "./CashflowForm";

const CashflowSection = () => {

    return (

        <div className="flex h-full min-w-0 flex-1 flex-col p-5">

            <div className="border-b pb-5">

                <h2 className="text-2xl font-semibold">
                    Cashflow
                </h2>

                <p className="mt-2 text-slate-500">
                    Enter the business cashflow information.
                </p>

            </div>

            <div className="mt-6 min-h-0 flex-1 overflow-y-auto pr-2">

                <CashflowForm />

            </div>

        </div>

    );

};

export default CashflowSection;