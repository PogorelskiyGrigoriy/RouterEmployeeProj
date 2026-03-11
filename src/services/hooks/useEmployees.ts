/**
 * @module useEmployees
 * Единый хук для управления данными сотрудников.
 * Объединяет серверную загрузку, фильтрацию на клиенте и расчет статистики.
 */

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useMemo } from "react";
import { apiClient } from "../ApiClientImplementation";
import { useFilters } from "@/store/filters-store";
import { useSortStore } from "@/store/sort-store";
import { useAuthStore } from "@/store/useAuthStore";
import { calculateAge } from "@/utils/dateUtils";
import type { Employee } from "@/models/Employee";

export const useEmployees = () => {
  // 1. Получаем состояние из сторов
  const filters = useFilters((state) => state.filters);
  const sort = useSortStore((state) => state.sort);
  const isAuthenticated = useAuthStore((state) => !!state.user);

  // 2. Формируем ключ запроса. 
  // ВАЖНО: Ключ должен включать фильтры и сортировку для кэширования.
  const queryKey = ["employees", filters, sort] as const;

  // 3. Основной запрос к API через React Query
  const query = useQuery<readonly Employee[], Error>({
    queryKey,
    queryFn: ({ signal }) => apiClient.getEmployees(filters, sort, { signal }),
    
    // Настройки кэширования и плавности UI
    staleTime: 1000 * 60 * 5, // Данные "свежие" 5 минут
    placeholderData: keepPreviousData, // Не показываем спиннер при смене фильтров
    
    // ПРЕДОХРАНИТЕЛЬ: Запрос идет только если юзер залогинен
    enabled: isAuthenticated, 
  });

  const allEmployeesFromApi = query.data ?? [];

  /**
   * 4. КЛИЕНТСКАЯ ФИЛЬТРАЦИЯ (useMemo)
   * Подстраховка на случай, если API не поддерживает гранулярную фильтрацию
   * или для мгновенного обновления UI.
   */
  const filteredEmployees = useMemo(() => {
    if (!allEmployeesFromApi.length) return [];

    return allEmployeesFromApi.filter((emp) => {
      // Проверка департамента
      const isDeptMatch = 
        filters.department === "All" || 
        emp.department === filters.department;
      if (!isDeptMatch) return false;

      // Проверка зарплаты
      const isSalaryMatch = 
        emp.salary >= filters.minSalary && 
        emp.salary <= filters.maxSalary;
      if (!isSalaryMatch) return false;

      // Проверка возраста
      const age = calculateAge(emp.birthDate);
      const isAgeMatch = 
        age >= filters.minAge && 
        age <= filters.maxAge;
      if (!isAgeMatch) return false;

      return true;
    });
  }, [allEmployeesFromApi, filters]);

  // 5. Возвращаем расширенный объект данных
  return {
    ...query, // Состояние загрузки (isLoading, error и т.д.)
    employees: filteredEmployees, // Отфильтрованный список для таблицы и аналитики
    totalCount: allEmployeesFromApi.length, // Общее кол-во (из ответа сервера)
    filteredCount: filteredEmployees.length, // Кол-во после применения фильтров
  };
};