import { Command, CommandGroup } from "../types";

/**
 * Returns a flat array of commands that can be activated by the keyboard.
 * When keydowns happen, these commands 'handleKeyCommand' will be executed, in this order,
 * and the first that returns true will be executed.
 */
export function extractKeyActivatedCommands(
  groups: CommandGroup[]
): Array<Command> {
  const result: Array<Command> = [];
  if (!groups || !groups.length) {
    return result;
  }
  for (const group of groups) {
    if (group.commands && group.commands.length) {
      for (const command of group.commands) {
        if (command.handleKeyCommand) {
          result.push(command);
        }
      }
    }
  }
  return result;
}
