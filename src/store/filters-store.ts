import { create } from "zustand";
import employeesConfig from "@/config/employees-config";
import type { Department } from "@/models/Departments";

// 1. Создаем тип здесь. Он расширяет базовый Department, добавляя "All"
export type DepartmentFilterValue = Department | "All";

// 2. Описываем структуру только данных
interface FiltersState {
    department: DepartmentFilterValue;
    minSalary: number;
    maxSalary: number;
    minAge: number;
    maxAge: number;
}

// 3. Описываем стор целиком (данные + методы)
interface FiltersStore extends FiltersState {
    setFilters: (filters: Partial<FiltersState>) => void;
    resetFilters: () => void;
}

const initialFilters: FiltersState = {
    department: "All",
    minSalary: employeesConfig.salary.min,
    maxSalary: employeesConfig.salary.max,
    minAge: employeesConfig.age.min,
    maxAge: employeesConfig.age.max,
};

export const useFilters = create<FiltersStore>((set) => ({
    ...initialFilters,
    // Универсальный сеттер, который принимает объект
    setFilters: (updates) => set((state) => ({ ...state, ...updates })),
    resetFilters: () => set(initialFilters),
}));