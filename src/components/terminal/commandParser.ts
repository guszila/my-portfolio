import { ParsedCommand } from "./terminalTypes";

export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      raw: input,
      command: "",
      args: [],
    };
  }

  // Split by one or more whitespace characters
  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  return {
    raw: input,
    command,
    args,
  };
}
