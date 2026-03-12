/**
 * @module useFilters
 * Global state for employee filtering criteria.
 */

import { create } from "zustand";
import { EMPLOYEES_CONFIG } from "@/config/employees-config";
import type { EmployeeFilters } from "@/schemas/filter.schema";

interface FiltersActions {
  setFilters: (updates: Partial<EmployeeFilters>) => void;
  resetFilters: () => void;
}

interface FiltersStore extends FiltersActions {
  readonly filters: EmployeeFilters;
}

const initialFilters: EmployeeFilters = {
  department: "All",
  minSalary: EMPLOYEES_CONFIG.salary.min,
  maxSalary: EMPLOYEES_CONFIG.salary.max,
  minAge: EMPLOYEES_CONFIG.age.min,
  maxAge: EMPLOYEES_CONFIG.age.max,
};

/**
 * Hook for managing search and filter state.
 * Centralizes defaults from EMPLOYEES_CONFIG.
 */
export const useFilters = create<FiltersStore>((set) => ({
  filters: initialFilters,

  setFilters: (updates) => 
    set((state) => ({ 
      filters: { ...state.filters, ...updates } 
    })),

  resetFilters: () => set({ filters: initialFilters }),
}));