import { ApiClient } from "./apiClient";
import { Project, Vulnerability, ActivityEvent, Recommendation, DashboardMetrics } from "@/lib/types";
import { mockDb, delay } from "@/lib/mock-db";

export class DashboardService {
  static async getMetrics(): Promise<DashboardMetrics> {
    await delay(600);
    return mockDb.metrics;
  }

  static async getRecentProjects(): Promise<Project[]> {
    await delay(800);
    return mockDb.projects.slice(0, 3);
  }

  static async getPriorityQueue(): Promise<Vulnerability[]> {
    await delay(900);
    return mockDb.vulnerabilities.filter(v => v.severity === 'Critical' || v.severity === 'High');
  }

  static async getActivityTimeline(): Promise<ActivityEvent[]> {
    await delay(700);
    return mockDb.activities;
  }

  static async getRecommendations(): Promise<Recommendation[]> {
    await delay(1000);
    return mockDb.recommendations;
  }
}
