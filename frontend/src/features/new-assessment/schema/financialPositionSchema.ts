import { z } from "zod";

export const financialPositionSchema = z.object({

    total_assets: z.number(),

    current_assets: z.number(),

    fixed_assets: z.number(),

    cash_and_bank: z.number(),

    inventory: z.number(),

    accounts_receivable: z.number(),

    total_liabilities: z.number(),

    current_liabilities: z.number(),

    long_term_debt: z.number(),

    net_worth: z.number(),

    book_value: z.number(),

    working_capital: z.number(),

});

export type FinancialPosition = z.infer<
    typeof financialPositionSchema
>;