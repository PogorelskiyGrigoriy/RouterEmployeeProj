//DepartmentInfo.ts

import type { Department } from "./Departments";

export interface DepartmentInfo {
  department: Department | "Unknown";
  numEmployees: number;
  avgSalary: number;
  avgAge: number;
}