import { Command, CommandGroup } from "../types";

// Extracts a map that associate "key commands" (strings) with react-mde Commands.
// This is important because, when pressing tab, for example, Draft.js issues
// a "tab" command. We need to associate the key bindings with react-mde commands.
export function extractCommandMap (groups: CommandGroup[]): { [key: string]: Command } {
  const result: { [key: string]: Command } = {};
  if (!groups || !groups.length) {
    return result;
  }
  for (let group of groups) {
    if (group.commands && group.commands.length) {
      for (let command of group.commands) {
        if (command.keyCommand) {
          result[command.keyCommand] = command;
        }
      }
    }
  }
  return result;
}