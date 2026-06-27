"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Shield, FileText, Settings, Users, Activity, CheckCircle2 } from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "scans", label: "Scan Results", icon: Shield },
  { id: "threats", label: "Threat Intel", icon: Activity },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "team", label: "Team Access", icon: Users },
];

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const activeContent = tabs.find(t => t.id === activeTab);

  const renderMockUI = (id: string) => {
    switch(id) {
      case "dashboard":
        return (
          <div className="grid grid-cols-3 gap-4 h-full">
            <div className="col-span-2 bg-jet/50 rounded border border-white/5 p-4 flex flex-col gap-4">
               <div className="w-1/3 h-4 bg-white/10 rounded"></div>
               <div className="w-full flex-grow bg-white/5 rounded"></div>
            </div>
            <div className="col-span-1 flex flex-col gap-4">
              <div className="h-1/3 bg-jet/50 rounded border border-white/5 p-4 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-neon/50 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                  <span className="text-white font-bold">92%</span>
                </div>
              </div>
              <div className="flex-grow bg-jet/50 rounded border border-white/5 p-4 flex flex-col gap-3">
                <div className="w-1/2 h-3 bg-white/10 rounded mb-2"></div>
                {[1,2,3].map(i => <div key={i} className="w-full h-8 bg-white/5 rounded"></div>)}
              </div>
            </div>
          </div>
        );
      case "scans":
         return (
           <div className="flex flex-col gap-4 h-full">
             <div className="w-1/4 h-6 bg-white/10 rounded mb-2"></div>
             {[1,2,3,4].map(i => (
               <div key={i} className="w-full h-12 bg-jet/50 rounded border border-white/5 flex items-center px-4 justify-between">
                 <div className="w-1/3 h-3 bg-white/10 rounded"></div>
                 <div className="w-16 h-5 bg-red-500/20 rounded border border-red-500/30"></div>
                 <div className="w-8 h-4 bg-white/5 rounded"></div>
               </div>
             ))}
           </div>
         );
      default:
         return (
           <div className="flex items-center justify-center h-full text-gray-500 flex-col gap-4">
             {activeContent && <activeContent.icon className="w-12 h-12 text-gray-700" />}
             <div className="w-1/4 h-4 bg-white/5 rounded"></div>
           </div>
         );
    }
  };

  return (
    <section className="py-32 relative bg-jet border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            A Complete <span className="text-neon">Platform</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything your security team needs, unified in one incredibly fast, intuitive interface.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl text-left transition-all whitespace-nowrap lg:whitespace-normal ${isActive ? 'bg-dark border border-neon/50 text-white shadow-[0_0_15px_rgba(0,255,136,0.1)]' : 'bg-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-neon' : ''}`} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="lg:w-3/4">
            <AnimatedCard className="w-full aspect-[16/10] bg-dark p-2 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="absolute top-3 left-4 flex gap-1.5 z-20">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              
              <div className="w-full h-full bg-[#0a0a0a] rounded-xl border border-white/5 mt-6 p-6 overflow-hidden relative shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                  >
                    {renderMockUI(activeTab)}
                  </motion.div>
                </AnimatePresence>
                
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none mix-blend-overlay"></div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  );
}
