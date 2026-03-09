import { useMemo } from "react";
import useEmployees from "./useEmployees";
import { useFilters } from "@/store/filters-store";
import { calculateAge } from "@/utils/dateUtils";

/**
 * Хук-посредник для фильтрации списка сотрудников.
 * Работает в связке с useEmployees, который берет данные с сервера (уже отсортированные),
 * и дофильтровывает их на клиенте.
 */
export const useFilteredEmployees = () => {
  // useEmployees внутри себя подписан на useSortStore и useFilters (для API)
  const { employees: allEmployees, isLoading, error, ...rest } = useEmployees();
  
  // Данные фильтрации из Zustand для клиентской "дофильтрации"
  const { department, minSalary, maxSalary, minAge, maxAge } = useFilters();

  const filteredEmployees = useMemo(() => {
    if (!allEmployees.length) return [];

    return allEmployees.filter((emp) => {
      // 1. Фильтр по департаменту
      const matchesDepartment = department === "All" || emp.department === department;
      if (!matchesDepartment) return false;

      // 2. Фильтр по зарплате
      if (emp.salary < minSalary || emp.salary > maxSalary) {
        return false;
      }

      // 3. Фильтр по возрасту
      const currentAge = calculateAge(emp.birthDate);
      if (currentAge < minAge || currentAge > maxAge) {
        return false;
      }

      return true;
    });
    // Зависимости: когда меняются данные с сервера (allEmployees) 
    // или любой фильтр — пересчитываем список.
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