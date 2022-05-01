import { extractKeyActivatedCommands } from "./command-utils";
import { TextController } from "../types/CommandOptions";
import { Command, CommandContext, CommandMap } from "./command";

export class CommandController {
  private readonly textController: TextController;
  private readonly commandMap: CommandMap;
  /**
   * Names of commands that can be activated by the keyboard
   */
  keyActivatedCommands: string[];
  /**
   * Indicates whether there is a command currently executing
   */
  isExecuting: boolean = false;

  constructor(textController: TextController, commandMap: CommandMap) {
    this.textController = textController;
    this.commandMap = commandMap;
    this.keyActivatedCommands = extractKeyActivatedCommands(commandMap);
  }

  getCommand = (name: string): Command => {
    const command = this.commandMap[name];
    if (!command) {
      throw new Error(`Cannot execute command. Command not found: ${name}`);
    }
    return command;
  };

  async executeCommand(
    commandName: string,
    context?: CommandContext
  ): Promise<void> {
    if (this.isExecuting) {
      // The simplest thing to do is to ignore commands while
      // there is already a command executing. The alternative would be to queue commands
      // but there is no guarantee that the state after one command executes will still be compatible
      // with the next one. In fact, it is likely not to be.
      return;
    }

    this.isExecuting = true;
    const command = this.commandMap[commandName];
    const result = command.execute({
      initialState: this.textController.getState(),
      textApi: this.textController,
      context
    });
    await result;
    this.isExecuting = false;
  }

  /**
   * Returns a command by name
   * @param name
   */
  getCommandByName(name: string) {
    return this.commandMap[name];
  }
}
