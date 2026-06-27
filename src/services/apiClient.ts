import { mockDb, delay } from "@/lib/mock-db";

/**
 * Base API Client representing the Axios/Fetch layer.
 * Currently uses mockDb and artificial delays to simulate a real backend.
 * Replacing this with actual Axios calls later will instantly connect the entire app.
 */
export class ApiClient {
  static async get<T>(endpoint: string): Promise<T> {
    await delay(400 + Math.random() * 400); 
    
    if (endpoint === '/auth/me') return mockDb.currentUser as unknown as T;
    if (endpoint === '/projects') return mockDb.projects as unknown as T;
    
    throw new Error(`[Mock API] GET ${endpoint} not found`);
  }

  static async post<T>(endpoint: string, data: any): Promise<T> {
    await delay(600 + Math.random() * 500);
    console.log(`[Mock API] POST ${endpoint}`, data);
    return { success: true, data } as unknown as T;
  }
}
