/**
 * @module statistics-helpers
 * Refined with stricter types for Zod-driven data.
 */

import { range, countBy } from "lodash";
import type { GroupingConfig } from "@/config/employees-config";
import type { StatsDataItem } from "@/schemas/statsInterface.schema";

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

  if (interval <= 0) return [];

  /**
   * 1. Group items.
   * Note: lodash countBy converts keys to strings.
   */
  const stats = countBy(items, (item) => {
    const val = valueExtractor(item);
    
    // Clamp values to stay within [min, max] range
    const effectiveVal = Math.min(Math.max(val, min), max - 1);
    
    const offset = effectiveVal - min;
    const binStart = Math.floor(offset / interval) * interval + min;
    return binStart;
  });

  // 2. Map range to StatsDataItem
  return range(min, max, interval).map((v) => {
    const isLast = v + interval >= max;
    
    return {
      xValue: formatters.xKey(v),
      // stats[v] works because JS objects coerce number keys to strings
      yValue: stats[v] || 0, 
      tooltipValue: formatters.tooltip(v, isLast),
    };
  });
};