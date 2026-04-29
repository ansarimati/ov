"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Field ({
  label,
  hint,
  error,
  children,
  className
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string; 
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-zinc-300">
          {label}
        </label>
        {hint ? <span className="text-xs text-zinc-500">{hint}</span> : null}
      </div>
      {children}
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </div>
  )
}