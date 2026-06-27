"use client";

import { motion } from "framer-motion";

const companies = [
  "Acme Corp", "GlobalTech", "Nexus", "Quantum", "CyberDyne", "Stark Industries",
  "Wayne Ent", "Oscorp", "Umbrella", "Aperture", "Black Mesa", "Massive Dynamic"
];

export function TrustedBy() {
  return (
    <section className="py-12 border-y border-white/5 bg-jet/30 relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-jet to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-jet to-transparent z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-8 relative z-20">
        <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-widest">
          Trusted by innovative security teams worldwide
        </p>
      </div>

      <div className="flex w-[200%] opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
        <motion.div 
          className="flex gap-20 items-center px-10"
          animate={{ x: [0, "-100%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {companies.map((company, i) => (
            <div key={i} className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">
              {company}
            </div>
          ))}
        </motion.div>
        <motion.div 
          className="flex gap-20 items-center px-10"
          animate={{ x: [0, "-100%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {companies.map((company, i) => (
            <div key={i} className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">
              {company}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
