import { SelectionRange } from "./SelectionRange";

/**
 * The state of the text of the whole editor
 */
export interface TextState {
  /**
   * All the text in the editor
   */
  text: string;
  /**
   * The section of the text that is selected
   */
  selection: SelectionRange;
}

export interface TextController {
  /**
   * Replaces the current selection with the new text. This will make the new selectedText to be empty, the
   * selection start and selection end will be the same and will both point to the end
   * @param text Text that should replace the current selection
   */
  replaceSelection(text: string): TextState;

  /**
   * Selects the specified text range
   * @param selection
   */
  setSelectionRange(selection: SelectionRange): TextState;
  /**
   * Get the current text state
   */
  getState(): TextState;
}
