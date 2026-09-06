import type { Assessment } from "../schema/assessmentSchema";

export function calculateProgress(data: Assessment) {

    let totalFields = 0;
    let filledFields = 0;

    function traverse(value: unknown) {

        if (Array.isArray(value)) {

            value.forEach(traverse);
            return;

        }

        if (
            value !== null &&
            typeof value === "object"
        ) {

            Object.values(value).forEach(traverse);
            return;

        }

        totalFields++;

        if (
            value !== "" &&
            value !== null &&
            value !== undefined
        ) {

            filledFields++;

        }

    }

    traverse(data);

    return Math.round(
        (filledFields / totalFields) * 100
    );

}