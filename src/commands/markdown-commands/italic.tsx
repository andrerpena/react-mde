import * as React from "react";
import { Command } from "../command";
import { markdownHelpers } from "../../helpers/markdown-helpers";

export const italic: Command = {
  execute: ({ initialState, textApi }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = markdownHelpers.selectWord({
      text: initialState.text,
      selection: initialState.selection
    });
    const state1 = textApi.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the italic mark up
    const state2 = textApi.replaceSelection(`*${state1.selectedText}*`);
    // Adjust the selection to not contain the *
    textApi.setSelectionRange({
      start: state2.selection.end - 1 - state1.selectedText.length,
      end: state2.selection.end - 1
    });
  }
};
