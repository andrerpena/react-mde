import * as React from "react";
import { Command } from "../command";
import { markdownHelpers } from "../../helpers/markdown-helpers";
import { TextController, TextState } from "../../types/CommandOptions";

function setHeader(
  initialState: TextState,
  api: TextController,
  prefix: string
) {
  // Adjust the selection to encompass the whole word if the caret is inside one
  const newSelectionRange = markdownHelpers.selectWord({
    text: initialState.text,
    selection: initialState.selection
  });
  const state1 = api.setSelectionRange(newSelectionRange);
  // Add the prefix to the selection
  const state2 = api.replaceSelection(`${prefix}${state1.selectedText}`);
  // Adjust the selection to not contain the prefix
  api.setSelectionRange({
    start: state2.selection.end - state1.selectedText.length,
    end: state2.selection.end
  });
}

export const header: Command = {
  execute: ({ initialState, textApi }) => {
    setHeader(initialState, textApi, "### ");
  }
};
