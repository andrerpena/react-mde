import * as React from "react";
import { Command } from "../types";
import { TextApi, TextState } from "../types/CommandOptions";
import { selectWord } from "../util/MarkdownUtil";

export const boldCommand: Command = {
  buttonContentBuilder: ({ iconProvider }) => iconProvider("bold"),
  buttonProps: { "aria-label": "Add bold text" },
  execute: (initialState: TextState, api: TextApi) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    let state = api.setSelectionRange(selectWord({ text: initialState.text, selection: initialState.selection }));
    // Replaces the current selection with the bold mark up
    state = api.replaceSelection(`**${state.selectedText}**`);
    // Adjust the selection to not contain the **
    api.setSelectionRange({ start: state.selection.start + 2, end: state.selection.end + 2 });
  },
  keyCommand: "bold"
};
