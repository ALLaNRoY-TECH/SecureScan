"use client";

import { motion } from "framer-motion";
import { Users, Lock, Calendar, Webhook, MessageSquare, Code, GitBranch, ShieldCheck, Cloud, Terminal } from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

const features = [
  { icon: Users, title: "Team Collaboration", desc: "Share findings, assign tickets, and track remediation progress together." },
  { icon: Lock, title: "Role-Based Access", desc: "Granular permissions for admins, developers, and read-only auditors." },
  { icon: Calendar, title: "Scheduled Scans", desc: "Automate daily or weekly scans to maintain continuous compliance." },
  { icon: Webhook, title: "Webhook Integrations", desc: "Trigger internal workflows or custom scripts on vulnerability detection." },
  { icon: MessageSquare, title: "Slack Alerts", desc: "Get instant notifications in your channels for critical zero-days." },
  { icon: Code, title: "GitHub Actions", desc: "Block PRs that introduce vulnerabilities into your codebase natively." },
  { icon: GitBranch, title: "CI/CD Security", desc: "Integrate deeply with Jenkins, GitLab CI, and CircleCI pipelines." },
  { icon: ShieldCheck, title: "Compliance Monitoring", desc: "Automated mapping to SOC2, ISO 27001, and HIPAA frameworks." },
  { icon: Cloud, title: "Cloud Asset Discovery", desc: "Automatically find and scan undocumented subdomains and APIs." },
];

export function EnterpriseFeatures() {
  return (
    <section className="py-32 relative bg-jet">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
               Built for <span className="text-neon">Enterprise Scale</span>
             </h2>
             <p className="text-gray-400 text-lg max-w-2xl mx-auto">
               Advanced capabilities designed specifically for large engineering organizations and compliance-heavy industries.
             </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <AnimatedCard className="p-6 bg-dark/40 border border-white/5 hover:border-neon/30 hover:bg-dark/60 transition-all h-full flex flex-col gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-neon/10 group-hover:border-neon/30 transition-colors shadow-inner">
                    <Icon className="w-6 h-6 text-gray-400 group-hover:text-neon transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </AnimatedCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
