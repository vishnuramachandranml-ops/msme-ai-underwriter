import { assessmentSchema } from "../schema/assessmentSchema";

export const parseAssessmentJson = (
    json: unknown,
) => {

    return assessmentSchema.parse(json);

};