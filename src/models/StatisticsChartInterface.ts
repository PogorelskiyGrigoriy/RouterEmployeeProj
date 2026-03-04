export interface StatsDataItem {
  [key: string]: string | number | undefined;
}

export interface StatsChartProps<T extends StatsDataItem> {
  title: string;
  data: T[];
  dataKeyX: keyof T & string;
  dataKeyY: keyof T & string;
  tooltipLabelKey: keyof T & string;
}