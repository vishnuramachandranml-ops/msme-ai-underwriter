from __future__ import annotations

from langgraph.graph import END, START, StateGraph

from app.graphs.assessment.nodes import (
    aggregate_node,
    alternate_data_node,
    cashflow_node,
    compliance_node,
    financial_position_node,
    operations_node,
)
from app.graphs.assessment.state import AssessmentGraphState


def build_assessment_graph():
    builder = StateGraph(AssessmentGraphState)

    builder.add_node("cashflow", cashflow_node)
    builder.add_node("financial_position", financial_position_node)
    builder.add_node("compliance", compliance_node)
    builder.add_node("operations", operations_node)
    builder.add_node("alternate_data", alternate_data_node)
    builder.add_node("aggregate", aggregate_node)

    builder.add_edge(START, "cashflow")
    builder.add_edge("cashflow", "financial_position")
    builder.add_edge("financial_position", "compliance")
    builder.add_edge("compliance", "operations")
    builder.add_edge("operations", "alternate_data")
    builder.add_edge("alternate_data", "aggregate")
    builder.add_edge("aggregate", END)

    return builder.compile()


assessment_graph = build_assessment_graph()