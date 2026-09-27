"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTerminal } from "./TerminalContext";
import { commandRegistry } from "./commandRegistry";

export function TerminalInput() {
  const [value, setValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, executeCommand, commandHistory } = useTerminal();

  // Focus input on mount or when terminal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 1. Enter: execute command
    if (e.key === "Enter") {
      e.preventDefault();
      if (value.trim()) {
        executeCommand(value);
        setValue("");
        setHistoryIndex(-1);
      }
      return;
    }

    // 2. Tab: Autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const current = value.trim().toLowerCase();
      if (!current) return;

      const availableCommands = Object.keys(commandRegistry);
      const match = availableCommands.find((cmd) => cmd.startsWith(current));
      if (match) {
        setValue(match);
      }
      return;
    }

    // 3. ArrowUp: Navigate command history backward
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setValue(commandHistory[nextIndex] || "");
      return;
    }

    // 4. ArrowDown: Navigate command history forward
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setValue("");
      } else {
        setHistoryIndex(nextIndex);
        setValue(commandHistory[nextIndex] || "");
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex items-center gap-2 px-4 py-3 bg-surface-secondary/70 border-t border-border font-mono text-xs cursor-text select-none"
    >
      <div className="flex items-center shrink-0">
        <span className="text-accent font-semibold">portfolio@dev</span>
        <span className="text-muted">:</span>
        <span className="text-accent-cyan font-bold">~$</span>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Terminal command input"
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        className="flex-1 bg-transparent text-foreground placeholder:text-muted/50 focus:outline-none caret-accent"
        placeholder="type command (e.g. 'help')..."
      />
    </div>
  );
}
