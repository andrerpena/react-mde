import { TextRange } from "./TextRange";

export interface TextState {
  text: string,
  selectedText: string,
  selection: TextRange,
}

export interface TextApi {
  replaceSelection (text: string): TextState;

  setSelectionRange (selection: TextRange): TextState;
}
