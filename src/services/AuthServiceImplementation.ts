/**
 * @module AuthServiceImplementation
 * Mock implementation of AuthService for development and testing.
 */

import type { LoginData, UserData, UserRole } from "@/schemas/auth.schema";
import type { AuthService } from "./AuthService";

/**
 * Internal interface for the mock database.
 * Includes password field which is never exposed to the UI.
 */
interface DummyUser extends Omit<UserData, 'id'> {
  readonly password: string;
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

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * Stub service that simulates network latency and basic validation.
 */
class AuthServiceDummy implements AuthService {
  /**
   * Simulates an API call to authenticate a user.
   */
  async login({ email, password }: LoginData): Promise<UserData> {
    await delay(1000);

    const foundUser = DUMMY_LOGIN_USERS[email];

    if (!foundUser || foundUser.password !== password) {
      // In real scenarios, use AxiosError or custom Error classes
      throw new Error("Invalid email or password");
    }

    return {
      id: crypto.randomUUID(),
      username: foundUser.username,
      role: foundUser.role as UserRole
    };
  }

  /**
   * Simulates session termination.
   */
  async logout(): Promise<void> {
    await delay(500);
  }
}

export const authService: AuthService = new AuthServiceDummy();