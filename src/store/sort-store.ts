import { create } from "zustand";
import type { Employee } from "@/models/Employee";

/** * Слой типов (Domain Types)
 */
export type SortOrder = "asc" | "desc" | null;

export interface SortState {
  key: keyof Employee | null;
  order: SortOrder;
}

/** * Описываем только методы (Actions)
 */
interface SortActions {
  toggleSort: (key: keyof Employee) => void;
  setOrder: (key: keyof Employee, order: SortOrder) => void;
  resetSort: () => void;
}

/** * Финальный интерфейс стора (State + Actions)
 */
interface SortStore extends SortActions {
  sort: SortState;
}

const initialState: SortState = {
  key: null,
  order: null,
};

/** * Логика переходов (State Machine)
 * Вынесена отдельно, чтобы не загромождать стор
 */
const getNextOrder = (currentKey: keyof Employee | null, nextKey: keyof Employee, currentOrder: SortOrder): SortOrder => {
  if (currentKey !== nextKey) return "asc";
  
  const transitions: Record<string, SortOrder> = {
    "null": "asc",
    "asc": "desc",
    "desc": null,
  };
  
  return transitions[String(currentOrder)];
};



/** * Реализация стора
 */
export const useSortStore = create<SortStore>((set) => ({
  // Данные
  sort: initialState,

  // Умное переключение (наш вариант)
  toggleSort: (key) =>
    set((state) => {
      const nextOrder = getNextOrder(state.sort.key, key, state.sort.order);
      
      return {
        sort: nextOrder ? { key, order: nextOrder } : initialState,
      };
    }),

  // Прямая установка (из варианта преподавателя)
  setOrder: (key, order) =>
    set({
      sort: order ? { key, order } : initialState,
    }),

  // Сброс
  resetSort: () => set({ sort: initialState }),
}));