"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Shield, Activity, Globe } from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

const Terminal = () => {
  const lines = [
    "Initializing Secure Scan...",
    "Detecting Technologies...",
    "Running AI Analysis...",
    "Checking HTTP Headers...",
    "Bypassing WAF rules...",
    "Analyzing endpoints...",
    "Scan Completed. 3 Vulnerabilities found.",
  ];
  
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) {
      const timeout = setTimeout(() => {
        setIsTyping(true);
        setDisplayedText("");
        setCurrentLine((prev) => (prev + 1) % lines.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    const line = lines[currentLine];
    if (displayedText.length < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(line.slice(0, displayedText.length + 1));
      }, Math.random() * 50 + 20);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [displayedText, currentLine, isTyping, lines]);

  return (
    <div className="bg-jet border border-white/10 rounded-lg p-4 font-mono text-sm text-neon/80 h-56 w-full overflow-hidden relative shadow-[0_0_30px_rgba(0,255,136,0.1)]">
      <div className="flex gap-2 mb-4 pb-2 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
      </div>
      <div className="flex flex-col gap-1">
        {lines.slice(0, currentLine).map((l, i) => (
          <div key={i} className="opacity-50">{"> " + l}</div>
        ))}
        <div className="flex items-center">
          <span className="mr-2">{">"}</span>
          <span>{displayedText}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-neon ml-1 block"
          />
        </div>
      </div>
    </div>
  );
};

const NetworkBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FF8810_1px,transparent_1px),linear-gradient(to_bottom,#00FF8810_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-neon rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 1, 0.2],
            boxShadow: ["0 0 0px #00FF88", "0 0 15px #00FF88", "0 0 0px #00FF88"]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      <NetworkBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon/10 border border-neon/20 text-neon text-sm font-medium mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              ScureScan Engine v2.0 Live
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Find Security <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald drop-shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                Vulnerabilities
              </span><br />
              Before Hackers Do.
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-xl">
              The next-generation autonomous cybersecurity platform. Detect threats, analyze risks, and secure your applications with military-grade AI.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">Start Free Scan</Button>
              <Button variant="secondary" size="lg">View Demo</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative h-[500px] flex items-center justify-center"
          >
            {/* Central Terminal */}
            <div className="relative z-20 w-full max-w-md mx-auto">
              <Terminal />
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-10 -left-4 md:-left-12 z-30"
            >
              <AnimatedCard className="p-4 flex items-center gap-4 min-w-[200px] bg-jet/80 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Threats Blocked</div>
                  <div className="text-lg font-bold text-white">124,592</div>
                </div>
              </AnimatedCard>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 -right-4 md:-right-8 z-30"
            >
              <AnimatedCard className="p-4 flex items-center gap-4 min-w-[180px] bg-jet/80 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Security Score</div>
                  <div className="text-lg font-bold text-emerald-500">A+ 98/100</div>
                </div>
              </AnimatedCard>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-10 left-4 md:left-12 z-30"
            >
              <AnimatedCard className="p-4 flex items-center gap-4 min-w-[200px] bg-jet/80 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Protected Sites</div>
                  <div className="text-lg font-bold text-white">10,240+</div>
                </div>
              </AnimatedCard>
            </motion.div>
            
            {/* Background Map glow placeholder */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.1)_0%,transparent_70%)] rounded-full blur-2xl" />

          </motion.div>
        </div>
      </div>
    </section>
  );
}
