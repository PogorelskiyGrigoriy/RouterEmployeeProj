import { useMemo } from "react";
import { toNumber } from "lodash"; 
import useEmployees from "./useEmployees";
import { useFilters } from "@/store/filters-store";
import { calculateAge } from "@/utils/dateUtils";

/**
 * Хук-посредник для фильтрации списка сотрудников.
 * Использует базовый хук useEmployees для получения данных и 
 * фильтрует их на основе состояния из zustand-стора.
 */
export const useFilteredEmployees = () => {
  // Получаем полные данные (чистый список для аналитики остается в useEmployees)
  const { employees: allEmployees, isLoading, error, ...rest } = useEmployees();
  
  // Получаем текущие значения фильтров
  const { department, minSalary, maxSalary, minAge, maxAge } = useFilters();

  const filteredEmployees = useMemo(() => {
    // Если данных еще нет, возвращаем пустой массив
    if (!allEmployees.length) return [];

    return allEmployees.filter((emp) => {
      // 1. Фильтрация по департаменту
      // Если выбрано "All", это условие пропускает всех
      if (department !== "All" && emp.department !== department) {
        return false;
      }

      // 2. Фильтрация по зарплате
      // toNumber из lodash безопасно превращает строку в число или в 0
      const currentSalary = emp.salary;
      const minS = toNumber(minSalary);
      const maxS = toNumber(maxSalary);

      if (currentSalary < minS || currentSalary > maxS) {
        return false;
      }

      // 3. Фильтрация по возрасту
      const currentAge = calculateAge(emp.birthDate);
      const minA = toNumber(minAge);
      const maxA = toNumber(maxAge);

      if (currentAge < minA || currentAge > maxA) {
        return false;
      }

      return true;
    });
  }, [allEmployees, department, minSalary, maxSalary, minAge, maxAge]);

  return {
    employees: filteredEmployees,   // Отфильтрованные данные для таблицы
    totalCount: allEmployees.length, // Общее кол-во (для инфо-панелей)
    filteredCount: filteredEmployees.length, // Кол-во после фильтрации
    isLoading,
    error,
    ...rest
  };
};