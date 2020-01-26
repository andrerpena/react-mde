import { insertText } from "./util/InsertTextAtPosition";

export class TextAreaTextApi {
  constructor(textArea) {
    this.textArea = textArea;
  }

  replaceSelection(text) {
    insertText(this.textArea, text);
    return getStateFromTextArea(this.textArea);
  }

  setSelectionRange(selection) {
    this.textArea.focus();
    this.textArea.selectionStart = selection.start;
    this.textArea.selectionEnd = selection.end;
    return getStateFromTextArea(this.textArea);
  }
}

export function getStateFromTextArea(textArea) {
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

export class TextAreaCommandOrchestrator {
  constructor(textArea) {
    this.textArea = textArea;
    this.textApi = new TextAreaTextApi(textArea);
  }

  executeCommand(command) {
    command.execute(getStateFromTextArea(this.textArea), this.textApi);
  }
}
