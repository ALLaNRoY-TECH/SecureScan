"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "@/services/dashboardService";

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: () => DashboardService.getMetrics(),
  });
}

export function useRecentProjects() {
  return useQuery({
    queryKey: ["dashboard", "projects", "recent"],
    queryFn: () => DashboardService.getRecentProjects(),
  });
}

export function usePriorityQueue() {
  return useQuery({
    queryKey: ["dashboard", "vulnerabilities", "priority"],
    queryFn: () => DashboardService.getPriorityQueue(),
  });
}

export function useActivityTimeline() {
  return useQuery({
    queryKey: ["dashboard", "activity"],
    queryFn: () => DashboardService.getActivityTimeline(),
  });
}

export function useRecommendations() {
  return useQuery({
    queryKey: ["dashboard", "recommendations"],
    queryFn: () => DashboardService.getRecommendations(),
  });
}
