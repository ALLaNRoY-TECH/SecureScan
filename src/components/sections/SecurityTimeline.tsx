"use client";

import { motion } from "framer-motion";
import { Globe, Search, Shield, Zap, Lock, Cpu, Server, FileText } from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

const timelineStages = [
  { icon: Globe, title: "Website Submitted", desc: "Target domain is entered into the system." },
  { icon: Server, title: "DNS & Tech Stack Resolution", desc: "Resolving IPs and fingerprinting the underlying technology stack." },
  { icon: Search, title: "Intelligent Crawling", desc: "Mapping all endpoints, forms, and hidden parameters." },
  { icon: Lock, title: "Header Analysis", desc: "Evaluating SSL/TLS, HSTS, and CSP configurations." },
  { icon: Zap, title: "Active Vulnerability Fuzzing", desc: "Injecting payloads for XSS, SQLi, SSRF, and CSRF." },
  { icon: Shield, title: "Zero-Day Heuristics", desc: "Running proprietary AI models to find unknown logic flaws." },
  { icon: Cpu, title: "AI Processing & Verification", desc: "Eliminating false positives and verifying attack vectors." },
  { icon: FileText, title: "Report Generation", desc: "Creating compliance-ready actionable PDF reports." }
];

export function SecurityTimeline() {
  return (
    <section className="py-32 relative bg-jet">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            The Analysis <span className="text-neon">Pipeline</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A transparent look into how our AI engine dissects your application in milliseconds.
          </p>
        </div>

        <div className="relative">
          {/* Main vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2"></div>
          
          {/* Animated line filling up */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-neon -translate-x-1/2 origin-top shadow-[0_0_15px_rgba(0,255,136,0.8)]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          ></motion.div>

          <div className="flex flex-col gap-12">
            {timelineStages.map((stage, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = stage.icon;
              
              return (
                <div key={idx} className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Center Node */}
                  <motion.div 
                    initial={{ scale: 0, backgroundColor: "#181818" }}
                    whileInView={{ scale: 1, backgroundColor: "#00FF88" }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full z-10 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.8)] border-4 border-jet"
                  >
                  </motion.div>

                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`ml-20 md:ml-0 md:w-[45%] ${isEven ? 'md:text-left' : 'md:text-right'}`}
                  >
                    <AnimatedCard className="p-6 bg-dark/60 border-white/10 backdrop-blur-md hover:border-neon/30 transition-colors">
                      <div className={`flex items-center gap-4 mb-3 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                        <div className="p-3 bg-white/5 rounded-xl text-neon border border-white/10 shadow-inner">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">{stage.desc}</p>
                    </AnimatedCard>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
