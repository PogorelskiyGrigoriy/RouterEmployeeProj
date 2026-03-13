import { DEPARTMENTS_LIST, type Department } from "@/schemas/department.schema";

export interface GroupingConfig {
  readonly min: number;
  readonly max: number;
  readonly interval: number;
  readonly unit?: string;
  readonly currency?: string;
  readonly label: string;
}

interface EmployeesConfig {
  readonly salary: GroupingConfig;
  readonly age: GroupingConfig;
  readonly departments: readonly Department[]; 
}

/**
 * Global configuration for employee business rules and UI limits.
 */
export const EMPLOYEES_CONFIG: EmployeesConfig = {
  salary: {
    min: 5000,
    max: 50000,
    interval: 5000,
    unit: 'k',
    currency: '$',
    label: 'Salary'
  },
  age: {
    min: 20,
    max: 65,
    interval: 5,
    label: 'Age'
  },
  departments: DEPARTMENTS_LIST,
} as const;