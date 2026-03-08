import { useMemo } from "react";
import useEmployees from "./useEmployees";
import { useFilters } from "@/store/filters-store";
import { calculateAge } from "@/utils/dateUtils";

/**
 * Хук-посредник для фильтрации списка сотрудников.
 * Теперь работает с числовыми значениями напрямую из стора.
 */
export const useFilteredEmployees = () => {
  const { employees: allEmployees, isLoading, error, ...rest } = useEmployees();
  
  // Данные из стора теперь приходят как numbers
  const { department, minSalary, maxSalary, minAge, maxAge } = useFilters();

  const filteredEmployees = useMemo(() => {
    if (!allEmployees.length) return [];

    return allEmployees.filter((emp) => {
      // 1. Департамент (строгое сравнение или пропуск если "All")
      const matchesDepartment = department === "All" || emp.department === department;
      if (!matchesDepartment) return false;

      // 2. Зарплата (числовое сравнение без лишних преобразований)
      if (emp.salary < minSalary || emp.salary > maxSalary) {
        return false;
      }

      // 3. Возраст
      const currentAge = calculateAge(emp.birthDate);
      if (currentAge < minAge || currentAge > maxAge) {
        return false;
      }

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