"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

const faqs = [
  {
    q: "How does ScureScan differ from traditional scanners?",
    a: "Unlike traditional signature-based scanners, ScureScan uses a proprietary AI engine that understands application logic and context, allowing it to find zero-day vulnerabilities and business logic flaws that others miss."
  },
  {
    q: "Will scanning affect my website's performance?",
    a: "No. Our intelligent crawler automatically throttles requests based on your server's response times to ensure zero impact on your production environment."
  },
  {
    q: "Do I need to install any agents on my server?",
    a: "For our standard web application scanning, no installation is required. We perform black-box testing from the outside, exactly how an attacker would see your application."
  },
  {
    q: "How often should I run scans?",
    a: "We recommend integrating ScureScan into your CI/CD pipeline to scan every new deployment. Additionally, scheduled daily or weekly scans ensure you are protected against newly discovered vulnerabilities in your dependencies."
  },
  {
    q: "What kind of reports do you generate?",
    a: "We provide executive summaries, detailed technical reports for developers with remediation steps, and compliance-ready reports for standards like SOC2, HIPAA, and PCI-DSS."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative bg-jet">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="text-neon">Questions</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <AnimatedCard 
                key={idx} 
                className={`p-0 overflow-hidden cursor-pointer interactive border ${isOpen ? 'border-neon/50' : 'border-white/10'}`}
              >
                <div 
                  className="p-6 flex items-center justify-between"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <h3 className={`text-lg font-medium transition-colors ${isOpen ? 'text-neon' : 'text-white'}`}>
                    {faq.q}
                  </h3>
                  <div className="ml-4 flex-shrink-0 text-neon">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="p-6 pt-0 text-gray-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
