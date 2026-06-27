"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Target } from "lucide-react";

const timelineData = [
  { day: 'Mon', threats: 12, blocked: 45 },
  { day: 'Tue', threats: 19, blocked: 82 },
  { day: 'Wed', threats: 15, blocked: 61 },
  { day: 'Thu', threats: 8, blocked: 34 },
  { day: 'Fri', threats: 22, blocked: 94 },
  { day: 'Sat', threats: 30, blocked: 124 },
  { day: 'Sun', threats: 14, blocked: 56 },
];

export function DashboardPreview() {
  return (
    <section id="dashboard" className="py-32 relative overflow-hidden bg-jet">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              SOC <span className="text-neon">Command Center</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Experience the power of an enterprise-grade Security Operations Center. Monitor MITRE ATT&CK vectors, live activity, and AI-driven risk heatmaps.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl border border-white/10 bg-dark/60 backdrop-blur-xl p-6 md:p-8 shadow-2xl flex flex-col gap-6"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Target className="text-neon" /> global-prod-cluster
              </h3>
              <p className="text-gray-400 text-sm ml-9">Continuous Monitoring Active</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-jet border border-neon/30 px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(0,255,136,0.1)]">
                <span className="text-2xl font-bold text-neon font-mono">94</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest leading-tight">Security<br/>Score</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chart: Threat Volume (Area Chart) */}
            <div className="bg-jet rounded-xl p-6 border border-white/5 lg:col-span-2 interactive hover:border-white/10 transition-colors shadow-inner">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-white font-medium">Threat Volume vs Blocked Events</h4>
                <div className="flex gap-4 text-xs">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-neon" /> Blocked</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> Threats</span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00FF88" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="day" stroke="#666" tick={{ fill: '#666' }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#666" tick={{ fill: '#666' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#181818', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="blocked" stroke="#00FF88" fillOpacity={1} fill="url(#colorBlocked)" strokeWidth={2} />
                    <Area type="monotone" dataKey="threats" stroke="#ef4444" fillOpacity={1} fill="url(#colorThreats)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* MITRE ATT&CK Mapping */}
            <div className="bg-jet rounded-xl p-6 border border-white/5 flex flex-col interactive hover:border-white/10 transition-colors shadow-inner">
              <h4 className="text-white font-medium mb-4">MITRE ATT&CK Mapping</h4>
              <div className="flex flex-col gap-3 flex-grow">
                {[
                  { tactic: "Initial Access", technique: "Exploit Public-Facing App", count: 4, severity: "High" },
                  { tactic: "Execution", technique: "Command and Scripting", count: 2, severity: "Critical" },
                  { tactic: "Credential Access", technique: "Brute Force", count: 18, severity: "Low" },
                  { tactic: "Defense Evasion", technique: "Obfuscated Files", count: 1, severity: "Medium" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-1 p-3 bg-dark rounded border border-white/5 transition-colors hover:bg-white/5">
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-white">{item.tactic}</span>
                      <span className={`text-xs px-2 rounded-full flex items-center font-mono ${
                        item.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        item.severity === 'High' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                        item.severity === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>{item.severity}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{item.technique}</span>
                      <span>{item.count} events</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Activity Feed */}
            <div className="bg-jet rounded-xl p-6 border border-white/5 lg:col-span-3 shadow-inner">
              <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-neon" /> Live Activity Feed
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  { time: "Just now", msg: "AI Engine blocked automated SQLi attempt from 192.168.1.104", type: "success" },
                  { time: "2 min ago", msg: "New CVE-2024-1234 signature added to scanning heuristics", type: "info" },
                  { time: "15 min ago", msg: "Suspicious login behavior detected on /admin (12 attempts)", type: "warning" },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded hover:bg-white/5 transition-colors border-l-2 bg-dark/50" style={{ borderLeftColor: log.type === 'success' ? '#00FF88' : log.type === 'warning' ? '#eab308' : '#3b82f6' }}>
                    <div className="text-xs text-gray-500 w-16 flex-shrink-0 font-mono">{log.time}</div>
                    <div className="text-sm text-gray-300">{log.msg}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
