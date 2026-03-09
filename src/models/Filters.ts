import { DEPARTMENTS, type Department } from "./Departments";

// Тип для селектов
export type DepartmentFilterValue = Department | "All";

/** * Динамически создаем опции для UI. 
 * Если в Departments.ts добавится новый отдел, здесь он появится САМ.
 */
export const DEPARTMENT_OPTIONS: DepartmentFilterValue[] = ["All", ...DEPARTMENTS];

export interface EmployeeFilters {
  department: DepartmentFilterValue;
  minSalary: number;
  maxSalary: number;
  minAge: number;
  maxAge: number;
}