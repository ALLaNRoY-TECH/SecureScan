"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-jet border-y border-white/5">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-neon/10 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-dark/60 border border-neon/30 p-12 md:p-20 rounded-3xl backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,136,0.1)]"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-neon/10 flex items-center justify-center border border-neon/30">
              <ShieldCheck className="w-8 h-8 text-neon" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Secure Your Platform <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald">Today.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of modern engineering teams that trust ScureScan to protect their applications from next-generation threats.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Start Free Scan <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Book a Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
