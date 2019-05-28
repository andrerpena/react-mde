import { TextRange } from "./TextRange";

export interface TextState {
  text: string,
  selectedText: string,
  selection: TextRange,
}

export interface TextApi {
  /**
   * Replaces the current selection with the new text. This will make the new selectedText to be empty, the
   * selection start and selection end will be the same and will both point to the end
   * @param text Text that should replace the current selection
   */
  replaceSelection (text: string): TextState;

  /**
   * Selects the specified text range
   * @param selection
   */
  setSelectionRange (selection: TextRange): TextState;
}
