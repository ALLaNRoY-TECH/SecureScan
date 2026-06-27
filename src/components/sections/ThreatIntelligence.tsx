"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ShieldAlert, Globe, Crosshair, Zap } from "lucide-react";

function Counter({ to, label, suffix = "" }: { to: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = to;
      if (start === end) return;
      const totalDuration = 2000;
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / totalDuration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, to]);

  return (
    <div ref={ref}>
      <div className="text-3xl font-bold text-white font-mono">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-500 mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export function ThreatIntelligence() {
  return (
    <section className="py-32 relative bg-jet overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6"
          >
            Global Threat <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald drop-shadow-[0_0_15px_rgba(0,255,136,0.3)]">Intelligence</span>
          </motion.h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Monitoring live cyber attacks across the globe. Our AI processes billions of signals daily to preemptively block threats before they reach your infrastructure.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {[
            { icon: <ShieldAlert className="text-red-500" />, label: "Active Threats", value: 14285 },
            { icon: <Globe className="text-blue-500" />, label: "Websites Protected", value: 102450 },
            { icon: <Crosshair className="text-orange-500" />, label: "Blocked Today", value: 3450912 },
            { icon: <Zap className="text-emerald-500" />, label: "AI Decisions", value: 8901235 },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <AnimatedCard className="p-6 bg-dark/40 backdrop-blur-md border border-white/10 h-full flex flex-col items-center text-center group">
                <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <Counter to={stat.value} label={stat.label} />
              </AnimatedCard>
            </motion.div>
          ))}
        </div>

        {/* Abstract Map Area */}
        <AnimatedCard className="w-full h-[500px] bg-dark/60 border border-white/10 p-0 overflow-hidden relative rounded-2xl shadow-2xl">
          <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="attack-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#00FF88" />
              </linearGradient>
            </defs>
            {Array.from({ length: 20 }).map((_, i) => {
              const startX = Math.random() * 1000;
              const startY = Math.random() * 500;
              const endX = Math.random() * 1000;
              const endY = Math.random() * 500;
              return (
                <motion.path
                  key={i}
                  d={`M ${startX} ${startY} Q ${(startX + endX)/2} ${Math.min(startY, endY) - 150} ${endX} ${endY}`}
                  fill="none"
                  stroke="url(#attack-gradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{
                    duration: Math.random() * 4 + 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 3
                  }}
                />
              );
            })}
          </svg>
          
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-white/20 font-mono text-xs text-center leading-loose">
               // GLOBAL_THREAT_MATRIX_ACTIVE
               <br />
               // ESTABLISHING_SECURE_UPLINK...
               <br />
               // MONITORING_ENDPOINTS
            </div>
          </div>
        </AnimatedCard>
      </div>
    </section>
  );
}
