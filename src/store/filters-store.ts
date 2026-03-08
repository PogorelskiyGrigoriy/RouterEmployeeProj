/**
 * @module useFilters
 * Управление состоянием фильтров сотрудников.
 * Использует строковые значения для синхронизации с HTML-инпутами.
 */

import { create } from "zustand";
import employeesConfig from "@/config/employees-config";
import type { Department } from "@/models/Departments";

/**
 * Тип для значения фильтра департамента.
 * Включает "All" для отображения всех сотрудников.
 */
export type DepartmentFilterValue = Department | "All";

interface FiltersStore {
    // Состояние
    department: DepartmentFilterValue;
    minSalary: string;
    maxSalary: string;
    minAge: string;
    maxAge: string;

    // Сеттеры
    setDepartment: (department: DepartmentFilterValue) => void;
    setMinSalary: (minSalary: string) => void;
    setMaxSalary: (maxSalary: string) => void;
    setMinAge: (minAge: string) => void;
    setMaxAge: (maxAge: string) => void;
    
    // Утилиты
    resetFilters: () => void;
}

/**
 * Начальные значения, вынесенные из конфига приложения
 */
const initialFilters = {
    department: "All" as DepartmentFilterValue,
    minSalary: String(employeesConfig.salary.min),
    maxSalary: String(employeesConfig.salary.max),
    minAge: String(employeesConfig.age.min),
    maxAge: String(employeesConfig.age.max),
};

export const useFilters = create<FiltersStore>((set) => ({
    ...initialFilters,

    /**
     * Каждая функция проверяет, изменилось ли значение, 
     * чтобы избежать лишних ререндеров компонентов React.
     */
    setDepartment: (department) => 
        set((state) => (state.department === department ? state : { department })),

    setMinSalary: (minSalary) => 
        set((state) => (state.minSalary === minSalary ? state : { minSalary })),

    setMaxSalary: (maxSalary) => 
        set((state) => (state.maxSalary === maxSalary ? state : { maxSalary })),

    setMinAge: (minAge) => 
        set((state) => (state.minAge === minAge ? state : { minAge })),

    setMaxAge: (maxAge) => 
        set((state) => (state.maxAge === maxAge ? state : { maxAge })),

    /**
     * Сбрасывает все фильтры к значениям по умолчанию из конфига
     */
    resetFilters: () => set(initialFilters),
}));