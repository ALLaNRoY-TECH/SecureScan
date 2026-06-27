import { MetricCards } from "@/components/dashboard/MetricCards";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { PriorityQueue } from "@/components/dashboard/PriorityQueue";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { SecurityRecommendations } from "@/components/dashboard/SecurityRecommendations";
import { Button } from "@/components/ui/Button";
import { Plus, ScanLine } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Security Operations Center</h1>
          <p className="text-gray-400 mt-1">Here is the current security posture of your workspace.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <ScanLine className="w-4 h-4 text-neon" /> Quick Scan
          </Button>
          <Link href="/dashboard/projects/new">
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" /> New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row (Full width) */}
      <MetricCards />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="h-[400px]">
            <RecentProjects />
          </div>
          
          <div className="h-[400px]">
            <PriorityQueue />
          </div>
        </div>

        {/* Right Column (Narrower) */}
        <div className="flex flex-col gap-6">
          <div className="h-[400px]">
            <SecurityRecommendations />
          </div>
          
          <div className="h-[400px]">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
