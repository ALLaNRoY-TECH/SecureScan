"use client";

import { motion } from "framer-motion";
import { Cpu, Shield, Search, Zap, BarChart, FileText } from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

const features = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI Security Assistant",
    description: "Our proprietary AI model detects zero-day vulnerabilities by analyzing your code structure and dependencies."
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Website Vulnerability Scanner",
    description: "Deep crawling technology that uncovers hidden endpoints and checks for OWASP Top 10 vulnerabilities."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Real-Time Monitoring",
    description: "Continuous monitoring of your applications with instant alerts when new threats are discovered."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Technology Detection",
    description: "Automatically identify the tech stack of any target and apply specific exploit payloads to test defenses."
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: "Historical Scan Reports",
    description: "Track your security posture over time with detailed charts and vulnerability resolution metrics."
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "One-Click PDF Export",
    description: "Generate executive-ready security reports with a single click to share with stakeholders."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-jet">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Next-Generation <span className="text-neon">Capabilities</span>
            </h2>
            <p className="text-gray-400 text-lg">
              ScureScan combines advanced heuristics with artificial intelligence to find vulnerabilities that traditional scanners miss.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <AnimatedCard className="h-full flex flex-col items-start gap-4 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] group">
                <div className="p-3 rounded-lg bg-dark border border-white/5 text-neon mb-2 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-[0_0_15px_rgba(0,255,136,0.1)]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-neon transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
