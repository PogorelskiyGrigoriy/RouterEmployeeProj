import { create } from "zustand";
import type { Employee } from "@/models/Employee";

/**
 * Domain Types for sorting logic.
 */
export type SortOrder = "asc" | "desc" | null;

export interface SortState {
  readonly key: keyof Employee | null;
  readonly order: SortOrder;
}

interface SortActions {
  toggleSort: (key: keyof Employee) => void;
  setOrder: (key: keyof Employee, order: SortOrder) => void;
  resetSort: () => void;
}

interface SortStore extends SortActions {
  readonly sort: SortState;
}

const initialState: SortState = {
  key: null,
  order: null,
};

/**
 * State Machine Logic
 * Defines the rotation: None -> Ascending -> Descending -> None
 */
const getNextOrder = (
  currentKey: keyof Employee | null, 
  nextKey: keyof Employee, 
  currentOrder: SortOrder
): SortOrder => {
  if (currentKey !== nextKey) return "asc";
  
  // Mapping transitions for predictable UI behavior
  const transitions: Record<string, SortOrder> = {
    "null": "asc",
    "asc": "desc",
    "desc": null,
  };
  
  return transitions[String(currentOrder)] ?? "asc";
};

/**
 * Global store for managing employee sorting state.
 */
export const useSortStore = create<SortStore>((set) => ({
  sort: initialState,

  toggleSort: (key) =>
    set((state) => {
      const nextOrder = getNextOrder(state.sort.key, key, state.sort.order);
      
      return {
        sort: nextOrder ? { key, order: nextOrder } : initialState,
      };
    }),

  setOrder: (key, order) =>
    set({
      sort: order ? { key, order } : initialState,
    }),

  resetSort: () => set({ sort: initialState }),
}));