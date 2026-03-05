// GroupingConfig.ts

export interface GroupingConfig {
  min: number;
  max: number;
  interval: number;
  unit?: string;     // Например, 'k' для зарплат
  currency?: string; // Например, '$'
  label: string;     // Для заголовков осей
}