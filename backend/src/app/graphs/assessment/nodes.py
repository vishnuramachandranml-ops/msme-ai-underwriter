from __future__ import annotations

from app.graphs.assessment.state import AssessmentGraphState
from app.pipelines.assessment_pipeline import AssessmentPipeline


pipeline = AssessmentPipeline()


def cashflow_node(state: AssessmentGraphState) -> dict:
    request = state["request"]

    if request.cashflow is None:
        return {"cashflow_result": None}

    features = pipeline._cashflow_engineer.transform(request.cashflow)
    result = pipeline._cashflow_assessor.assess(features)

    return {"cashflow_result": result}


def financial_position_node(state: AssessmentGraphState) -> dict:
    request = state["request"]

    if request.financial_position is None:
        return {"financial_position_result": None}

    features = pipeline._financial_position_engineer.transform(
        request.financial_position
    )
    result = pipeline._financial_position_assessor.assess(features)

    return {"financial_position_result": result}


def compliance_node(state: AssessmentGraphState) -> dict:
    request = state["request"]

    if request.compliance is None:
        return {"compliance_result": None}

    features = pipeline._compliance_engineer.transform(request.compliance)
    result = pipeline._compliance_assessor.assess(features)

    return {"compliance_result": result}


def operations_node(state: AssessmentGraphState) -> dict:
    request = state["request"]

    if request.operations is None:
        return {"operations_result": None}

    features = pipeline._operations_engineer.transform(request.operations)
    result = pipeline._operations_assessor.assess(features)

    return {"operations_result": result}


def alternate_data_node(state: AssessmentGraphState) -> dict:
    request = state["request"]

    if request.alternate_data is None:
        return {"alternate_data_result": None}

    features = pipeline._alternate_data_engineer.transform(
        request.alternate_data
    )
    result = pipeline._alternate_data_assessor.assess(features)

    return {"alternate_data_result": result}


def aggregate_node(state: AssessmentGraphState) -> dict:
    results = [
        result
        for result in (
            state.get("cashflow_result"),
            state.get("financial_position_result"),
            state.get("compliance_result"),
            state.get("operations_result"),
            state.get("alternate_data_result"),
        )
        if result is not None
    ]

    if len(results) == 1:
        return {"result": results[0]}

    return {"result": pipeline._aggregate_results(results)}