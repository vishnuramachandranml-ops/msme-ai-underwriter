import type { ComponentBreakdown } from "@/types/assessmentResponse";

export type ContributionDirection = "positive" | "neutral" | "negative";

export interface KeyDriver {
    component: string;
    metric: string;
    rawValue: number;
    score: number;
    weight: number;
    contribution: number;
}

export interface WaterfallBar {
    label: string;
    component: string;
    metric: string;
    rawValue: number;
    score: number;
    weight: number;
    value: number;
    start: number;
    end: number;
    direction: ContributionDirection;
    color: string;
}

export interface WaterfallChartData {
    bars: WaterfallBar[];
    total: number;
    baseScore: number;
    maxValue: number;
    minValue: number;
}

export const getKeyDrivers = (
    componentBreakdown: ComponentBreakdown[],
    limit = 6,
): KeyDriver[] =>
    componentBreakdown
        .flatMap((component) =>
            (component.metrics ?? []).map((metric) => ({
                component: component.component,
                metric: metric.metric,
                rawValue: metric.value,
                score: metric.score,
                weight: metric.weight,
                contribution: Number((metric.score * metric.weight).toFixed(2)),
            }))
        )
        .sort((left, right) => (100 - right.score) - (100 - left.score))
        .slice(0, limit);

/**
 * Builds waterfall bars from the actual metric-level drivers returned by the
 * assessment API (component_breakdown[].metrics), matching the reference UI's
 * "Revenue Growth / GST Compliance / Cash Flow Strength / ..." style chart.
 * Contribution values are taken directly from getKeyDrivers() (score * weight
 * from the real API data) — no values are invented here.
 */
export const buildWaterfallData = (
    totalScore: number,
    componentBreakdown: ComponentBreakdown[],
    limit = 7,
): WaterfallChartData => {
    const drivers = getKeyDrivers(componentBreakdown, limit);

    const contributions = drivers.map((driver) => {
        const value = driver.contribution;
        const direction: ContributionDirection =
            value > 0 ? "positive" : value < 0 ? "negative" : "neutral";

        return {
            label: driver.metric,
            component: driver.component,
            metric: driver.metric,
            rawValue: driver.rawValue,
            score: driver.score,
            weight: driver.weight,
            value,
            direction,
        };
    });

    const sumOfContributions = contributions.reduce(
        (sum, item) => sum + item.value,
        0,
    );

    const baseScore = Number((totalScore - sumOfContributions).toFixed(2));
    let runningTotal = baseScore;

    const bars: WaterfallBar[] = contributions.map((item) => {
        const start = runningTotal;
        runningTotal = Number((runningTotal + item.value).toFixed(2));

        return {
            ...item,
            start,
            end: runningTotal,
            color: item.direction === "positive"
                ? "#22C55E"
                : item.direction === "negative"
                    ? "#EF4444"
                    : "#94A3B8",
        };
    });

    const allValues = bars.flatMap((bar) => [bar.start, bar.end]);

    return {
        bars,
        total: totalScore,
        baseScore,
        maxValue: Math.max(...allValues, totalScore),
        minValue: Math.min(...allValues, baseScore, 0),
    };
};
