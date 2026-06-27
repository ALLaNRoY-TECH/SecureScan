"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Shield, FolderOpen, FileText, Settings, Bell, Search } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { AICopilot } from "@/components/ui/AICopilot";

import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { name: "Scans", href: "/dashboard/scans", icon: Shield },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-jet overflow-hidden text-sm">
        {/* Sidebar */}
        <aside className="w-64 bg-dark border-r border-white/5 flex flex-col flex-shrink-0">
          <div className="h-16 flex items-center px-6 border-b border-white/5">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center">
                <span className="text-lg font-bold text-neon leading-none">S</span>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">ScureScan</span>
            </Link>
          </div>
          
          <nav className="flex-grow py-6 px-4 flex flex-col gap-1 overflow-y-auto">
            {navItems.map(item => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              const Icon = item.icon;
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-white/10 text-white font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-neon' : ''}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center text-neon font-bold text-xs uppercase">
                {user?.avatar || "US"}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-white font-medium text-xs truncate">{user?.name || "User"}</span>
                <span className="text-gray-500 text-[10px] truncate">{user?.email || "user@example.com"}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col overflow-hidden relative">
          <Topbar />
          <main className="flex-grow overflow-y-auto bg-[#0a0a0a] relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            <div className="container mx-auto p-6 md:p-8 max-w-7xl relative z-10">
              {children}
            </div>
          </main>
        </div>

        <AICopilot />
      </div>
    </ProtectedRoute>
  );
}
