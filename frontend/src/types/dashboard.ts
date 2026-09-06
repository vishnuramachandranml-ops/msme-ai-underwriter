export type DataQuality = "Excellent" | "Good" | "Fair" | "Poor";

export interface DataSourceItemProps {
    id: string;
    label: string;
    coverage: number;
    quality: DataQuality;
}

export interface TrendSeries {
    id: "revenue" | "expenses" | "electricity";
    label: string;
    unit: string;
    color: string;
    data: number[];
    currentValue: number;
    changePercent: number;
    changeDirection: "up" | "down";
}

export interface TrendsData {
    months: string[];
    series: TrendSeries[];
}
