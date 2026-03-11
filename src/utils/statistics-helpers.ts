/**
 * @module statistics-helpers
 * Utilities for processing and binning numerical data for visualization.
 */

import { range, countBy } from "lodash";
import type { GroupingConfig } from "@/config/employees-config";
import type { StatsDataItem } from "@/models/StatsInterface";

/**
 * Groups an array of items into numerical intervals (bins).
 * Useful for age or salary distribution charts.
 * * @template T - The type of items being processed.
 * @param items - Source data array.
 * @param config - Min, Max, and Interval settings from config.
 * @param valueExtractor - Function to get the numeric value from an item.
 * @param formatters - Callbacks to define display strings for X-axis and tooltips.
 */
export const getBinnedData = <T>(
  items: readonly T[],
  config: GroupingConfig, 
  valueExtractor: (item: T) => number,
  formatters: {
    xKey: (v: number) => string
    tooltip: (v: number, isLast: boolean) => string
  }
): StatsDataItem[] => {
  const { min, max, interval } = config;

  // Prevent infinite loops if interval is invalid
  if (interval <= 0) return [];

  // 1. Group items by calculated bin start value
  const stats = countBy(items, (item) => {
    const val = valueExtractor(item);
    
    // Clamp values to stay within [min, max) range
    // If value exceeds max, we put it in the last bin
    const effectiveVal = Math.min(Math.max(val, min), max - 1);
    
    const offset = effectiveVal - min;
    return Math.floor(offset / interval) * interval + min;
  });

  // 2. Generate the full range of bins (even empty ones)
  return range(min, max, interval).map((v) => {
    const isLast = v + interval >= max;
    
    return {
      xValue: formatters.xKey(v),
      yValue: stats[v] || 0,
      tooltipValue: formatters.tooltip(v, isLast),
    };
  });
};