"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "@/hooks/useAuth";
import { AuthService } from "@/services/authService";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

import { Suspense } from "react";

function LoginContent() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await AuthService.login(data);
      setUser(response.user);
      toast.success("Successfully logged in!");
      router.push(redirectPath);
    } catch (err: any) {
      toast.error(err.message || "Failed to login. Try admin@example.com");
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const response = await AuthService.signInWithGoogle();
      setUser(response.user);
      toast.success("Signed in with Google!");
      router.push(redirectPath);
    } catch (err: any) {
      toast.error("Google sign in failed");
      setIsGoogleLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading || isSubmitting}
        className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-medium py-2.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        {isGoogleLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        )}
        Continue with Google
      </button>

      <div className="relative flex items-center mb-6">
        <div className="flex-grow border-t border-white/10"></div>
        <span className="flex-shrink-0 px-4 text-xs text-gray-500 uppercase tracking-widest font-medium">Or</span>
        <div className="flex-grow border-t border-white/10"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Work Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="admin@example.com"
            className={`w-full bg-dark border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-neon'} rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-neon'} transition-all`}
            disabled={isSubmitting || isGoogleLoading}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <Link href="/forgot-password" className="text-xs text-neon hover:underline">Forgot password?</Link>
          </div>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className={`w-full bg-dark border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-neon'} rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-neon'} transition-all`}
            disabled={isSubmitting || isGoogleLoading}
          />
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isGoogleLoading}
          className="w-full bg-neon text-jet font-bold py-2.5 rounded-lg hover:bg-neon/90 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
          {!isSubmitting && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      <p className="text-center text-sm text-gray-400 mt-8">
        Don't have an account? <Link href="/register" className="text-neon hover:underline font-medium">Create one</Link>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
        <p className="text-gray-400">Log in to your ScureScan account to continue.</p>
      </div>

      <Suspense fallback={<div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-neon" /></div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
