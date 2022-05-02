import * as React from "react";
import { Command } from "../command";
import { textHelpers } from "../../helpers/textHelpers";

export const link: Command = {
  execute: ({ initialState, textApi }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = textHelpers.selectWord({
      text: initialState.text,
      selection: initialState.selection
    });
    const state1 = textApi.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the bold mark up
    const state2 = textApi.replaceSelection(
      `[${textHelpers.getSelectedText(state1)}](url)`
    );
    // Adjust the selection to not contain the **
    textApi.setSelectionRange({
      start:
        state2.selection.end - 6 - textHelpers.getSelectedText(state1).length,
      end: state2.selection.end - 6
    });
  }
};
