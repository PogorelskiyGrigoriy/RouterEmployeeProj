/**
 * @module AuthService
 * Интерфейс для сервиса аутентификации.
 */

import type { LoginData, UserData } from "../models/AuthData";

/**
 * Описывает обязательные методы для любого сервиса авторизации (Stub или Real API).
 */
export default interface AuthService {
    /**
     * Выполняет проверку учетных данных пользователя.
     * @param loginData - Объект с email и паролем.
     * @returns {Promise<UserData>} - Данные пользователя при успешном входе.
     * @throws {AxiosError} - Ошибка при неверных данных.
     */
    login(loginData: LoginData): Promise<UserData>;

    /**
     * Выполняет выход пользователя из системы.
     */
    logout(): Promise<void>;
}