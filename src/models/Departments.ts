/**
 * @module Departments
 * Domain models and constants for organizational departments.
 */

/**
 * 1. The Single Source of Truth
 * We define the array first with 'as const' to get exact string literals.
 */
export const DEPARTMENTS_LIST = [
  "QA", 
  "Development", 
  "Audit", 
  "Accounting", 
  "Management"
] as const;

/**
 * 2. Derived Type
 * This automatically creates a Union Type: "QA" | "Development" | ...
 * If you add a department to the list, the type updates automatically!
 */
export type Department = typeof DEPARTMENTS_LIST[number];

/**
 * 3. Statistics Model
 */
export interface DepartmentInfo {
  readonly department: Department | "Unknown";
  readonly numEmployees: number;
  readonly avgSalary: number;
  readonly avgAge: number;
}