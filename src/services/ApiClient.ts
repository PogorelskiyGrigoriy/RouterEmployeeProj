/**
 * @module ApiClient
 * Abstract interface for employee management data provider.
 */

import type { AxiosRequestConfig } from "axios";
import type { 
  Employee, 
  NewEmployee, 
  EmployeeUpdatePayload 
} from "@/schemas/employee.schema";
import type { EmployeeFilters } from "@/schemas/filter.schema";
import type { SortState } from "@/store/sort-store";

/**
 * Defines mandatory methods for any data source (API or Stub).
 */
export interface ApiClient {
  /**
   * Fetches a list of employees based on filters and sorting criteria.
   */
  getEmployees(
    filters?: EmployeeFilters, 
    sort?: SortState, 
    config?: AxiosRequestConfig
  ): Promise<readonly Employee[]>;
  
  /**
   * Creates a new employee entry.
   */
  addEmployee(employee: NewEmployee): Promise<Employee>;
  
  /**
   * Removes an employee by their unique identifier.
   */
  deleteEmployee(id: string): Promise<void>;
  
  /**
   * Partially or fully updates an existing employee record.
   */
  updateEmployee(payload: EmployeeUpdatePayload): Promise<Employee>;
}