"use client";

import { useRecentProjects } from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/Skeleton";
import { FolderOpen, ArrowRight, Server } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export function RecentProjects() {
  const { data: projects, isLoading } = useRecentProjects();

  if (isLoading) {
    return (
      <div className="bg-dark border border-white/5 rounded-xl p-6 h-full">
        <Skeleton className="w-32 h-6 mb-6" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="w-full h-20 rounded-lg" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark border border-white/5 rounded-xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-neon" />
          Recent Projects
        </h3>
        <Link href="/dashboard/projects" className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-3 flex-grow">
        {projects?.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">No projects found.</div>
        ) : (
          projects?.map((project) => (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`} className="block bg-jet border border-white/5 rounded-lg p-4 hover:border-white/10 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-white group-hover:text-neon transition-colors">{project.name}</h4>
                  <p className="text-xs text-gray-500">{project.url}</p>
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded ${
                  project.riskLevel === 'Critical' ? 'bg-red-500/10 text-red-500' :
                  project.riskLevel === 'High' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-green-500/10 text-neon'
                }`}>
                  Score: {project.securityScore}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-4">
                <div className="flex items-center gap-1">
                  <Server className="w-3 h-3" /> {project.techStack.length} Tech
                </div>
                <div>
                  {project.openFindings} findings
                </div>
                <div>
                  Last scan: {formatDistanceToNow(new Date(project.lastScanDate), { addSuffix: true })}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
