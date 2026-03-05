//useEmployees.ts

import type { Employee } from "@/models/Employee";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import apiClient from "../ApiClientImplementation";

export default function useEmployees(config?: AxiosRequestConfig) {
    // Формируем ключ. TanStack Query сам глубоко сравнивает объекты в ключе,
    const queryKey = config ? ["employees", config] : ["employees"];

    const { data, error, isLoading, ...rest } = useQuery<Employee[], AxiosError>({
        queryKey,
        queryFn: ({ signal }) => apiClient.getEmployees({ ...config, signal }),
        staleTime: 1000 * 60 * 10, // 10 минут
    });

    return {
        employees: data ?? [],
        error,
        isLoading,
        ...rest // Позволяет получить доступ к refetch, isFetching и т.д.
    };
}