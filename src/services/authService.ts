import { ApiClient } from "./apiClient";
import { AuthTokens, LoginCredentials, RegisterCredentials } from "@/types/auth";
import { User } from "@/lib/types";
import { delay, mockDb } from "@/lib/mock-db";

const TOKEN_KEY = "scurescan_auth_tokens";

export class AuthService {
  static getTokens(): AuthTokens | null {
    if (typeof window === 'undefined') return null;
    const tokens = localStorage.getItem(TOKEN_KEY);
    return tokens ? JSON.parse(tokens) : null;
  }

  static setTokens(tokens: AuthTokens) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  }

  static clearTokens() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
  }

  static async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    await delay(1200); // Simulate network latency

    if (credentials.email === "admin@example.com") {
      const tokens = { accessToken: "mock_access_token", refreshToken: "mock_refresh_token" };
      this.setTokens(tokens);
      return { user: mockDb.currentUser, tokens };
    }
    
    throw new Error("Invalid email or password");
  }

  static async register(credentials: RegisterCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    await delay(1500); // Simulate processing
    if (credentials.email === "admin@example.com") {
      throw new Error("Email already exists");
    }
    
    const newUser: User = {
      id: `u_${Math.random().toString(36).substr(2, 9)}`,
      name: credentials.name,
      email: credentials.email,
      avatar: credentials.name.substring(0, 2).toUpperCase(),
      role: 'user',
      workspaceId: `w_${Math.random().toString(36).substr(2, 9)}`
    };
    
    const tokens = { accessToken: "mock_access_token_new", refreshToken: "mock_refresh_token_new" };
    this.setTokens(tokens);
    return { user: newUser, tokens };
  }

  static async signInWithGoogle(): Promise<{ user: User; tokens: AuthTokens }> {
    await delay(1000);
    const tokens = { accessToken: "mock_google_access", refreshToken: "mock_google_refresh" };
    this.setTokens(tokens);
    return { user: mockDb.currentUser, tokens };
  }

  static async logout(): Promise<void> {
    await delay(500);
    this.clearTokens();
  }

  static async getCurrentUser(): Promise<User | null> {
    const tokens = this.getTokens();
    if (!tokens) return null;
    
    try {
      // In a real app, this would use the accessToken in the Authorization header
      return await ApiClient.get<User>('/auth/me');
    } catch (err) {
      this.clearTokens();
      return null;
    }
  }
}
