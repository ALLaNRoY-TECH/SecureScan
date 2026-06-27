"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    name: "Starter",
    price: "Free",
    desc: "Essential scanning for small projects.",
    features: ["1 Target URL", "Weekly Scans", "Basic OWASP Checks", "Community Support"],
    highlighted: false,
    btn: "Start Free"
  },
  {
    name: "Pro",
    price: "$99",
    period: "/mo",
    desc: "Advanced security for growing teams.",
    features: ["10 Target URLs", "Daily Scans", "AI Remediation", "API Access", "PDF Reports", "Priority Support"],
    highlighted: true,
    btn: "Start 14-Day Trial"
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Full-scale protection for large orgs.",
    features: ["Unlimited Targets", "Continuous Scanning", "Zero-Day Signatures", "Dedicated Account Manager", "SLA Guarantee", "On-Premises Option"],
    highlighted: false,
    btn: "Contact Sales"
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative bg-jet">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-neon/5 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent <span className="text-neon">Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg">Select the plan that best fits your security needs.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-2xl p-8 border ${plan.highlighted ? 'border-neon bg-dark/80 scale-100 md:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.15)] z-10' : 'border-white/10 bg-dark/40'} flex flex-col backdrop-blur-md`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon text-jet text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-400">{plan.period}</span>}
              </div>
              <p className="text-gray-400 text-sm mb-8 h-10">{plan.desc}</p>
              
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-neon" />
                    <span className="text-gray-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              
              <Button variant={plan.highlighted ? "primary" : "outline"} className="w-full">
                {plan.btn}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
