import * as React from "react";
import { Command } from "../command";
import { textHelpers } from "../../helpers/textHelpers";
export const bold: Command = {
  shouldUndo: options => {
    return (
      textHelpers.getCharactersBeforeSelection(options.initialState, 2) ===
        "**" &&
      textHelpers.getCharactersAfterSelection(options.initialState, 2) === "**"
    );
  },
  execute: ({ initialState, textApi }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = textHelpers.selectWord({
      text: initialState.text,
      selection: initialState.selection
    });
    const state1 = textApi.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the bold mark up
    const state2 = textApi.replaceSelection(
      `**${textHelpers.getSelectedText(state1)}**`
    );
    // Adjust the selection to not contain the **
    textApi.setSelectionRange({
      start:
        state2.selection.end - 2 - textHelpers.getSelectedText(state1).length,
      end: state2.selection.end - 2
    });
  },
  undo: ({ initialState, textApi }) => {
    const text = textHelpers.getSelectedText(initialState);
    textApi.setSelectionRange({
      start: initialState.selection.start - 2,
      end: initialState.selection.end + 2
    });
    textApi.replaceSelection(text);
    textApi.setSelectionRange({
      start: initialState.selection.start - 2,
      end: initialState.selection.end - 2
    });
  }
};
