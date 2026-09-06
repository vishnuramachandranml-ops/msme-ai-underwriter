import OperationsForm from "./OperationsForm";

const OperationsSection = () => {
    return (
        <div className="flex h-full min-w-0 flex-1 flex-col p-5">

            <div className="border-b pb-5">
                <h2 className="text-2xl font-semibold">
                    Operations
                </h2>

                <p className="mt-2 text-slate-500">
                    Enter operational metrics of the business.
                </p>
            </div>

            <div className="mt-6 min-h-0 flex-1 overflow-y-auto px-1">
                <OperationsForm />
            </div>

        </div>
    );
};

export default OperationsSection;