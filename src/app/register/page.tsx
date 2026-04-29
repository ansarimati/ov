"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { Activity, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage ()  {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be 8 characters");
    }

    try {
      await register(email, password, name);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-emerald-400" />
            <span className="text-2xl font-bold text-white" >
              CrickCast
            </span>
          </div>
          <p className="text-zinc-400"> Create your account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-white/10 rounded-2xl p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5" >Full Name</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5" >
              Email
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 pr-10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                { showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" /> }
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Confirm Password
            </label>
            <input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              placeholder="*******"
            />
          </div>

          <button
            type="button"
            disabled={isLoading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
          >
            {
              isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )
            }
          </button>
          <p className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link href={"/login"} className="text-emerald-400 hover:text-emerald-300 font-medium">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  )
}