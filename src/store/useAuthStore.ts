import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserData } from '@/schemas/auth.schema';

/**
 * Defines the shape of the authentication store.
 * Uses 'readonly' for the user object to ensure state immutability.
 */
interface AuthStore {
  readonly user: UserData | null;
  setLogin: (data: UserData) => void;
  setLogout: () => void;
}

/**
 * Core Auth Store implementation with persistence.
 * 'persist' middleware automatically syncs the 'user' object with localStorage.
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,

      /**
       * Updates the store with validated user data upon successful login.
       */
      setLogin: (user) => set({ user }),

      /**
       * Clears user data from the store and localStorage, effectively logging them out.
       */
      setLogout: () => set({ user: null }),
    }),
    { 
      name: 'auth-storage', // Key used for localStorage
    }
  )
);

/**
 * CUSTOM SELECTORS (Derived State)
 * These hooks provide a way to access specific parts of the auth state 
 * without triggering unnecessary re-renders when unrelated properties change.
 */

/**
 * Evaluates whether a user session exists.
 * Returns a boolean derived from the presence of the user object.
 */
export const useIsAuthenticated = () => useAuthStore((state) => !!state.user);

/**
 * Safely extracts the current user's role (e.g., 'ADMIN' or 'USER').
 * Useful for Role-Based Access Control (RBAC) across the app.
 */
export const useUserRole = () => useAuthStore((state) => state.user?.role);