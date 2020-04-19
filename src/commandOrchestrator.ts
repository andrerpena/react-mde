import { Command, TextRange } from "./types";
import { TextApi, TextState } from "./types/CommandOptions";
import { insertText } from "./util/InsertTextAtPosition";

export interface CommandOrchestrator {
  executeCommand(command: Command): void;
}

export class TextAreaTextApi implements TextApi {
  textArea: HTMLTextAreaElement;

  constructor(textArea: HTMLTextAreaElement) {
    this.textArea = textArea;
  }

  replaceSelection(text: string): TextState {
    insertText(this.textArea, text);
    return getStateFromTextArea(this.textArea);
  }

  setSelectionRange(selection: TextRange): TextState {
    this.textArea.focus();
    this.textArea.selectionStart = selection.start;
    this.textArea.selectionEnd = selection.end;
    return getStateFromTextArea(this.textArea);
  }

  getState(): TextState {
    return getStateFromTextArea(this.textArea);
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

export class TextAreaCommandOrchestrator implements CommandOrchestrator {
  textArea: HTMLTextAreaElement;
  textApi: TextApi;

  constructor(textArea: HTMLTextAreaElement) {
    this.textArea = textArea;
    this.textApi = new TextAreaTextApi(textArea);
  }

  executeCommand(command: Command): void {
    command.execute(getStateFromTextArea(this.textArea), this.textApi);
  }
}
