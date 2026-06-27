"use client";

import { useState } from "react";
import { Search, Bell, LogOut, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-dark/50 backdrop-blur-md border-b border-white/5 z-40 sticky top-0">
      
      {/* Global Search Shell */}
      <div className="flex items-center flex-grow max-w-md">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-neon transition-colors" />
          <input 
            type="text" 
            placeholder="Search projects, scans, CVEs... (Cmd+K)" 
            className="w-full bg-jet border border-white/10 rounded-lg py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
            disabled
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <span className="text-[10px] bg-white/10 text-gray-400 px-1.5 rounded">⌘K</span>
          </div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative">
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors relative"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-neon rounded-full"></span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-10 w-80 bg-dark border border-white/10 rounded-xl shadow-2xl p-4 z-50 flex flex-col gap-3"
              >
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <h4 className="text-white font-medium">Notifications</h4>
                  <button className="text-xs text-neon hover:underline">Mark all read</button>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="p-2 rounded hover:bg-white/5 transition-colors cursor-pointer border-l-2 border-neon">
                    <p className="text-sm text-white">Scan Completed</p>
                    <p className="text-xs text-gray-400">Production API scan finished with 3 findings.</p>
                  </div>
                  <div className="p-2 rounded hover:bg-white/5 transition-colors cursor-pointer border-l-2 border-transparent">
                    <p className="text-sm text-white">Report Generated</p>
                    <p className="text-xs text-gray-400">SOC2 compliance report is ready.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-medium text-xs hover:border-neon/50 transition-colors uppercase"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
          >
            {user?.avatar || "US"}
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-10 w-56 bg-dark border border-white/10 rounded-xl shadow-2xl p-2 z-50 flex flex-col"
              >
                <div className="px-3 py-2 border-b border-white/5 mb-2">
                  <p className="text-sm text-white font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
                
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded flex items-center gap-2 transition-colors">
                  <Settings className="w-4 h-4" /> Account Settings
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded flex items-center gap-2 transition-colors mt-1 border-t border-white/5 pt-3"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </header>
  );
}
