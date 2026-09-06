import { useEffect, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

import AppCard from "@/components/shared/AppCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import AssessmentService from "@/services/assessment.service";
import type { AssessmentRequest } from "@/features/new-assessment/schema/assessmentSchema";
import type { AssessmentResponse, SimulationInputs } from "@/types/assessmentResponse";
import type { ScenarioInput, WhatIfResponse } from "@/types/whatIf";

import SimulatorSlider from "./SimulatorSlider";
import SimulatedOutcome from "./SimulatedOutcome";

interface ScenarioState {
    cashflow: {
        revenue_growth: number;
        operating_margin: number;
        expense_ratio: number;
        collection_days: number;
    };
    financial_position: {
        current_ratio: number;
        debt_asset_ratio: number;
        working_capital: number;
    };
    operations: {
        sales_growth: number;
        capacity_utilization: number;
    };
    compliance: {
        gst_filing_rate: number;
        epfo_compliance_rate: number;
        tax_delay_days: number;
    };
    alternate_data: {
        digital_payment_ratio: number;
        average_bank_balance: number;
    };
}

interface WhatIfSimulatorProps {
    assessmentRequest: AssessmentRequest;
    assessmentResponse: AssessmentResponse;
}

const createScenarioState = (inputs: SimulationInputs | null | undefined): ScenarioState => ({
    cashflow: {
        revenue_growth: inputs?.cashflow?.revenue_growth ?? 0,
        operating_margin: inputs?.cashflow?.operating_margin ?? 0,
        expense_ratio: inputs?.cashflow?.expense_ratio ?? 0,
        collection_days: inputs?.cashflow?.collection_days ?? 0,
    },
    financial_position: {
        current_ratio: inputs?.financial_position?.current_ratio ?? 0,
        debt_asset_ratio: inputs?.financial_position?.debt_asset_ratio ?? 0,
        working_capital: inputs?.financial_position?.working_capital ?? 0,
    },
    operations: {
        sales_growth: inputs?.operations?.sales_growth ?? 0,
        capacity_utilization: inputs?.operations?.capacity_utilization ?? 0,
    },
    compliance: {
        gst_filing_rate: inputs?.compliance?.gst_filing_rate ?? 0,
        epfo_compliance_rate: inputs?.compliance?.epfo_compliance_rate ?? 0,
        tax_delay_days: inputs?.compliance?.tax_delay_days ?? 0,
    },
    alternate_data: {
        digital_payment_ratio: inputs?.alternate_data?.digital_payment_ratio ?? 0,
        average_bank_balance: inputs?.alternate_data?.average_bank_balance ?? 0,
    },
});

const changedGroup = <T extends object>(current: T, initial: T): Partial<T> =>
    Object.fromEntries(
        Object.entries(current).filter(([key, value]) => value !== initial[key as keyof T])
    ) as Partial<T>;

const buildScenarioInput = (current: ScenarioState, initial: ScenarioState): ScenarioInput => {
    const cashflow = changedGroup(current.cashflow, initial.cashflow);
    const financialPosition = changedGroup(current.financial_position, initial.financial_position);
    const operations = changedGroup(current.operations, initial.operations);
    const compliance = changedGroup(current.compliance, initial.compliance);
    const alternateData = changedGroup(current.alternate_data, initial.alternate_data);

    return {
        ...(Object.keys(cashflow).length ? { cashflow } : {}),
        ...(Object.keys(financialPosition).length ? { financial_position: financialPosition } : {}),
        ...(Object.keys(operations).length ? { operations } : {}),
        ...(Object.keys(compliance).length ? { compliance } : {}),
        ...(Object.keys(alternateData).length ? { alternate_data: alternateData } : {}),
    };
};

const WhatIfSimulator = ({ assessmentRequest, assessmentResponse }: WhatIfSimulatorProps) => {
    const [initialScenario, setInitialScenario] = useState<ScenarioState>(() =>
        createScenarioState(assessmentResponse.simulation_inputs)
    );
    const [scenario, setScenario] = useState<ScenarioState>(initialScenario);
    const [result, setResult] = useState<WhatIfResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const nextScenario = createScenarioState(assessmentResponse.simulation_inputs);
        setInitialScenario(nextScenario);
        setScenario(nextScenario);
        setResult(null);
        setError(null);
    }, [assessmentResponse.simulation_inputs]);

    const updateScenario = <
        Group extends keyof ScenarioState,
        Key extends keyof ScenarioState[Group],
    >(group: Group, key: Key, value: number) => {
        setScenario((previous) => ({
            ...previous,
            [group]: {
                ...previous[group],
                [key]: value,
            },
        }));
    };

    const applyQuickScenario = (name: "growth" | "revenueDrop" | "liquidityStress" | "custom") => {
        setResult(null);
        setError(null);

        if (name === "custom") {
            setScenario(initialScenario);
            return;
        }

        setScenario((previous) => {
            if (name === "growth") {
                return {
                    ...previous,
                    cashflow: { ...previous.cashflow, revenue_growth: previous.cashflow.revenue_growth + 10 },
                    operations: { ...previous.operations, sales_growth: previous.operations.sales_growth + 10 },
                };
            }

            if (name === "revenueDrop") {
                return {
                    ...previous,
                    cashflow: { ...previous.cashflow, revenue_growth: previous.cashflow.revenue_growth - 10 },
                };
            }

            return {
                ...previous,
                cashflow: { ...previous.cashflow, collection_days: previous.cashflow.collection_days + 15 },
                financial_position: {
                    ...previous.financial_position,
                    working_capital: Math.max(0, previous.financial_position.working_capital * 0.9),
                },
            };
        });
    };

    const runSimulation = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await AssessmentService.whatIf({
                original_request: assessmentRequest,
                scenario: buildScenarioInput(scenario, initialScenario),
            });

            setResult(response);
        } catch {
            setError("Unable to run the simulation. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppCard className="space-y-3 p-3">

            {/* Header */}

            <div>

                <div className="flex items-center gap-2">

                    <h2
                        className="text-base font-bold text-slate-800"
                        style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
                    >
                        What-If Simulator
                    </h2>

                </div>

            </div>

            <div className="grid grid-cols-2 gap-2">
                <Button type="button" size="xs" variant="outline" onClick={() => applyQuickScenario("growth")}>Growth</Button>
                <Button type="button" size="xs" variant="outline" onClick={() => applyQuickScenario("revenueDrop")}>Revenue Drop</Button>
                <Button type="button" size="xs" variant="outline" onClick={() => applyQuickScenario("liquidityStress")}>Liquidity Stress</Button>
                <Button type="button" size="xs" variant="outline" onClick={() => applyQuickScenario("custom")}><RotateCcw />Custom Scenario</Button>
            </div>

            <Accordion className="space-y-1" defaultValue={["cashflow"]} multiple>
                <AccordionItem value="cashflow">
                    <AccordionTrigger>Cash Flow</AccordionTrigger>
                    <AccordionContent className="space-y-2.5">
                        <SimulatorSlider label="Revenue Growth" value={scenario.cashflow.revenue_growth} min={-50} max={50} suffix="%" onChange={(value) => updateScenario("cashflow", "revenue_growth", value)} />
                        <SimulatorSlider label="Operating Margin" value={scenario.cashflow.operating_margin} min={0} max={100} suffix="%" onChange={(value) => updateScenario("cashflow", "operating_margin", value)} />
                        <SimulatorSlider label="Expense Ratio" value={scenario.cashflow.expense_ratio} min={0} max={100} suffix="%" onChange={(value) => updateScenario("cashflow", "expense_ratio", value)} />
                        <SimulatorSlider label="Collection Days" value={scenario.cashflow.collection_days} min={0} max={365} suffix=" days" onChange={(value) => updateScenario("cashflow", "collection_days", value)} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="financial-position">
                    <AccordionTrigger>Financial Position</AccordionTrigger>
                    <AccordionContent className="space-y-2.5">
                        <SimulatorSlider label="Current Ratio" value={scenario.financial_position.current_ratio} min={0} max={5} suffix="x" onChange={(value) => updateScenario("financial_position", "current_ratio", value)} />
                        <SimulatorSlider label="Debt Asset Ratio" value={scenario.financial_position.debt_asset_ratio} min={0} max={5} suffix="x" onChange={(value) => updateScenario("financial_position", "debt_asset_ratio", value)} />
                        <SimulatorSlider label="Working Capital" value={scenario.financial_position.working_capital} min={0} max={Math.max(1000000, scenario.financial_position.working_capital * 2)} suffix=" INR" onChange={(value) => updateScenario("financial_position", "working_capital", value)} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="operations">
                    <AccordionTrigger>Operations</AccordionTrigger>
                    <AccordionContent className="space-y-2.5">
                        <SimulatorSlider label="Sales Growth" value={scenario.operations.sales_growth} min={-50} max={50} suffix="%" onChange={(value) => updateScenario("operations", "sales_growth", value)} />
                        <SimulatorSlider label="Capacity Utilization" value={scenario.operations.capacity_utilization} min={0} max={100} suffix="%" onChange={(value) => updateScenario("operations", "capacity_utilization", value)} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="compliance">
                    <AccordionTrigger>Compliance</AccordionTrigger>
                    <AccordionContent className="space-y-2.5">
                        <SimulatorSlider label="GST Filing Rate" value={scenario.compliance.gst_filing_rate} min={0} max={100} suffix="%" onChange={(value) => updateScenario("compliance", "gst_filing_rate", value)} />
                        <SimulatorSlider label="EPFO Compliance Rate" value={scenario.compliance.epfo_compliance_rate} min={0} max={100} suffix="%" onChange={(value) => updateScenario("compliance", "epfo_compliance_rate", value)} />
                        <SimulatorSlider label="Tax Delay" value={scenario.compliance.tax_delay_days} min={0} max={365} suffix=" days" onChange={(value) => updateScenario("compliance", "tax_delay_days", value)} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="alternate-data">
                    <AccordionTrigger>Alternate Data</AccordionTrigger>
                    <AccordionContent className="space-y-2.5">
                        <SimulatorSlider label="Digital Payment Ratio" value={scenario.alternate_data.digital_payment_ratio} min={0} max={1} suffix=" ratio" onChange={(value) => updateScenario("alternate_data", "digital_payment_ratio", value)} />
                        <SimulatorSlider label="Average Bank Balance" value={scenario.alternate_data.average_bank_balance} min={0} max={Math.max(100000, scenario.alternate_data.average_bank_balance * 2)} suffix=" INR" onChange={(value) => updateScenario("alternate_data", "average_bank_balance", value)} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Button type="button" className="w-full bg-blue-700 text-white hover:bg-blue-800" disabled={isLoading} onClick={runSimulation}>
                <Play />{isLoading ? "Running Simulation..." : "Run Simulation"}
            </Button>

            {error && <p className="text-xs text-red-600">{error}</p>}

            {result && <SimulatedOutcome simulation={result} />}

        </AppCard>
    );
};

export default WhatIfSimulator;
