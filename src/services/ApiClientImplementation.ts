// src/services/ApiClientImplementation.ts
import api from "@/api/axiosInstance";
import type { AxiosRequestConfig } from "axios";
import type { ApiClient } from "./ApiClient"; 
import type { EmployeeFilters } from "@/models/Filters"; 
import type { Employee, NewEmployee, EmployeeUpdater } from "@/models/Employee"; 
import { getLimitDate } from "@/utils/dateUtils"; 

const ENDPOINTS = {
  EMPLOYEES: "/employees",
} as const;

class ApiClientJsonServer implements ApiClient {
  async getEmployees(filters?: EmployeeFilters, config?: AxiosRequestConfig): Promise<Employee[]> {
    const params: Record<string, any> = { ...config?.params };

    if (filters) {
      if (filters.department && filters.department !== "All") {
        params.department = filters.department;
      }
      if (filters.minSalary !== undefined) params.salary_gte = filters.minSalary;
      if (filters.maxSalary !== undefined) params.salary_lte = filters.maxSalary;

      // Перевод возраста в даты ISO для json-server
      if (filters.minAge !== undefined) {
        params.birthDate_lte = getLimitDate(filters.minAge);
      }
      if (filters.maxAge !== undefined) {
        params.birthDate_gte = getLimitDate(filters.maxAge);
      }
    }

    const { data } = await api.get<Employee[]>(ENDPOINTS.EMPLOYEES, { 
      ...config, 
      params 
    });
    
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
    // Используем PATCH, чтобы обновить только переданные поля (Partial)
    const { data } = await api.patch<Employee>(`${ENDPOINTS.EMPLOYEES}/${id}`, fields);
    return data;
  }
}

const apiClient: ApiClient = new ApiClientJsonServer();
export default apiClient;