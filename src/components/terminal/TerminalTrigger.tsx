"use client";

import React from "react";
import { Terminal } from "lucide-react";
import { useTerminal } from "./TerminalContext";

export interface TerminalTriggerProps {
  className?: string;
  variant?: "button" | "icon";
}

export function TerminalTrigger({
  className = "",
  variant = "button",
}: TerminalTriggerProps) {
  const { toggle } = useTerminal();

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label="Open developer terminal (Ctrl+K or `)"
        title="Terminal (Ctrl+K or `)"
        className={`w-8 h-8 rounded-lg border border-border bg-surface-secondary/80 hover:bg-surface-secondary text-foreground flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer ${className}`}
      >
        <Terminal className="w-4 h-4 text-accent" aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Open developer terminal (Ctrl+K or `)"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-secondary hover:bg-border text-foreground border border-border text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer ${className}`}
    >
      <Terminal className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
      <span className="font-semibold">&gt;_</span>
      <span className="text-[10px] text-muted opacity-70 hidden sm:inline">Ctrl+K</span>
    </button>
  );
}
