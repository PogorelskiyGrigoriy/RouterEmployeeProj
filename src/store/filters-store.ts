import { create } from "zustand";
import employeesConfig from "@/config/employees-config";
import type { EmployeeFilters } from "@/models/Filters"; // Используем общий интерфейс

interface FiltersStore extends EmployeeFilters {
    setFilters: (filters: Partial<EmployeeFilters>) => void;
    resetFilters: () => void;
}

const initialFilters: EmployeeFilters = {
    department: "All",
    minSalary: employeesConfig.salary.min,
    maxSalary: employeesConfig.salary.max,
    minAge: employeesConfig.age.min,
    maxAge: employeesConfig.age.max,
};

export const useFilters = create<FiltersStore>((set) => ({
    ...initialFilters,
    setFilters: (updates) => set((state) => ({ ...state, ...updates })),
    resetFilters: () => set(initialFilters),
}));