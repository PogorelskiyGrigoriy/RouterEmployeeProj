import { z } from "zod";
import { departmentSchema, DEPARTMENTS_LIST } from "./department.schema";
import { EMPLOYEES_CONFIG } from "@/config/employees-config";

const { salary, age } = EMPLOYEES_CONFIG;

/**
 * 1. Значения для фильтра департаментов
 * Вместо ручной склейки массива, мы используем DEPARTMENTS_LIST.
 */
export const DEPARTMENT_FILTER_VALUES = ["All", ...DEPARTMENTS_LIST] as const;

/**
 * 2. Схема для фильтров
 * Мы используем .default(), чтобы форма сразу знала начальные значения.
 */
export const employeeFiltersSchema = z.object({
  department: z.union([departmentSchema, z.literal("All")])
    .default("All"),
  minSalary: z.coerce.number()
    .default(salary.min),
  maxSalary: z.coerce.number()
    .default(salary.max),
  minAge: z.coerce.number()
    .default(age.min),
  maxAge: z.coerce.number()
    .default(age.max),
});

/**
 * 3. Генерируемые типы
 */
export type EmployeeFilters = z.infer<typeof employeeFiltersSchema>;
export type DepartmentFilterValue = EmployeeFilters["department"];

/**
 * 4. Вспомогательный интерфейс для UI (FilterOption)
 * Его можно оставить обычным типом, так как это контракт для Select-компонентов.
 */
export interface FilterOption {
  readonly label: string;
  readonly value: string;
}