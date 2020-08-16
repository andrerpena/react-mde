import * as React from "react";
import { L18n, TextApi, TextState } from "..";
import { HandleKeyCommand } from "../types";

export type GetIcon = (iconName: string) => React.ReactNode;

export interface ExecuteOptions {
  initialState: TextState;
  textApi: TextApi;
  context?: CommandContext;
  l18n?: L18n;
}

export interface Command {
  buttonComponentClass?: React.ComponentClass | string;
  icon?: (getIconFromProvider: GetIcon) => React.ReactNode;
  buttonProps?: any;
  execute: (options: ExecuteOptions) => void | Promise<void>;
  /**
   * On every key-down, "handleKeyCommand", if defined, will be executed for every command.
   * The first "HandleKeyCommand" that returns true will cause the command to be executed.
   * "HandleKeyCommand" for subsequent commands will not be executed after the first one returns true.
   */
  handleKeyCommand?: HandleKeyCommand;
}

export interface CommandContext {
  type: string;
}

export interface PasteCommandContext extends CommandContext {
  type: "paste";
  event: React.ClipboardEvent | React.DragEvent | React.ChangeEvent;
  saveImage: SaveImageHandler;
}

export type ToolbarCommands = string[][];
export type CommandMap = Record<string, Command>;

export interface PasteOptions {
  /**
   * Generator function to save images pasted.
   * This generator should 1) Yield the image URL. 2) Return true if the save was successful or false, otherwise
   */
  saveImage: SaveImageHandler;
  /**
   * Command to execute on paste command
   */
  command?: string;
}

export type SaveImageHandler = (
  data: ArrayBuffer
) => AsyncGenerator<string, boolean>;
