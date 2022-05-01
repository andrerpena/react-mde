/**
 * Returns a flat array of commands that can be activated by the keyboard.
 * When key-downs happen, these commands 'handleKeyCommand' will be executed, in this order,
 * and the first that returns true will be executed.
 */
import { CommandMap } from "./command";

export function extractKeyActivatedCommands(
  commandMap: CommandMap
): Array<string> {
  const result: Array<string> = [];
  for (const command in commandMap) {
    if (commandMap.hasOwnProperty(command)) {
      result.push(command);
    }
  }
  return result;
}
