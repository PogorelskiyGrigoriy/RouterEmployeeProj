/**
 * @module useEmployees
 * Main data hook that synchronizes global filters/sort state with server data.
 */

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "../ApiClientImplementation";
import { useFilters } from "@/store/filters-store";
import { useSortStore } from "@/store/sort-store";
import type { Employee } from "@/models/Employee";

/**
 * Fetches and manages the list of employees.
 * Reacts to changes in filters and sorting automatically.
 */
export const useEmployees = () => {
  // 1. Select only data from stores (ignoring actions to prevent re-renders)
  const filters = useFilters((state) => state.filters);
  const sort = useSortStore((state) => state.sort);

  // 2. Query Key as a dependency array
  const queryKey = ["employees", filters, sort] as const;

  const { data, ...queryProps } = useQuery<readonly Employee[], AxiosError>({
    queryKey,
    queryFn: ({ signal }) => apiClient.getEmployees(filters, sort, { signal }),
    
    // Performance & UX
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: keepPreviousData, // Smooth transition between filter changes
  });

  return {
    employees: data ?? [],
    ...queryProps,
  };
};