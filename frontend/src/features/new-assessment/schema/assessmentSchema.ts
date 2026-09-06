import { z } from "zod";

import { metadataSchema } from "./metadataSchema";
import { businessProfileSchema } from "./businessProfileSchema";
import { cashflowSchema } from "./cashflowSchema";
import { operationsSchema } from "./operationsSchema";
import { alternateDataSchema } from "./alternateDataSchema";
import { complianceSchema } from "./complianceSchema";
import { financialPositionSchema } from "./financialPositionSchema";
import { loanRequestSchema } from "./loanRequestSchema";

export const assessmentSchema = z.object({

    metadata: metadataSchema,

    business_profile: businessProfileSchema,

    cashflow: cashflowSchema,

    operations: operationsSchema,

    alternate_data: alternateDataSchema,

    compliance: complianceSchema,

    financial_position: financialPositionSchema,

    loan_request: loanRequestSchema,

});

export type Assessment = z.infer<typeof assessmentSchema>;
export type AssessmentRequest = Assessment;
