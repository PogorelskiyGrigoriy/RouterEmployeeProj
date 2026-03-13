/**
 * @module useDepartmentStats
 * Aggregates CURRENTLY FILTERED employee data into department-level statistics.
 */

import { useMemo } from "react";
import { groupBy, meanBy } from "lodash";
import { useEmployees } from "./useEmployees";
import { EMPLOYEES_CONFIG } from "@/config/employees-config";
import type { DepartmentInfo } from "@/schemas/department.schema";
import { calculateAge } from "@/utils/dateUtils";
import type { Employee } from "@/schemas/employee.schema";

export const useDepartmentStats = () => {
  // Data Source: reacts to changes in filters automatically via useEmployees
  const { employees, isLoading, error } = useEmployees();

  const departmentsInfo = useMemo(() => {
    if (!employees.length) {
      // Return zeroed stats for all departments if no data matches filters
      return EMPLOYEES_CONFIG.departments.map(dept => ({
        department: dept,
        numEmployees: 0,
        avgSalary: 0,
        avgAge: 0
      }));
    }

    const grouped = groupBy(employees, (e: Employee) => e.department);

    return EMPLOYEES_CONFIG.departments.map((dept): DepartmentInfo => {
      const deptEmployees = grouped[dept] || [];
      const count = deptEmployees.length;

      return {
        department: dept,
        numEmployees: count,
        avgSalary: count > 0 
          ? Math.round(meanBy(deptEmployees, (e: Employee) => e.salary)) 
          : 0,
        avgAge: count > 0 
          ? Math.round(meanBy(deptEmployees, (e: Employee) => calculateAge(e.birthDate)))
          : 0
      };
    });
  }, [employees]);

  return { departmentsInfo, isLoading, error };
};