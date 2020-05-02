import * as React from "react";
import { Command } from "../types";
import { selectWord } from "../util/MarkdownUtil";

export const boldCommand: Command = {
  name: "bold",
  buttonProps: { "aria-label": "Add bold text" },
  execute: ({ initialState, textApi }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: initialState.text,
      selection: initialState.selection
    });
    const state1 = textApi.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the bold mark up
    const state2 = textApi.replaceSelection(`**${state1.selectedText}**`);
    // Adjust the selection to not contain the **
    textApi.setSelectionRange({
      start: state2.selection.end - 2 - state1.selectedText.length,
      end: state2.selection.end - 2
    });
  },
  handleKeyCommand: e => (e.ctrlKey || e.metaKey) && e.key == "b"
};
