import AlternateDataForm from "./AlternateDataForm";

const AlternateDataSection = () => {

    return (

        <div className="flex h-full min-w-0 flex-1 flex-col p-5">

            <div className="border-b pb-5">

                <h2 className="text-2xl font-semibold">
                    Alternate Data
                </h2>

                <p className="mt-2 text-slate-500">
                    Enter GST, UPI, banking and utility related information.
                </p>

            </div>

            <div className="mt-6 min-h-0 flex-1 overflow-y-auto px-1">

                <AlternateDataForm />

            </div>

        </div>

    );

};

export default AlternateDataSection;