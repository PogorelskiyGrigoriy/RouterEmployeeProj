// src/services/hooks/useEmployees.ts
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import apiClient from "../ApiClientImplementation";
import { useFilters } from "@/store/filters-store"; // Подключаем стор
import type { Employee } from "@/models/Employee";

export default function useEmployees() {
    // 1. Достаем все фильтры из стора
    const { setFilters, resetFilters, ...filters } = useFilters();

    /**
     * 2. Формируем ключ запроса. 
     * Теперь React Query будет перезапрашивать данные КАЖДЫЙ РАЗ, 
     * когда меняется любой из фильтров в Zustand.
     */
    const queryKey = ["employees", filters];

    const { data, error, isLoading, ...rest } = useQuery<Employee[], AxiosError>({
        queryKey,
        // Передаем фильтры в API-клиент
        queryFn: ({ signal }) => apiClient.getEmployees(filters, { signal }),
        staleTime: 1000 * 60 * 10,
    });

    return {
        employees: data ?? [],
        error,
        isLoading,
        ...rest
    };
}