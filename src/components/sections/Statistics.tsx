"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { AnimatedCard } from "@/components/ui/AnimatedCard";

const radarData = [
  { subject: 'SQLi', A: 120, fullMark: 150 },
  { subject: 'XSS', A: 98, fullMark: 150 },
  { subject: 'CSRF', A: 86, fullMark: 150 },
  { subject: 'Auth', A: 99, fullMark: 150 },
  { subject: 'Logic', A: 85, fullMark: 150 },
  { subject: 'Config', A: 110, fullMark: 150 },
];

function Counter({ from, to, duration = 2, label, suffix = "" }: { from: number, to: number, duration?: number, label: string, suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, from, to, duration]);

  return (
    <div ref={ref} className="text-left md:text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-neon text-sm uppercase tracking-widest font-medium">{label}</div>
    </div>
  );
}

export function Statistics() {
  return (
    <section className="py-24 relative bg-jet border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Proven <span className="text-neon">Performance</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              Our autonomous scanning engine has processed millions of requests, uncovering critical vulnerabilities across thousands of applications.
            </p>
            
            <div className="grid grid-cols-2 gap-8 md:gap-12">
              <Counter from={0} to={10240} label="Scans Completed" suffix="+" />
              <Counter from={0} to={98} label="Accuracy Rate" suffix="%" />
              <Counter from={0} to={500} label="Enterprise Clients" suffix="+" />
              <Counter from={0} to={142} label="Zero-Days Found" suffix="" />
            </div>
          </div>

          <AnimatedCard className="h-[400px] bg-dark/50 p-6 flex flex-col justify-center items-center">
            <h3 className="text-white text-lg font-medium mb-6 text-center">Threat Detection Vectors</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="ScureScan" dataKey="A" stroke="#00FF88" fill="#00FF88" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </AnimatedCard>

        </div>
      </div>
    </section>
  );
}
