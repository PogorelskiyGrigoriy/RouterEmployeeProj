import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import apiClient from "../ApiClientImplementation";
import { useFilters } from "@/store/filters-store";
import { useSortStore } from "@/store/sort-store"; // Импортируем стор сортировки
import type { Employee } from "@/models/Employee";

export default function useEmployees() {
    const { setFilters, resetFilters, ...filters } = useFilters();
    // Достаем объект sort из нашего нового стора
    const { sort } = useSortStore(); 

    /**
     * ВАЖНО: Добавляем sort в queryKey.
     * Теперь запрос будет улетать каждый раз, когда меняется фильтр ИЛИ сортировка.
     */
    const queryKey = ["employees", filters, sort];

    const { data, error, isLoading, ...rest } = useQuery<Employee[], AxiosError>({
        queryKey,
        // Передаем и фильтры, и сортировку в API-клиент
        queryFn: ({ signal }) => apiClient.getEmployees(filters, sort, { signal }),
        staleTime: 1000 * 60 * 10,
    });

    return {
        employees: data ?? [],
        error,
        isLoading,
        ...rest
    };
}