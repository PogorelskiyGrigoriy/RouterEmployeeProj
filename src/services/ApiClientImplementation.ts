//ApiClientImplementation.ts

import api from "@/api/axiosInstance";
import type { AxiosRequestConfig } from "axios";
import type { ApiClient } from "./ApiClient";
import type { Employee, NewEmployee } from "@/models/Employee";
import type { EmployeeUpdater } from "@/models/EmployeeUpdater";

const ENDPOINTS = {
  EMPLOYEES: "/employees",
} as const;

class ApiClientJsonServer implements ApiClient {
  async getEmployees(config?: AxiosRequestConfig): Promise<Employee[]> {
    const { data } = await api.get<Employee[]>(ENDPOINTS.EMPLOYEES, config);
    return data;
  }

  async addEmployee(e: NewEmployee): Promise<Employee> {
    const { data } = await api.post<Employee>(ENDPOINTS.EMPLOYEES, e);
    return data;
  }

  async deleteEmployee(id: string): Promise<void> {
    await api.delete(`${ENDPOINTS.EMPLOYEES}/${id}`);
  }

  async updateEmployee({ id, fields }: EmployeeUpdater): Promise<Employee> {
    const { data } = await api.patch<Employee>(`${ENDPOINTS.EMPLOYEES}/${id}`, fields);
    return data;
  }
}

const apiClient: ApiClient = new ApiClientJsonServer();
export default apiClient;