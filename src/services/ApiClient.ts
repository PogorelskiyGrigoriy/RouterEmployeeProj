import type { Employee } from "@/models/Employee";
import type { AxiosRequestConfig } from "axios";
import type { EmployeeUpdater } from "../models/EmployeeUpdater";

export interface ApiClient {
    getEmployees(config?: AxiosRequestConfig): Promise<Employee[]>;
    addEmployee(e : Employee): Promise<Employee>;
    deleteEmployee(id: string): Promise<Employee>;
    updateEmployee(updater: EmployeeUpdater): Promise<Employee>;
}