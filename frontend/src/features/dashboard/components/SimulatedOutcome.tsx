import { ArrowRight } from "lucide-react";

import type { AssessmentSummary } from "@/types/assessmentResponse";
import type { WhatIfResponse } from "@/types/whatIf";

interface SimulatedOutcomeProps {
  simulation: WhatIfResponse;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const displayNumber = (value: number | null | undefined, suffix = "") =>
  value === null || value === undefined ? "—" : `${value}${suffix}`;

interface SummaryRowProps {
  label: string;
  before: string;
  after: string;
}

const SummaryRow = ({ label, before, after }: SummaryRowProps) => (
  <div className="grid grid-cols-[1.3fr_auto_auto_auto] items-center gap-2">
    <span className="text-[10px] text-slate-600">{label}</span>
    <span className="text-[11px] font-semibold">{before}</span>
    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
    <span className="text-[11px] font-semibold text-green-700">{after}</span>
  </div>
);

const summaryRows = (before: AssessmentSummary, after: AssessmentSummary) => [
  {
    label: "Financial Health Score",
    before: displayNumber(before.financial_health_score),
    after: displayNumber(after.financial_health_score),
  },
  {
    label: "Credit Decision",
    before: before.credit_decision,
    after: after.credit_decision,
  },
  {
    label: "Suggested Loan Amount",
    before: formatCurrency(before.suggested_loan_amount),
    after: formatCurrency(after.suggested_loan_amount),
  },
  {
    label: "Confidence",
    before: displayNumber(before.confidence_score, "%"),
    after: displayNumber(after.confidence_score, "%"),
  },
];

const SimulatedOutcome = ({
   simulation,
}: SimulatedOutcomeProps) => {
  const { before, after, delta } = simulation;
  const metricChanges = simulation.simulation?.metric_changes ?? [];
  const drivers = simulation.simulation?.top_impact_drivers ?? [];
  const insight = simulation.simulation?.insight;

  return (
    <div
      className="
        rounded-xl
        border
        border-green-100
        bg-gradient-to-br
        from-green-50
        to-white
        p-2
      "
    >
      <h3 className="mb-2 text-[13px] font-bold text-green-800">
        Simulated Outcome
      </h3>

      <div className="space-y-3">
        {summaryRows(before.summary, after.summary).map((row) => (
          <SummaryRow key={row.label} {...row} />
        ))}

        <SummaryRow
          label="Risk"
          before={delta.previous_risk}
          after={delta.new_risk}
        />

        <p className="text-[10px] font-semibold text-green-700">
          Score change: {delta.score_change > 0 ? "+" : ""}{delta.score_change} pts
        </p>

        {(simulation.changed_parameters?.length ?? 0) > 0 && (
          <section>
            <h4 className="mb-1 text-[11px] font-bold text-slate-700">Changed Parameters</h4>
            {simulation.changed_parameters?.map((parameter) => (
              <p key={parameter.parameter} className="text-[10px] text-slate-600">
                {parameter.parameter}: {displayNumber(parameter.before)} → {displayNumber(parameter.after)}
              </p>
            ))}
          </section>
        )}

        {(delta.component_changes?.length ?? 0) > 0 && (
          <section>
            <h4 className="mb-1 text-[11px] font-bold text-slate-700">Component Impact</h4>
            {delta.component_changes?.map((component) => (
              <p key={component.component} className="text-[10px] text-slate-600">
                {component.component}: {component.before_score} → {component.after_score} ({component.score_change > 0 ? "+" : ""}{component.score_change})
              </p>
            ))}
          </section>
        )}

        {metricChanges.length > 0 && (
          <section>
            <h4 className="mb-1 text-[11px] font-bold text-slate-700">Metric Changes</h4>
            {metricChanges.map((metric) => (
              <p key={`${metric.component}-${metric.metric}`} className="text-[10px] text-slate-600">
                {metric.component} · {metric.metric}: {metric.before_value} → {metric.after_value}
              </p>
            ))}
          </section>
        )}

        {drivers.length > 0 && (
          <section>
            <h4 className="mb-1 text-[11px] font-bold text-slate-700">Top Impact Drivers</h4>
            {drivers.map((driver) => (
              <p key={`${driver.component}-${driver.metric}`} className="text-[10px] text-slate-600">
                {driver.component} · {driver.metric}: {driver.score_change > 0 ? "+" : ""}{driver.score_change} ({driver.impact})
              </p>
            ))}
          </section>
        )}

        {insight && (
          <section>
            <h4 className="text-[11px] font-bold text-slate-700">{insight.headline}</h4>
            <p className="text-[10px] leading-4 text-slate-600">{insight.summary}</p>
            <p className="mt-1 text-[10px] leading-4 text-slate-600">{insight.business_impact}</p>
            <p className="mt-1 text-[10px] font-medium leading-4 text-slate-700">{insight.recommendation}</p>
          </section>
        )}

      </div>

    </div>
  );
};

export default SimulatedOutcome;
