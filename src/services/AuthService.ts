/**
 * @module AuthService
 * Abstract interface for authentication provider.
 */

import type { LoginData, UserData } from "@/models/AuthData";

/**
 * Defines mandatory methods for authentication logic.
 * Supports both Mock and Real API implementations.
 */
export interface AuthService {
  /**
   * Validates user credentials.
   * @param credentials - Login and password payload.
   * @returns User profile data on success.
   */
  login(credentials: LoginData): Promise<UserData>;

  /**
   * Terminates the current session.
   */
  logout(): Promise<void>;

  /**
   * [Optional but recommended] 
   * Validates the existing session token on app initialization.
   */
  getCurrentUser?(): Promise<UserData | null>;
}