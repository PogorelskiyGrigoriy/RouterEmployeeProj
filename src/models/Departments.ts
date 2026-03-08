//Departments.ts

export type Department = "QA" | "Development" | "Audit" | "Accounting" | "Management";

export const DEPARTMENTS: Department[] = ["QA", "Development", "Audit", "Accounting", "Management"];

// для фильтров:
export const DEPARTMENT_OPTIONS = ["All", ...DEPARTMENTS] as const;