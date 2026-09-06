import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

import type {
    CustomSeriesRenderItemAPI,
    CustomSeriesRenderItemParams,
    CustomSeriesRenderItemReturn,
} from "echarts";

import type { EChartsOption } from "echarts";

import { buildWaterfallData } from "../utils/waterfall";
import { niceScale } from "../utils/niceScale";
import type { ComponentBreakdown } from "@/types/assessmentResponse";

interface WaterfallChartProps {
    totalScore: number;
    componentBreakdown: ComponentBreakdown[];
}
const WaterfallChart = ({
    totalScore,
    componentBreakdown,
}: WaterfallChartProps) => {

    const FONT_FAMILY = "'Inter', -apple-system, sans-serif";

    const { bars, total, minValue, maxValue } =
        buildWaterfallData(
            totalScore,
            componentBreakdown,
        );


    const categories = [
        ...bars.map((bar) => bar.label),
        "Total Score",
    ];

    const chartData: any[] = [
        ...bars.map((bar) => ({
            ...bar,
            type: "bar",
        })),

        {
            label: "Total Score",
            value: total,
            start: 0,
            end: total,
            direction: "positive",
            type: "total",
        },
    ];

    const { min: yAxisMin, max: yAxisMax,} = niceScale(
        minValue,
        Math.max(maxValue, total),
        5
    );

    const greenGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: "#16A34A" },
        { offset: 1, color: "#86EFAC" },
    ]);

    const redGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: "#DC2626" },
        { offset: 1, color: "#FCA5A5" },
    ]);

    const blueGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: "#2563EB" },
        { offset: 1, color: "#BFDBFE" },
    ]);

    const neutralGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: "#64748B" },
        { offset: 1, color: "#CBD5E1" },
    ]);

    function renderItem(
        params: CustomSeriesRenderItemParams,
        api: CustomSeriesRenderItemAPI,
    ): CustomSeriesRenderItemReturn {

        const data = chartData[params.dataIndex];

        const isLastContribution =
            params.dataIndex >= bars.length - 1;

        const start = api.coord([params.dataIndex, data.start]);
        const end = api.coord([params.dataIndex, data.end]);

        const size = api.size?.([1, 0]) as number[] | undefined;

        const barWidth = (size?.[0] ?? 20) * 0.45;

        const x = start[0] - barWidth / 2;

        const y = data.direction !== "negative"
            ? end[1]
            : start[1];

        let connector = null;

        const height = Math.abs(start[1] - end[1]);


        if (!isLastContribution) {

            const next = chartData[params.dataIndex + 1];

            const currentEnd = api.coord([
                params.dataIndex,
                data.end,
            ]);

            const nextStart = api.coord([
                params.dataIndex + 1,
                next.start,
            ]);

            connector = {
                type: "line",

                shape: {
                    x1: currentEnd[0] + barWidth / 2,
                    y1: currentEnd[1],
                    x2: nextStart[0] - barWidth / 2,
                    y2: nextStart[1],
                },

                style: {
                    stroke: "#94A3B8",
                    lineWidth: 1,
                    lineDash: [4, 4],
                },
            };

        }

        const children: any[] = [];

        if (connector) {
            children.push(connector);
        }

        const fill =
            data.type === "total"
                ? blueGradient
                : data.direction === "positive"
                    ? greenGradient
                    : data.direction === "negative"
                        ? redGradient
                        : neutralGradient;

        children.push({
            type: "rect",

            shape: {
                x,
                y,
                width: barWidth,
                height: Math.max(height, 2),
                r: 2,
            },

            style: {
                fill,
            },
        });

        const isTotal = data.type === "total";

        children.push({
            type: "text",

            x: start[0],

            y: isTotal ? y - 14 : data.direction === "negative" ? y + height + 10 : y - 8,

            style: {
                text: isTotal ? String(data.value) : `${data.value > 0 ? "+" : ""}${data.value}`,
                fill: isTotal
                    ? "#0F172A"
                    : data.direction === "positive"
                        ? "#166534"
                        : data.direction === "negative"
                            ? "#DC2626"
                            : "#475569",
                fontSize: isTotal ? 16 : 11,   // was 22 / 14
                fontWeight: 700,
                fontFamily: FONT_FAMILY,
                align: "center",
                verticalAlign: "middle",
            },
        });

        return {
            type: "group",
            children,
        };
    }

    const option: EChartsOption = {

        animationDuration: 1200,
        animationEasing: "cubicOut",

        grid: {
            left: 45,
            right: 20,
            top: 55,
            bottom: 65,
            containLabel: false,
        },

        tooltip: {
            trigger: "item",
            backgroundColor: "#FFFFFF",
            borderColor: "#CBD5E1",
            borderWidth: 1,
            textStyle: {
                color: "#0F172A",
            },
            formatter(params: any) {

                const data = params.data;

                if (data.type === "total") {
                    return `<b>Total Score</b><br/>${data.value}`;
                }

                return `
        <b>${data.component} — ${data.metric}</b><br/>
        Metric value: ${data.rawValue}<br/>
        Score: ${data.score}<br/>
        Weight: ${data.weight}<br/>
        Contribution: ${data.value > 0 ? "+" : ""}${data.value}<br/>
        Direction: ${data.direction}
    `;

            },
        },

        xAxis: {
            type: "category",
            data: categories,

            axisTick: {
                show: false,
            },

            axisLine: {
                lineStyle: {
                    color: "#CBD5E1",
                },
            },

            axisLabel: {
                fontSize: 10,        // was 11
                lineHeight: 14,      // was 16
                color: "#475569",
                interval: 0,
                fontWeight: 600,
                fontFamily: FONT_FAMILY,
                formatter: (value: string) => value.split(" ").join("\n"),
            },
        },

        yAxis: {
            type: "value",

            min: yAxisMin,

            max: yAxisMax,

            interval: 20,

            axisLine: {
                show: false,
            },

            axisTick: {
                show: false,
            },

            axisLabel: {
                fontFamily: FONT_FAMILY,
                fontSize: 10,   // was 11
                color: "#94A3B8",
            },

            splitLine: {
                lineStyle: {
                    type: "dashed",
                    color: "#E2E8F0",
                },
            },
        },

        series: [
            {
                type: "custom",

                coordinateSystem: "cartesian2d",

                renderItem,

                data: chartData,
            },
        ],

    };

    return (

        <ReactECharts

            option={option}

            style={{
                height: 350,
                width: "100%",
            }}

        />

    );

};

export default WaterfallChart;
