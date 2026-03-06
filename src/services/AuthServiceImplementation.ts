/**
 * @module AuthServiceImplementation
 * Реализация сервиса авторизации с использованием заглушки (Stub).
 */

import type { LoginData, UserData, UserRole } from "../models/AuthData";
import type AuthService from "./AuthService";

/** Локальный интерфейс для хранения пароля в нашей базе-заглушке */
interface DummyUser extends Omit<UserData, 'id'> {
    password: string;
}

const DUMMY_LOGIN_USERS: Record<string, DummyUser> = {
    "user@tel-ran.com": {
        username: "Standard User",
        password: "user1234",
        role: "USER"
    },
    "admin@tel-ran.com": {
        username: "Administrator",
        password: "admin1234",
        role: "ADMIN"
    }
};

/**
 * Имитация задержки ответа сервера.
 * @param ms - количество миллисекунд задержки.
 */
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

class AuthServiceDummy implements AuthService {
    /**
     * Имитирует запрос к API для входа пользователя.
     */
    async login(loginData: LoginData): Promise<UserData> {
        // 1. Имитируем ожидание ответа от сервера (1 секунда)
        await delay(1000);

        const foundUser = DUMMY_LOGIN_USERS[loginData.email];

        // 2. Проверяем наличие пользователя и корректность пароля
        if (!foundUser || foundUser.password !== loginData.password) {
            throw new Error("Invalid email or password");
        }

        // 3. Возвращаем данные пользователя в формате UserData (сгенерировав ID)
        return {
            id: crypto.randomUUID(), // Генерация временного ID
            username: foundUser.username,
            role: foundUser.role as UserRole
        };
    }

    /**
     * Имитирует завершение сессии.
     */
    async logout(): Promise<void> {
        await delay(500);
        return Promise.resolve();
    }
}

const authService = new AuthServiceDummy();
export default authService;