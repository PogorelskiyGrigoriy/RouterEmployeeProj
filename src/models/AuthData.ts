/**
 * @module AuthData
 * Core data models for Authentication and Authorization systems.
 */

/**
 * Credentials provided by the user during the login process.
 */
export interface LoginData {
  readonly email: string;
  readonly password: string;
}

/**
 * Valid system roles for Access Control Lists (ACL).
 */
export type UserRole = 'ADMIN' | 'USER';

/**
 * Profile data for a successfully authenticated user.
 */
export interface UserData {
  readonly id: string;
  readonly username: string;
  readonly role: UserRole;
}

/**
 * Extended state for the Authentication Store.
 */
export interface AuthState {
  readonly user: UserData | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
}