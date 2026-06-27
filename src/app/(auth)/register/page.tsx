"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "@/hooks/useAuth";
import { AuthService } from "@/services/authService";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { setUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await AuthService.register(data);
      setUser(response.user);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
        <p className="text-gray-400">Start scanning your infrastructure in seconds.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="John Doe"
            className={`w-full bg-dark border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-neon'} rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-neon'} transition-all`}
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Work Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="john@company.com"
            className={`w-full bg-dark border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-neon'} rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-neon'} transition-all`}
            disabled={isSubmitting}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className={`w-full bg-dark border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-neon'} rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-1 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-neon'} transition-all`}
            disabled={isSubmitting}
          />
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-neon text-jet font-bold py-2.5 rounded-lg hover:bg-neon/90 transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
          {!isSubmitting && <ShieldCheck className="w-5 h-5" />}
        </button>
      </form>

      <p className="text-center text-sm text-gray-400 mt-8">
        Already have an account? <Link href="/login" className="text-neon hover:underline font-medium">Sign in</Link>
      </p>
    </div>
  );
}
