"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

const testimonials = [
  {
    quote: "ScureScan found a critical SQL injection in our billing API that 3 other enterprise scanners completely missed. It paid for itself on day one.",
    author: "Sarah Jenkins",
    role: "CISO at FinTech Global",
    avatar: "SJ"
  },
  {
    quote: "The false-positive rate is incredibly low. My team doesn't waste hours chasing ghosts anymore. The AI remediation suggestions are spot on.",
    author: "David Chen",
    role: "Lead Security Engineer",
    avatar: "DC"
  },
  {
    quote: "Integrating ScureScan into our CI/CD pipeline was seamless. Now every PR is automatically scanned before it reaches production.",
    author: "Elena Rodriguez",
    role: "VP of Engineering",
    avatar: "ER"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 relative bg-jet">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Trusted by <span className="text-neon">Security Teams</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <AnimatedCard className="h-full flex flex-col justify-between p-8 bg-dark/60 border border-white/5 shadow-lg">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-neon fill-neon" />)}
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                  <div className="w-12 h-12 rounded-full bg-jet border border-neon/30 flex items-center justify-center text-neon font-bold text-lg shadow-[0_0_10px_rgba(0,255,136,0.1)]">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{t.author}</h4>
                    <p className="text-gray-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
