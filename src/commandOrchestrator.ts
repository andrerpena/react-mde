import { Command, CommandGroup, TextRange } from "./types";
import { TextApi, TextState } from "./types/CommandOptions";
import { insertText } from "./util/InsertTextAtPosition";
import { extractKeyActivatedCommands } from "./util/CommandUtils";
import * as React from "react";

export class TextAreaTextApi implements TextApi {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;

  constructor(textAreaRef: React.RefObject<HTMLTextAreaElement>) {
    this.textAreaRef = textAreaRef;
  }

  replaceSelection(text: string): TextState {
    const textArea = this.textAreaRef.current;
    insertText(textArea, text);
    return getStateFromTextArea(textArea);
  }

  setSelectionRange(selection: TextRange): TextState {
    const textArea = this.textAreaRef.current;
    textArea.focus();
    textArea.selectionStart = selection.start;
    textArea.selectionEnd = selection.end;
    return getStateFromTextArea(textArea);
  }

  getState(): TextState {
    const textArea = this.textAreaRef.current;
    return getStateFromTextArea(textArea);
  }
}

export function getStateFromTextArea(textArea: HTMLTextAreaElement): TextState {
  return {
    selection: {
      start: textArea.selectionStart,
      end: textArea.selectionEnd
    },
    text: textArea.value,
    selectedText: textArea.value.slice(
      textArea.selectionStart,
      textArea.selectionEnd
    )
  };
}

export class CommandOrchestrator {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  textApi: TextApi;
  commands: CommandGroup[];
  keyActivatedCommands: Command[];
  /**
   * Indicates whether there is a command currently executing
   */
  isExecuting: boolean;

  constructor(
    commands: CommandGroup[],
    textArea: React.RefObject<HTMLTextAreaElement>
  ) {
    this.commands = commands;
    this.keyActivatedCommands = extractKeyActivatedCommands(commands);
    this.textAreaRef = textArea;
    this.textApi = new TextAreaTextApi(textArea);
  }

  /**
   * Tries to find a command the wants to handle the keyboard event
   */
  handlePossibleKeyCommand = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): boolean => {
    for (const command of this.keyActivatedCommands) {
      if (command.handleKeyCommand(e)) {
        this.executeCommand(command).then(r => {});
        return true;
      }
    }
    return false;
  };

  async executeCommand(command: Command): Promise<void> {
    if (this.isExecuting) {
      // The simplest thing to do is to ignore commands while
      // there is already a command executing. The alternative would be to queue commands
      // but there is no guarantee that the state after one command executes will still be compatible
      // with the next one. In fact, it is likely not to be.
      return;
    }

    this.isExecuting = true;
    const result = command.execute(
      getStateFromTextArea(this.textAreaRef.current),
      this.textApi
    );
    await result;
    this.isExecuting = false;
  }
}
