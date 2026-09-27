"use client";

import React from "react";

export interface StoryProgressProps {
  current: number;
  total: number;
  label?: string;
  className?: string;
}

export function StoryProgress({
  current,
  total,
  label,
  className = "",
}: StoryProgressProps) {
  const currentFormatted = String(current + 1).padStart(2, "0");
  const totalFormatted = String(total).padStart(2, "0");

  return (
    <div
      className={`inline-flex items-baseline gap-2.5 text-xs font-mono select-none ${className}`}
      aria-label={`${label || "Story Progress"}: ${current + 1} of ${total}`}
    >
      {label && (
        <span className="text-muted/60 text-[10px] tracking-widest uppercase">
          {label}
        </span>
      )}
      <span className="text-foreground tracking-wider font-medium">
        <span className="text-accent">{currentFormatted}</span>
        <span className="text-muted/40 mx-1.5">—</span>
        <span className="text-muted/60">{totalFormatted}</span>
      </span>
    </div>
  );
}
