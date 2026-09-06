import { z } from "zod";

export const businessProfileSchema = z.object({

    business_id: z.string(),

    business_name: z.string(),

    industry: z.string(),

    business_type: z.string(),

    msme_registered: z.boolean(),

    udyam_registration_number: z.string(),

    business_age_years: z.number(),

    employee_count: z.number(),

    annual_turnover: z.number(),

    location: z.string(),

});

export type BusinessProfile = z.infer<
    typeof businessProfileSchema
>;