/**
 * @module Filters
 * Models and constants for filtering employee data in the UI.
 */

import { DEPARTMENTS_LIST, type Department } from "./Departments";

/**
 * Filter value for department selection, including the 'All' wildcard.
 */
export type DepartmentFilterValue = Department | "All";

/** * Flat list of department values for filtering.
 * Automatically stays in sync with DEPARTMENTS_LIST.
 */
export const DEPARTMENT_FILTER_VALUES: readonly DepartmentFilterValue[] = [
  "All", 
  ...DEPARTMENTS_LIST
] as const;

/**
 * Global interface for employee search and filter criteria.
 */
export interface EmployeeFilters {
  readonly department: DepartmentFilterValue;
  readonly minSalary: number;
  readonly maxSalary: number;
  readonly minAge: number;
  readonly maxAge: number;
}

/**
 * Structure for UI Select components.
 */
export interface FilterOption {
  readonly label: string;
  readonly value: string;
}