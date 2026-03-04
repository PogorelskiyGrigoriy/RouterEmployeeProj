export interface StatsDataItem {
  xValue: string | number;
  yValue: number;
  tooltipValue: string;
  // Индексная сигнатура на случай расширения данных в будущем
  [key: string]: string | number | undefined;
}

export interface StatsChartProps {
  title: string;
  data: StatsDataItem[];
  // Делаем ключи необязательными, так как в компоненте есть значения по умолчанию
  dataKeyX?: string;
  dataKeyY?: string;
  tooltipLabelKey?: string;
}