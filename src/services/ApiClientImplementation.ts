import { api } from "@/api/axiosInstance";
import type { AxiosRequestConfig } from "axios";
import type { ApiClient } from "./ApiClient"; 
import type { EmployeeFilters } from "@/models/Filters"; 
import type { Employee, NewEmployee, EmployeeUpdatePayload } from "@/schemas/employee.schema"; 
import type { SortState } from "@/store/sort-store"; 
import { getLimitDate } from "@/utils/dateUtils"; 

const ENDPOINTS = {
  EMPLOYEES: "/employees",
} as const;

/**
 * JSON-Server implementation of the ApiClient.
 * Maps application filters to json-server specific query parameters.
 */
class ApiClientJsonServer implements ApiClient {
  
  async getEmployees(
    filters?: EmployeeFilters, 
    sort?: SortState, 
    config?: AxiosRequestConfig
  ): Promise<Employee[]> {
    const params = this.buildParams(filters, sort, config?.params);

    const { data } = await api.get<Employee[]>(ENDPOINTS.EMPLOYEES, { 
      ...config, 
      params 
    });
    
    return data;
  }

  async addEmployee(employee: NewEmployee): Promise<Employee> {
    const { data } = await api.post<Employee>(ENDPOINTS.EMPLOYEES, employee);
    return data;
  }

  async deleteEmployee(id: string): Promise<void> {
    await api.delete(`${ENDPOINTS.EMPLOYEES}/${id}`);
  }

  async updateEmployee({ id, changes }: EmployeeUpdatePayload): Promise<Employee> {
    // Json-server использует PATCH для частичного обновления
    const { data } = await api.patch<Employee>(`${ENDPOINTS.EMPLOYEES}/${id}`, changes);
    return data;
  }

  /**
   * Helper to transform UI state into API query parameters
   */
  private buildParams(
    filters?: EmployeeFilters, 
    sort?: SortState, 
    baseParams?: Record<string, any>
  ): Record<string, any> {
    const params: Record<string, any> = { ...baseParams };

    if (filters) {
      if (filters.department && filters.department !== "All") {
        params.department = filters.department;
      }
      if (filters.minSalary !== undefined) params.salary_gte = filters.minSalary;
      if (filters.maxSalary !== undefined) params.salary_lte = filters.maxSalary;

      // Логика дат: для минимального возраста (20 лет) 
      // дата рождения должна быть МЕНЬШЕ или равна (родился раньше)
      if (filters.minAge !== undefined) {
        params.birthDate_lte = getLimitDate(filters.minAge);
      }
      if (filters.maxAge !== undefined) {
        params.birthDate_gte = getLimitDate(filters.maxAge);
      }
    }

    if (sort?.key && sort?.order) {
      params._sort = sort.key;
      params._order = sort.order;
    }

    return params;
  }
}

export const apiClient: ApiClient = new ApiClientJsonServer();