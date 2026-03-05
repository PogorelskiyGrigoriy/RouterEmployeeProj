//StatsInterface.ts

export interface StatsDataItem {
  xValue: string | number;
  yValue: number;
  tooltipValue: string;
}

export interface StatsChartProps {
  title: string;
  data: StatsDataItem[];
  dataKeyX?: keyof StatsDataItem; // Теперь ключи ограничены только полями StatsDataItem
  dataKeyY?: keyof StatsDataItem;
  tooltipLabelKey?: keyof StatsDataItem;
  labelY?: string;
}