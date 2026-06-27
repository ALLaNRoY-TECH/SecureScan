"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Reset Password</h1>
        <p className="text-gray-400">Enter your email address and we'll send you a link to reset your password.</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
          <input
            type="email"
            placeholder="admin@example.com"
            className="w-full bg-dark border border-white/10 focus:border-neon rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-neon transition-all"
          />
        </div>

        <button
          type="button"
          onClick={() => alert("Mock password reset sent!")}
          className="w-full bg-white text-jet font-bold py-2.5 rounded-lg hover:bg-gray-200 transition-colors mt-2"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
