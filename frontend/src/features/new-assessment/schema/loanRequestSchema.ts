import { z } from "zod";

export const loanRequestSchema = z.object({

    loan_type: z.string(),

    requested_amount: z.number(),

    loan_tenure_months: z.number(),

    loan_purpose: z.string(),

    existing_loan_amount: z.number(),

    existing_emi: z.number(),

    collateral: z.object({

        available: z.boolean(),

        collateral_type: z.string(),

        estimated_value: z.number(),

    }),

});

export type LoanRequest = z.infer<typeof loanRequestSchema>;