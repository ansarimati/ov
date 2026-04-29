"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function PrimaryButton ({
  loading,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button 
      {...props}
      disabled={props.disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5",
        "bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-sm transition",
        "disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
    >
      { loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null }
      { children }
    </button>
  )
}