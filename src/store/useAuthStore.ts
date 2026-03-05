// src\store\useAuthStore.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserData } from '@/models/AuthData'

interface AuthState {
  user: UserData | null
  isAuthenticated: boolean
  // Действия
  setLogin: (data: UserData) => void
  setLogout: () => void
}

export const useAuthStore = create<AuthState>()(
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
      name: 'auth-storage', // Ключ в localStorage
    }
  )
)