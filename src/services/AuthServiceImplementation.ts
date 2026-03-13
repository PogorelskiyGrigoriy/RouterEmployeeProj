import { userDataSchema, type LoginData, type UserData } from "@/schemas/auth.schema";
import type { AuthService } from "./AuthService";

/**
 * Extends UserData for the mock database to include credentials.
 */
type MockUser = UserData & { password: string };

/**
 * Local database for development and testing purposes.
 */
const DUMMY_LOGIN_USERS: Record<string, MockUser> = {
  "admin@tel-ran.com": {
    id: crypto.randomUUID(),
    username: "Administrator",
    password: "admin1234",
    role: "ADMIN"
  },
  "user@tel-ran.com": {
    id: crypto.randomUUID(),
    username: "User",
    password: "user1234",
    role: "USER"
  }
};

/**
 * Utility to simulate network latency.
 */
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * Mock implementation of AuthService.
 * Simulates real API behavior with validation and delays.
 */
class AuthServiceDummy implements AuthService {
  /**
   * Simulates a login request.
   * Validates credentials against the mock DB and parses result via Zod.
   */
  async login({ email, password }: LoginData): Promise<UserData> {
    await delay(1000);
    const foundUser = DUMMY_LOGIN_USERS[email];

    if (!foundUser || foundUser.password !== password) {
      throw new Error("Invalid email or password");
    }

    /**
     * Runtime validation: Ensures the returned data strictly matches UserData schema
     * before it reaches the store or UI.
     */
    return userDataSchema.parse(foundUser);
  }

  /**
   * Simulates a logout request with a brief delay.
   */
  async logout(): Promise<void> {
    await delay(500);
  }
}

/**
 * Singleton instance of the auth service.
 */
export const authService: AuthService = new AuthServiceDummy();