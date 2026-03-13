import { z } from "zod";
import { departmentFilterSchema } from "./department.schema";
import { EMPLOYEES_CONFIG } from "@/config/employees-config";

const { salary, age } = EMPLOYEES_CONFIG;

/**
 * 1. Main filter schema for employee search and sorting
 * Uses defaults from centralized EMPLOYEES_CONFIG
 */
export const employeeFiltersSchema = z.object({
  department: departmentFilterSchema.default("All"),
  minSalary: z.coerce.number().default(salary.min),
  maxSalary: z.coerce.number().default(salary.max),
  minAge: z.coerce.number().default(age.min),
  maxAge: z.coerce.number().default(age.max),
});

/**
 * 2. Derived filter types
 */
export type EmployeeFilters = z.infer<typeof employeeFiltersSchema>;

/**
 * 3. Generic interface for UI Select components
 */
export interface FilterOption {
  readonly label: string;
  readonly value: string;
}