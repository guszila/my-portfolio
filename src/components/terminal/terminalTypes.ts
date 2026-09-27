import React from "react";

export interface ParsedCommand {
  raw: string;
  command: string;
  args: string[];
}

export interface CommandContext {
  navigate: (sectionId: string) => void;
  setTheme: (theme: string) => void;
  currentTheme?: string;
  clear: () => void;
}

export interface CommandResult {
  output: React.ReactNode;
  type?: "success" | "info" | "warning" | "error" | "system";
}

export interface CommandDefinition {
  name: string;
  description: string;
  usage: string;
  handler: (args: string[], context: CommandContext) => CommandResult;
}

export interface TerminalHistoryEntry {
  id: string;
  command?: string;
  output: React.ReactNode;
  timestamp: string;
  type?: "success" | "info" | "warning" | "error" | "system";
}
