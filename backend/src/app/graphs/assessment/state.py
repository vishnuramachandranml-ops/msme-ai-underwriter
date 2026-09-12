from __future__ import annotations

from typing import TypedDict

from app.engine.models.assessment_result import AssessmentResult
from app.models.assessment_request import AssessmentRequest


class AssessmentGraphState(TypedDict, total=False):
    request: AssessmentRequest

    cashflow_result: AssessmentResult | None
    financial_position_result: AssessmentResult | None
    compliance_result: AssessmentResult | None
    operations_result: AssessmentResult | None
    alternate_data_result: AssessmentResult | None

    result: AssessmentResult