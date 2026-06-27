"use client";

import { usePriorityQueue } from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/Skeleton";
import { AlertCircle, ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export function PriorityQueue() {
  const { data: queue, isLoading } = usePriorityQueue();

  if (isLoading) {
    return (
      <div className="bg-dark border border-white/5 rounded-xl p-6 h-full">
        <Skeleton className="w-40 h-6 mb-6" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="w-full h-16 rounded-lg" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark border border-white/5 rounded-xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          Fix These First
        </h3>
        <span className="text-xs font-medium text-red-500 bg-red-500/10 px-2 py-1 rounded">
          {queue?.length || 0} Critical/High
        </span>
      </div>

      <div className="space-y-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {queue?.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm flex flex-col items-center">
            <ShieldAlert className="w-8 h-8 mb-2 opacity-50" />
            No priority items. Great job!
          </div>
        ) : (
          queue?.map((vuln) => (
            <Link key={vuln.id} href={`/dashboard/vulnerabilities/${vuln.id}`} className="block bg-jet border border-white/5 rounded-lg p-3 hover:border-white/10 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white text-sm group-hover:text-red-400 transition-colors line-clamp-1">{vuln.title}</h4>
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex-shrink-0 ml-2 ${
                  vuln.severity === 'Critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                }`}>
                  {vuln.severity} ({vuln.cvss})
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="text-gray-400">
                  <span className="text-gray-300 font-medium">{vuln.projectName}</span>
                </div>
                <div className="text-gray-500">
                  {formatDistanceToNow(new Date(vuln.discoveredAt), { addSuffix: true })}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
