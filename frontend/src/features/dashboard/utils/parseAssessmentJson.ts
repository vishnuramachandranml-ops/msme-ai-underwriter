import { assessmentSchema, type AssessmentFormValues } from "@/types/assessment";

export interface ParseResult {
    success: boolean;
    data?: AssessmentFormValues;
    errors?: string[];
}

export const parseAssessmentJson = (rawText: string): ParseResult => {

    let parsedJson: unknown;

    try {
        parsedJson = JSON.parse(rawText);
    } catch {
        return {
            success: false,
            errors: ["Invalid JSON — please check the file/text is valid JSON."],
        };
    }

    const result = assessmentSchema.safeParse(parsedJson);

    if (!result.success) {
        return {
            success: false,
            errors: result.error.issues.map(
                (issue) => `${issue.path.join(".")}: ${issue.message}`
            ),
        };
    }

    return {
        success: true,
        data: result.data,
    };
};