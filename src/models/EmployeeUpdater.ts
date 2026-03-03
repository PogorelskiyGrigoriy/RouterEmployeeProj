import type { Employee } from "@/models/Employee";

export type EmployeeUpdater = {
    id: string;
    fields: Partial<Employee>; 
}