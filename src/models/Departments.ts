//Departments.ts

// 1. Тип-источник
export type Department = "QA" | "Development" | "Audit" | "Accounting" | "Management";

// 2. Массив-источник (используем as const для защиты)
export const DEPARTMENTS: Department[] = ["QA", "Development", "Audit", "Accounting", "Management"];

// 3. Интерфейс для статистики (переехал сюда окончательно)
export interface DepartmentInfo {
  department: Department | "Unknown";
  numEmployees: number;
  avgSalary: number;
  avgAge: number;
}