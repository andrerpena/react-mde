import { TextController, TextState } from "../types/CommandOptions";

export interface ExecuteOptions {
  initialState: TextState;
  textApi: TextController;
  context?: CommandContext;
}

export interface Command {
  execute: (options: ExecuteOptions) => void | Promise<void>;
}

export interface CommandContext {
  type: string;
}

export type CommandMap = Record<string, Command>;
