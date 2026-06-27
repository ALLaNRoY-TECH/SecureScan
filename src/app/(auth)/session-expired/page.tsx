"use client";

import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { AuthService } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";

export default function SessionExpiredPage() {
  const { setUser } = useAuth();
  
  // Ensure the user is completely logged out
  useEffect(() => {
    AuthService.clearTokens();
    setUser(null);
  }, [setUser]);

  return (
    <div className="w-full max-w-md text-center">
      <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <Clock className="w-8 h-8 text-yellow-500" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Session Expired</h1>
      <p className="text-gray-400 mb-8">For your security, your session has timed out due to inactivity. Please log in again to continue.</p>
      
      <Link href="/login" className="inline-flex items-center justify-center gap-2 w-full bg-neon text-jet font-bold py-2.5 rounded-lg hover:bg-neon/90 transition-colors">
        Log In Again <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
