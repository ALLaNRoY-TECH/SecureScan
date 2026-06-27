"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Loader2, Cpu, Activity, Terminal as TerminalIcon, ShieldAlert, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

export function InteractiveDemo() {
  const [url, setUrl] = useState("");
  const [scanState, setScanState] = useState<"idle" | "validating" | "scanning" | "analyzing" | "results">("idle");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || scanState !== "idle") return;
    
    setScanState("validating");
    setProgress(0);
    setLogs(["[SYSTEM] Validating URL format..."]);

    setTimeout(() => {
      setScanState("scanning");
      let currentProgress = 0;
      
      const logSequence = [
        "[DNS] Resolving target IP...",
        "[PORT] Scanning open ports...",
        "[SSL] Verifying certificate chain...",
        "[HTTP] Analyzing response headers...",
        "[CRAWL] Spidering endpoints...",
        "[WAF] Testing firewall rules...",
        "[INJECT] Fuzzing input fields...",
        "[SQLI] Testing database boundaries...",
        "[XSS] Checking for reflected scripts...",
      ];

      let logIdx = 0;
      const scanInterval = setInterval(() => {
        currentProgress += Math.random() * 5 + 2;
        if (currentProgress > 85) currentProgress = 85; 
        setProgress(Math.floor(currentProgress));
        
        if (logIdx < logSequence.length && Math.random() > 0.3) {
          setLogs(prev => [...prev.slice(-4), logSequence[logIdx]]);
          logIdx++;
        }
      }, 300);

      setTimeout(() => {
        clearInterval(scanInterval);
        setScanState("analyzing");
        setLogs(prev => [...prev.slice(-4), "[AI] Processing scan data...", "[AI] Generating remediation steps..."]);
        
        let aiProgress = 85;
        const aiInterval = setInterval(() => {
          aiProgress += 2;
          if (aiProgress >= 100) {
            clearInterval(aiInterval);
            setProgress(100);
            setTimeout(() => setScanState("results"), 800);
          } else {
            setProgress(aiProgress);
          }
        }, 100);

      }, 4500);

    }, 1000);
  };

  const reset = () => {
    setScanState("idle");
    setUrl("");
    setProgress(0);
    setLogs([]);
  };

  return (
    <section className="py-32 relative overflow-hidden bg-jet border-y border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-neon/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Experience <span className="text-neon">Enterprise Security</span>
          </motion.h2>
          <p className="text-gray-400 text-lg">
            Enter a URL below to initiate a live simulation of our advanced autonomous scanning engine.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatedCard className="p-3 mb-8 bg-dark/80 backdrop-blur-xl border-white/10 shadow-2xl relative z-20">
            <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-4 relative">
              <div className="relative flex-grow">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="url"
                  placeholder="https://your-application.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={scanState !== "idle"}
                  required
                  className="w-full bg-jet border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all interactive disabled:opacity-50"
                />
              </div>
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                disabled={scanState !== "idle"}
                className="whitespace-nowrap"
              >
                {scanState === "idle" ? (
                  <>Run Security Scan <ArrowRight className="w-5 h-5" /></>
                ) : (
                  <>System Active <Loader2 className="w-5 h-5 animate-spin" /></>
                )}
              </Button>
            </form>
          </AnimatedCard>

          <AnimatePresence mode="wait">
            {(scanState === "validating" || scanState === "scanning" || scanState === "analyzing") && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, scale: 0.95, height: 0 }}
                className="bg-dark/60 border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto backdrop-blur-md shadow-2xl overflow-hidden"
              >
                <div className="flex flex-col items-center mb-8">
                  <div className="relative w-32 h-32 mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="60" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                      <motion.circle 
                        cx="64" cy="64" r="60" 
                        stroke="#00FF88" 
                        strokeWidth="8" 
                        fill="none" 
                        strokeDasharray={377}
                        animate={{ strokeDashoffset: 377 - (377 * progress) / 100 }}
                        transition={{ ease: "linear", duration: 0.2 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold text-white font-mono">{progress}%</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    {scanState === "analyzing" ? <Cpu className="text-neon animate-pulse" /> : <Activity className="text-neon animate-pulse" />}
                    {scanState === "validating" ? "Validating Target..." : scanState === "scanning" ? "Active Scanning Phase..." : "AI Intelligence Processing..."}
                  </h3>
                </div>

                <div className="bg-jet rounded-lg border border-white/5 p-4 font-mono text-sm h-32 overflow-hidden flex flex-col justify-end relative shadow-inner">
                  <div className="absolute top-2 right-2 text-gray-600"><TerminalIcon className="w-4 h-4" /></div>
                  <AnimatePresence>
                    {logs.map((log, i) => (
                      <motion.div 
                        key={log + i} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={log.includes("[AI]") ? "text-emerald-400 font-bold" : "text-gray-400"}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {scanState === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-dark/60 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto backdrop-blur-md shadow-2xl"
              >
                <div className="flex justify-between items-start mb-8 pb-8 border-b border-white/10">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Scan Report: {url}</h3>
                    <p className="text-gray-400">Completed in 6.3 seconds using AI Engine v2.4</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-500 uppercase tracking-widest mb-1">Security Score</span>
                    <span className="text-5xl font-bold text-orange-500 font-mono">68<span className="text-xl text-gray-500">/100</span></span>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-white font-semibold flex items-center gap-2 mb-4"><Cpu className="w-5 h-5 text-neon" /> AI Executive Summary</h4>
                  <div className="p-5 bg-neon/5 border border-neon/20 rounded-lg text-gray-300 leading-relaxed text-sm md:text-base">
                    Our AI has detected multiple security misconfigurations and one critical injection vulnerability. The target is vulnerable to reflected Cross-Site Scripting which could lead to session hijacking. Immediate remediation is required for production deployment.
                  </div>
                </div>

                <h4 className="text-white font-semibold mb-4">Discovered Vulnerabilities</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                    className="bg-dark/80 border border-red-500/30 rounded-xl p-5 shadow-[0_0_20px_rgba(239,68,68,0.05)]"
                  >
                    <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5" /> Reflected XSS
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">Detected in search parameter. Allows execution of arbitrary JavaScript.</p>
                    <div className="text-xs bg-red-500/10 text-red-400 p-2 rounded border border-red-500/20 font-mono">Status: Critical Risk (CVSS 8.5)</div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                    className="bg-dark/80 border border-yellow-500/30 rounded-xl p-5 shadow-[0_0_20px_rgba(234,179,8,0.05)]"
                  >
                    <h4 className="text-yellow-500 font-bold mb-2 flex items-center gap-2">
                      <Lock className="w-5 h-5" /> Missing HSTS
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">Strict-Transport-Security header is absent, allowing downgrade attacks.</p>
                    <div className="text-xs bg-yellow-500/10 text-yellow-400 p-2 rounded border border-yellow-500/20 font-mono">Status: Medium Risk (CVSS 4.2)</div>
                  </motion.div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Button variant="outline" onClick={reset}>Scan Another Target</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
