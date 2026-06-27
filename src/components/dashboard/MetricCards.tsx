"use client";

import { useDashboardMetrics } from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/Skeleton";
import { ShieldCheck, ShieldAlert, AlertTriangle, Layers, Activity, FileText } from "lucide-react";

export function MetricCards() {
  const { data: metrics, isLoading } = useDashboardMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-dark border border-white/5 p-4 rounded-xl">
            <Skeleton className="w-8 h-8 rounded-lg mb-4" />
            <Skeleton className="w-16 h-8 mb-2" />
            <Skeleton className="w-24 h-4" />
          </div>
        ))}
      </div>
    );
  }

  if (!metrics) return null;

  const cards = [
    { title: "Security Score", value: `${metrics.overallScore}/100`, icon: ShieldCheck, color: "text-neon", bg: "bg-neon/10" },
    { title: "Critical Vulns", value: metrics.criticalVulnerabilities, icon: ShieldAlert, color: "text-red-500", bg: "bg-red-500/10" },
    { title: "High Risk", value: metrics.highRiskFindings, icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { title: "Protected Assets", value: metrics.protectedProjects, icon: Layers, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Scans (7d)", value: metrics.scansThisWeek, icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Reports", value: metrics.reportsGenerated, icon: FileText, color: "text-gray-300", bg: "bg-white/5" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-dark border border-white/5 p-4 rounded-xl flex flex-col hover:border-white/10 transition-colors group cursor-default">
          <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <card.icon className={`w-4 h-4 ${card.color}`} />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{card.value}</div>
          <div className="text-xs text-gray-500 font-medium">{card.title}</div>
        </div>
      ))}
    </div>
  );
}
