"use client";

import { useRecommendations } from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Lightbulb, Wrench, ChevronRight } from "lucide-react";
import Link from "next/link";

export function SecurityRecommendations() {
  const { data: recommendations, isLoading } = useRecommendations();

  if (isLoading) {
    return (
      <div className="bg-dark border border-white/5 rounded-xl p-6 h-full">
        <Skeleton className="w-48 h-6 mb-6" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="w-full h-24 rounded-lg" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark border border-white/5 rounded-xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          AI Recommendations
        </h3>
      </div>

      <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {recommendations?.map((rec) => (
          <div key={rec.id} className="bg-jet border border-white/5 rounded-lg p-4 hover:border-white/10 transition-all group">
            <h4 className="font-semibold text-white text-sm mb-2 group-hover:text-neon transition-colors">{rec.title}</h4>
            <p className="text-xs text-gray-400 mb-3 line-clamp-2">{rec.description}</p>
            
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
              <div className="flex gap-3">
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-medium text-gray-500">
                  <span className={`w-1.5 h-1.5 rounded-full ${rec.impact === 'High' ? 'bg-red-500' : rec.impact === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}></span>
                  Impact: {rec.impact}
                </div>
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-medium text-gray-500">
                  <Wrench className="w-3 h-3" />
                  Effort: {rec.effort}
                </div>
              </div>
              <Link href={`/dashboard/recommendations/${rec.id}`} className="text-neon opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
