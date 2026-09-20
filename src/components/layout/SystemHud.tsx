"use client";

import React, { useState, useEffect } from "react";
import { Terminal, ShieldCheck } from "lucide-react";

export function SystemHud() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside
      aria-label="System status bar"
      className="w-full bg-[#070a11] border-b border-white/[0.07] text-[11px] font-mono text-slate-400 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
        {/* Left: Truthful System Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span
              className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden="true"
            />
            <span className="font-semibold tracking-wider text-slate-200">
              STATUS:
            </span>
            <span className="text-emerald-400">READY</span>
          </div>

          <span className="text-white/20 hidden sm:inline" aria-hidden="true">
            |
          </span>

          <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3 h-3 text-cyan-400" aria-hidden="true" />
            <span>PORTFOLIO OS</span>
          </span>
        </div>

        {/* Center: Live Time */}
        <div className="text-slate-400 flex items-center gap-1.5">
          <span className="text-slate-500 text-[10px]">UTC/LOCAL:</span>
          <span className="text-slate-200 font-medium tabular-nums">
            {timeString || "--:--:--"}
          </span>
        </div>

        {/* Right: Navigation mode */}
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-flex items-center gap-1 text-slate-400 text-[10px]">
            <Terminal className="w-3 h-3 text-slate-500" aria-hidden="true" />
            <span>GUI NAV ACTIVE</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-slate-400">
            v1.0
          </span>
        </div>
      </div>
    </aside>
  );
}
