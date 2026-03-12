/**
 * @module useAuthStore
 * Global state management for user authentication using Zustand.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserData } from '@/schemas/auth.schema';

/**
 * State and Actions for Auth Store.
 */
interface AuthStore {
  readonly user: UserData | null;
  readonly isAuthenticated: boolean;
  
  /** Updates state on successful login */
  setLogin: (data: UserData) => void;
  /** Clears state on logout */
  setLogout: () => void;
}

/**
 * Hook to access and manipulate authentication state.
 * Persists data to localStorage automatically via 'auth-storage' key.
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setLogin: (data) => set({ 
        user: data, 
        isAuthenticated: true 
      }),

      setLogout: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'auth-storage', // Key used in localStorage
    }
  )
);