/**
 * @module useFilters
 * Global state for employee filtering, using defaults from Zod schema.
 */

import { create } from "zustand";
import { employeeFilterSchema, type EmployeeFilter } from "@/schemas/employee.schema";

interface FiltersActions {
  setFilters: (updates: Partial<EmployeeFilter>) => void;
  resetFilters: () => void;
}

interface FiltersStore extends FiltersActions {
  readonly filters: EmployeeFilter;
}

// Use Zod to generate initial state with defaults
const initialFilters = employeeFilterSchema.parse({});

export const useFilters = create<FiltersStore>((set) => ({
  filters: initialFilters,

  setFilters: (updates) => 
    set((state) => ({ 
      filters: { ...state.filters, ...updates } 
    })),

  resetFilters: () => set({ filters: initialFilters }),
}));