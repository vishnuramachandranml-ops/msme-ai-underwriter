import { z } from "zod";

export const alternateDataSchema = z.object({

    gst_registered: z.boolean(),

    gst_filing_rate: z.number(),

    gst_turnover: z.number(),

    upi_transaction_count: z.number(),

    upi_transaction_volume: z.number(),

    average_bank_balance: z.number(),

    digital_payment_ratio: z.number(),

    positive_bank_statement_months: z.number(),

    online_rating: z.number(),

    electricity_units: z.object({

        values: z.array(z.number()),

    }),

    fuel_expense: z.object({

        values: z.array(z.number()),

    }),

});

export type AlternateData = z.infer<typeof alternateDataSchema>;