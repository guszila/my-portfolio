"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "next-themes";
import { TerminalHistoryEntry, CommandContext } from "./terminalTypes";
import { parseCommand } from "./commandParser";
import { commandRegistry } from "./commandRegistry";

interface TerminalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  history: TerminalHistoryEntry[];
  commandHistory: string[];
  executeCommand: (input: string) => void;
  clearHistory: () => void;
}

const TerminalContext = createContext<TerminalContextValue | null>(null);

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
}

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<TerminalHistoryEntry[]>([
    {
      id: "initial-banner",
      output: (
        <div className="font-mono text-xs space-y-1 text-muted select-none">
          <div className="text-foreground font-semibold">
            Interactive Developer OS Terminal [v1.0.0]
          </div>
          <div className="text-[11px] text-muted">
            Type <span className="text-accent font-bold">&apos;help&apos;</span> to view available commands. Press <span className="text-accent-cyan font-bold">Esc</span> to close.
          </div>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      type: "system",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    if (typeof document !== "undefined") {
      activeTriggerRef.current = document.activeElement as HTMLElement | null;
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Restore focus to triggering element
    if (activeTriggerRef.current && typeof activeTriggerRef.current.focus === "function") {
      activeTriggerRef.current.focus();
    }
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const navigateToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.history.pushState) {
        window.history.pushState(null, "", `#${sectionId}`);
      }
    }
  }, []);

  const executeCommand = useCallback(
    (rawInput: string) => {
      const parsed = parseCommand(rawInput);
      const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });

      if (!parsed.command) {
        return;
      }

      // Add to command history (deduplicate consecutive identical commands)
      setCommandHistory((prev) => {
        if (prev.length > 0 && prev[prev.length - 1] === rawInput.trim()) {
          return prev;
        }
        return [...prev, rawInput.trim()];
      });

      const definition = commandRegistry[parsed.command];

      if (!definition) {
        const errorEntry: TerminalHistoryEntry = {
          id: `cmd-${Date.now()}`,
          command: rawInput,
          output: (
            <div className="font-mono text-xs text-rose-500">
              Command not found: <span className="font-bold">&apos;{parsed.command}&apos;</span>. Type <span className="text-accent font-bold">&apos;help&apos;</span> to see available commands.
            </div>
          ),
          timestamp,
          type: "error",
        };
        setHistory((prev) => [...prev, errorEntry]);
        return;
      }

      const commandContext: CommandContext = {
        navigate: navigateToSection,
        setTheme,
        currentTheme: resolvedTheme || theme,
        clear: clearHistory,
      };

      const result = definition.handler(parsed.args, commandContext);

      // If command cleared history, do not append null output
      if (parsed.command === "clear") {
        return;
      }

      const entry: TerminalHistoryEntry = {
        id: `cmd-${Date.now()}`,
        command: rawInput,
        output: result.output,
        timestamp,
        type: result.type || "info",
      };

      setHistory((prev) => [...prev, entry]);
    },
    [navigateToSection, setTheme, resolvedTheme, theme, clearHistory]
  );

  // Global Keyboard Shortcuts: ` (backtick) and Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInputFocused =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);

      // Handle Escape to close terminal
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        close();
        return;
      }

      // Handle Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
        return;
      }

      // Handle backtick ` (only when not typing in an input)
      if (e.key === "`" && !isInputFocused && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggle, close]);

  return (
    <TerminalContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
        history,
        commandHistory,
        executeCommand,
        clearHistory,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}
