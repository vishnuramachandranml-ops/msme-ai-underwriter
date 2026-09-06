import apiClient from "@/api/apiClient";

import type { AssessmentRequest } from "@/features/new-assessment/schema/assessmentSchema";
import type { AssessmentResponse } from "@/types/assessmentResponse";
import type { WhatIfRequest, WhatIfResponse } from "@/types/whatIf";

class AssessmentService {

    async assess(
        request: AssessmentRequest,
    ): Promise<AssessmentResponse> {

        try {

            const response = await apiClient.post<AssessmentResponse>(
                "/api/v1/assessment",
                request,
            );

            return response.data;

        } catch (error) {

            console.error("Assessment API Error:", error);

            throw error;

        }

    }

    async whatIf(
        request: WhatIfRequest,
    ): Promise<WhatIfResponse> {

        try {

            const response = await apiClient.post<WhatIfResponse>(
                "/api/v1/assessment/what-if",
                request,
            );

            return response.data;

        } catch (error) {

            console.error("Assessment What-If API Error:", error);

            throw error;

        }

    }

}

export default new AssessmentService();
