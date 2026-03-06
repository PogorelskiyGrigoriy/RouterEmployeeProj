/**
 * @module useAuthStore
 * Управление глобальным состоянием авторизации пользователя.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserData } from '@/models/AuthData';

/**
 * Интерфейс хранилища авторизации.
 */
interface AuthState {
    /** Данные авторизованного пользователя или null, если вход не выполнен */
    user: UserData | null;
    /** Флаг, указывающий, авторизован ли пользователь в данный момент */
    isAuthenticated: boolean;
    
    /** * Устанавливает данные пользователя в состояние при успешном входе.
     * @param data - Объект данных пользователя, полученный от сервиса авторизации.
     */
    setLogin: (data: UserData) => void;
    
    /** * Сбрасывает состояние авторизации и очищает данные пользователя (Log out).
     */
    setLogout: () => void;
}

/**
 * Хук для доступа к состоянию авторизации.
 * Использует localStorage для сохранения состояния между сессиями браузера.
 */
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
            name: 'auth-storage', // Уникальный ключ в localStorage
        }
    )
);