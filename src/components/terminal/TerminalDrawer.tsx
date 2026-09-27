"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useTerminal } from "./TerminalContext";
import { TerminalOutput } from "./TerminalOutput";
import { TerminalInput } from "./TerminalInput";
import { Terminal, X } from "lucide-react";

export function TerminalDrawer() {
  const { isOpen, close } = useTerminal();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Subtle Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
            onClick={close}
            className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Interactive Developer OS Terminal"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 w-full max-w-[480px] h-full bg-surface border-l border-border shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 h-12 border-b border-border bg-surface-secondary/80 select-none">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-foreground">
                <Terminal className="w-4 h-4 text-accent" aria-hidden="true" />
                <span>TERMINAL</span>
                <span className="text-[10px] text-muted opacity-60">CLI</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Status Indicator */}
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                  <span>ONLINE</span>
                </div>

                {/* Hotkey hint pill */}
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono text-muted">
                  Esc
                </span>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close terminal drawer"
                  className="w-7 h-7 rounded-lg hover:bg-border text-muted hover:text-foreground flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Terminal Output Stream */}
            <TerminalOutput />

            {/* Terminal Input Line */}
            <TerminalInput />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
