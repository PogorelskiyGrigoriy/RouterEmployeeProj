/**
 * @module AuthData
 * Модели данных для системы аутентификации и авторизации.
 */

/**
 * Данные, передаваемые пользователем при попытке входа.
 */
export type LoginData = {
    email: string;
    password: string;
}

export type UserRole = 'ADMIN' | 'USER';

export type UserData = {
    id: string;
    username: string;
    role: UserRole;
}