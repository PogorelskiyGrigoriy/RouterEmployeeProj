/**
 * @module useDepartmentStats
 * Aggregates employee data into department-level statistics.
 */

import { useMemo } from "react";
import { groupBy, meanBy } from "lodash";
import { useEmployees } from "./useEmployees"; // Именованный импорт
import { EMPLOYEES_CONFIG } from "@/config/employees-config";
import type { DepartmentInfo } from "@/schemas/department.schema";
import { calculateAge } from "@/utils/dateUtils";

/**
 * Hook to calculate headcounts, average salary, and average age per department.
 */
export const useDepartmentStats = () => {
  // 1. Data Source: Automatically reflects filtered results
  const { employees, isLoading } = useEmployees();

  const departmentsInfo = useMemo(() => {
    // If no employees, still return empty stats for all departments defined in config
    const grouped = groupBy(employees, 'department');

    return EMPLOYEES_CONFIG.departments.map((dept): DepartmentInfo => {
      const deptEmployees = grouped[dept] || [];
      const count = deptEmployees.length;

      return {
        department: dept,
        numEmployees: count,
        // Using Math.round for cleaner UI presentation
        avgSalary: count > 0 
          ? Math.round(meanBy(deptEmployees, 'salary')) 
          : 0,
        avgAge: count > 0 
          ? Math.round(meanBy(deptEmployees, e => calculateAge(e.birthDate)))
          : 0
      };
    });
  }, [employees]);

  return { departmentsInfo, isLoading };
};