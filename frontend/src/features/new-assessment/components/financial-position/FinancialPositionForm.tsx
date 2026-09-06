import { useFormContext } from "react-hook-form";

import type { Assessment } from "../../schema/assessmentSchema";

const FinancialPositionForm = () => {

    const { register } = useFormContext<Assessment>();

    const Field = ({
        label,
        children,
    }: {
        label: string;
        children: React.ReactNode;
    }) => (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                {label}
            </label>
            {children}
        </div>
    );

    const inputClass =
        "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

    return (

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">

            <Field label="Total Assets">
                <input type="number" {...register("financial_position.total_assets",{valueAsNumber:true})} className={inputClass}/>
            </Field>

            <Field label="Current Assets">
                <input type="number" {...register("financial_position.current_assets",{valueAsNumber:true})} className={inputClass}/>
            </Field>

            <Field label="Fixed Assets">
                <input type="number" {...register("financial_position.fixed_assets",{valueAsNumber:true})} className={inputClass}/>
            </Field>

            <Field label="Cash & Bank">
                <input type="number" {...register("financial_position.cash_and_bank",{valueAsNumber:true})} className={inputClass}/>
            </Field>

            <Field label="Inventory">
                <input type="number" {...register("financial_position.inventory",{valueAsNumber:true})} className={inputClass}/>
            </Field>

            <Field label="Accounts Receivable">
                <input type="number" {...register("financial_position.accounts_receivable",{valueAsNumber:true})} className={inputClass}/>
            </Field>

            <Field label="Total Liabilities">
                <input type="number" {...register("financial_position.total_liabilities",{valueAsNumber:true})} className={inputClass}/>
            </Field>

            <Field label="Current Liabilities">
                <input type="number" {...register("financial_position.current_liabilities",{valueAsNumber:true})} className={inputClass}/>
            </Field>

            <Field label="Long Term Debt">
                <input type="number" {...register("financial_position.long_term_debt",{valueAsNumber:true})} className={inputClass}/>
            </Field>

            <Field label="Net Worth">
                <input type="number" {...register("financial_position.net_worth",{valueAsNumber:true})} className={inputClass}/>
            </Field>

            <Field label="Book Value">
                <input type="number" {...register("financial_position.book_value",{valueAsNumber:true})} className={inputClass}/>
            </Field>

            <Field label="Working Capital">
                <input type="number" {...register("financial_position.working_capital",{valueAsNumber:true})} className={inputClass}/>
            </Field>

        </div>

    );

};

export default FinancialPositionForm;