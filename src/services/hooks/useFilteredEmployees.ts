/**
 * @module useFilteredEmployees
 * Middleware hook that provides extra client-side filtering on top of server data.
 */

import { useMemo } from "react";
import { useEmployees } from "./useEmployees";
import { useFilters } from "@/store/filters-store";
import { calculateAge } from "@/utils/dateUtils";

/**
 * Combines server-side fetched data with client-side filter logic.
 * Useful for scenarios where the API filter might be less granular 
 * or for immediate UI updates without network lag.
 */
export const useFilteredEmployees = () => {
  // 1. Data Source: Fetches already sorted/filtered data from API
  const { employees: allEmployees, isLoading, error, ...rest } = useEmployees();
  
  // 2. Selectors: Only get the values to avoid re-renders from actions
  const filters = useFilters((state) => state.filters);
  const { department, minSalary, maxSalary, minAge, maxAge } = filters;

  const filteredEmployees = useMemo(() => {
    if (!allEmployees.length) return [];

    return allEmployees.filter((emp) => {
      // 1. Department match
      const isDeptMatch = department === "All" || emp.department === department;
      if (!isDeptMatch) return false;

      // 2. Salary range match
      const isSalaryMatch = emp.salary >= minSalary && emp.salary <= maxSalary;
      if (!isSalaryMatch) return false;

      // 3. Age range match
      const currentAge = calculateAge(emp.birthDate);
      const isAgeMatch = currentAge >= minAge && currentAge <= maxAge;
      if (!isAgeMatch) return false;

      return true;
    });
  }, [allEmployees, department, minSalary, maxSalary, minAge, maxAge]);

  return {
    employees: filteredEmployees,
    totalCount: allEmployees.length,
    filteredCount: filteredEmployees.length,
    isLoading,
    error,
    ...rest
  };
};