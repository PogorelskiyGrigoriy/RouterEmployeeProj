// src/utils/statistics-helpers.ts
import { range, countBy } from "lodash"
import type { GroupingConfig } from "@/config/employees-config"

/**
 * Группирует массив данных по числовым интервалам
 */
export const getBinnedData = <T>(
  items: T[],
  config: GroupingConfig, 
  valueExtractor: (item: T) => number,
  formatters: {
    xKey: (v: number) => string
    tooltip: (v: number, isLast: boolean) => string
  }
) => {
  const { min, max, interval } = config

  const stats = countBy(items, (item) => {
    const val = valueExtractor(item)
    const effectiveVal = val >= max ? max - 1 : val
    const offset = effectiveVal - min
    return Math.floor(offset / interval) * interval + min
  })

  return range(min, max, interval).map((v) => {
    const isLast = v + interval >= max
    return {
      xValue: formatters.xKey(v),
      yValue: stats[v] || 0,
      tooltipValue: formatters.tooltip(v, isLast),
    }
  })
}