"use client";

import { Shield, Globe, Hash, MessageSquare, Mail, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="relative bg-jet pt-24 pb-12 border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-neon/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="flex flex-col gap-6">
            <a href="#" className="flex items-center gap-2 interactive">
              <Shield className="w-8 h-8 text-neon" />
              <span className="text-2xl font-bold tracking-tight text-white">
                ScureScan
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Enterprise-grade vulnerability scanning and threat detection for modern web applications.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-gray-400 hover:text-neon hover:bg-white/5 transition-all interactive border border-white/5">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-gray-400 hover:text-neon hover:bg-white/5 transition-all interactive border border-white/5">
                <Hash className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark flex items-center justify-center text-gray-400 hover:text-neon hover:bg-white/5 transition-all interactive border border-white/5">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
            
            <div className="inline-flex items-center gap-2 bg-dark border border-white/10 rounded-full px-4 py-2 w-fit interactive mt-4">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium text-white">4.9/5 from 2,000+ users</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="flex flex-col gap-4">
              {['Features', 'Integrations', 'Pricing', 'Changelog', 'Docs'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-neon transition-colors interactive">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              {['About Us', 'Careers', 'Blog', 'Contact', 'Partners'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-neon transition-colors interactive">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Subscribe</h4>
            <p className="text-sm text-gray-400 mb-4">
              Get the latest security alerts and news.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-dark border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/50 transition-all interactive"
                />
              </div>
              <Button variant="primary" size="sm" className="w-full justify-center">
                Subscribe <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ScureScan Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors interactive">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors interactive">Terms of Service</a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors interactive">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
