"use client";

import { cn } from "@/lib/utils";

export function TextInput (props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input 
      {...props}
      className={cn("w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-500",
        "focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/30 transition", props.className)}
    />
  )
}