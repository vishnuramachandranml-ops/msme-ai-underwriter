from app.examples.swagger_examples import HEALTHY_MANUFACTURING
from app.graphs.assessment.graph import assessment_graph
from app.models.assessment_request import AssessmentRequest
from app.pipelines.assessment_pipeline import AssessmentPipeline


def test_langgraph_matches_existing_pipeline():
    request = AssessmentRequest.model_validate(HEALTHY_MANUFACTURING)

    pipeline = AssessmentPipeline()

    expected = pipeline.assess(request)

    actual = assessment_graph.invoke(
        {
            "request": request,
        }
    )["result"]

    assert actual == expected