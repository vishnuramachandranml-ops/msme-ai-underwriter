import { z } from "zod";

export const complianceSchema = z.object({

    gst_registered: z.boolean(),

    gst_return_filing_rate: z.number(),

    itr_filed_last_3_years: z.boolean(),

    epfo_registered: z.boolean(),

    epfo_compliance_rate: z.number(),

    tax_payment_delay_days: z.number(),

    statutory_dues_pending: z.boolean(),

    regulatory_notices: z.number(),

});

export type Compliance = z.infer<typeof complianceSchema>;