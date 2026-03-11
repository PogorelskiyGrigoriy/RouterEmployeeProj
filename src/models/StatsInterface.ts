/**
 * @module StatsInterface
 * Models for data visualization and chart components.
 */

/**
 * Single data point for any chart.
 */
export interface StatsDataItem {
  readonly xValue: string | number;
  readonly yValue: number;
  readonly tooltipValue: string;
}

/**
 * Configuration props for the StatisticsChart component.
 */
export interface StatsChartProps {
  readonly title: string;
  readonly data: readonly StatsDataItem[];
  readonly dataKeyX?: keyof StatsDataItem;
  readonly dataKeyY?: keyof StatsDataItem;
  readonly tooltipLabelKey?: keyof StatsDataItem;
  readonly labelY?: string;
}