import { Command, CommandMap } from "../types";

/**
 * Returns a flat array of commands that can be activated by the keyboard.
 * When keydowns happen, these commands 'handleKeyCommand' will be executed, in this order,
 * and the first that returns true will be executed.
 */
export function extractKeyActivatedCommands(
  commandMap: CommandMap
): Array<string> {
  const result: Array<string> = [];
  for (const command in commandMap) {
    if (commandMap.hasOwnProperty(command)) {
      if (commandMap[command].handleKeyCommand) {
        result.push(commandMap[command].name);
      }
    }
  }
  return result;
}
