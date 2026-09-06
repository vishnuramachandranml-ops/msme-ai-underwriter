import { z } from "zod";

const monthlyValuesSchema = z.object({

    values: z.array(z.number()),

});

export const cashflowSchema = z.object({

    monthly_revenue: monthlyValuesSchema,

    monthly_expenses: monthlyValuesSchema,

    average_collection_days: z.number(),

    average_supplier_payment_days: z.number(),

});

export type Cashflow = z.infer<typeof cashflowSchema>;