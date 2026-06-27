"use client";

import { useActivityTimeline } from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Activity, ShieldAlert, CheckCircle2, FileText, PlusCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function ActivityFeed() {
  const { data: activities, isLoading } = useActivityTimeline();

  if (isLoading) {
    return (
      <div className="bg-dark border border-white/5 rounded-xl p-6 h-full">
        <Skeleton className="w-32 h-6 mb-6" />
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
              <div className="flex-grow"><Skeleton className="w-full h-12" /></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'vuln_found': return <ShieldAlert className="w-4 h-4 text-red-500" />;
      case 'scan_completed': return <CheckCircle2 className="w-4 h-4 text-neon" />;
      case 'report_generated': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'project_created': return <PlusCircle className="w-4 h-4 text-purple-500" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-dark border border-white/5 rounded-xl p-6 h-full flex flex-col">
      <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-gray-400" />
        Activity Feed
      </h3>

      <div className="relative pl-4 border-l border-white/10 space-y-6">
        {activities?.map((activity) => (
          <div key={activity.id} className="relative">
            <div className="absolute -left-[25px] bg-jet p-1 border border-white/10 rounded-full z-10">
              {getIcon(activity.type)}
            </div>
            <div className="pl-2">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-medium text-gray-200">{activity.title}</h4>
                <span className="text-[10px] text-gray-500 flex-shrink-0 ml-2">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
