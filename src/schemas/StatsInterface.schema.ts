import { z } from "zod";

/**
 * Схема для одной точки данных.
 * Используем для валидации результатов расчетов или ответов API.
 */
export const statsDataItemSchema = z.object({
  xValue: z.union([z.string(), z.number()]),
  yValue: z.number(),
  tooltipValue: z.string(),
});

/**
 * Тип данных, выведенный из схемы.
 */
export type StatsDataItem = z.infer<typeof statsDataItemSchema>;

/**
 * Интерфейс для пропсов компонента.
 * Оставляем обычным интерфейсом, так как это чисто внутренняя типизация React.
 */
export interface StatsChartProps {
  readonly title: string;
  readonly data: readonly StatsDataItem[];
  readonly dataKeyX?: keyof StatsDataItem;
  readonly dataKeyY?: keyof StatsDataItem;
  readonly tooltipLabelKey?: keyof StatsDataItem;
  readonly labelY?: string;
}