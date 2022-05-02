import { TextController } from "../types/CommandOptions";
import { CommandContext, CommandMap } from "./command";

export class CommandController<CommandName extends string> {
  private readonly textController: TextController;
  private readonly commandMap: CommandMap<CommandName>;

  /**
   * Indicates whether there is a command currently executing
   */
  isExecuting: boolean = false;

  constructor(
    textController: TextController,
    commandMap: CommandMap<CommandName>
  ) {
    this.textController = textController;
    this.commandMap = commandMap;
  }

  async executeCommand(
    commandName: CommandName,
    context?: CommandContext
  ): Promise<void> {
    if (this.isExecuting) {
      // The simplest thing to do is to ignore commands while
      // there is already a command execu
      // ting. The alternative would be to queue commands
      // but there is no guarantee that the state after one command executes will still be compatible
      // with the next one. In fact, it is likely not to be.
      return;
    }

    const command = this.commandMap[commandName];

    if (!command) {
      throw new Error(
        `Cannot execute command. Command not found: ${commandName}`
      );
    }

    const executeOptions = {
      initialState: this.textController.getState(),
      textApi: this.textController
    };

    if (command.shouldUndo?.(executeOptions) && command?.undo) {
      command.undo(executeOptions);
    } else {
      await command.execute(executeOptions);
    }
  }
}
