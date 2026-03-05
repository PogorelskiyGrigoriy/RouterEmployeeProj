//ApiClient.ts

import type { Employee, NewEmployee } from "@/models/Employee";
import type { AxiosRequestConfig } from "axios";
import type { EmployeeUpdater } from "@/models/EmployeeUpdater";

export interface ApiClient {
  getEmployees(config?: AxiosRequestConfig): Promise<Employee[]>;
  addEmployee(e: NewEmployee): Promise<Employee>; // Используем NewEmployee
  deleteEmployee(id: string): Promise<void>; // DELETE обычно ничего не возвращает
  updateEmployee(updater: EmployeeUpdater): Promise<Employee>;
}