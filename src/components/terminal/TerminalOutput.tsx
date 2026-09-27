"use client";

import React, { useRef, useEffect } from "react";
import { useTerminal } from "./TerminalContext";

export function TerminalOutput() {
  const { history } = useTerminal();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div
      role="log"
      aria-live="polite"
      className="flex-1 overflow-y-auto px-4 py-4 space-y-4 font-mono text-xs select-text"
    >
      {history.map((entry) => (
        <div key={entry.id} className="space-y-1">
          {/* If entry was triggered by a command, show prompt line */}
          {entry.command && (
            <div className="flex items-center gap-2 text-muted">
              <span className="text-accent font-semibold">portfolio@dev</span>
              <span className="text-muted">:</span>
              <span className="text-accent-cyan font-bold">~$</span>
              <span className="text-foreground font-semibold">{entry.command}</span>
              <span className="text-[10px] text-muted/50 ml-auto tabular-nums">{entry.timestamp}</span>
            </div>
          )}

          {/* Render output content */}
          {entry.output && (
            <div className="pl-2 border-l-2 border-border/60 py-0.5">
              {entry.output}
            </div>
          )}
        </div>
      ))}
      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
}
