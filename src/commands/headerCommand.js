import React from "react";
import { selectWord } from "../util/MarkdownUtil";

function setHeader(state0, api, prefix) {
  // Adjust the selection to encompass the whole word if the caret is inside one
  const newSelectionRange = selectWord({
    text: state0.text,
    selection: state0.selection
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

export const headerCommand = {
  name: "header",
  buttonProps: { "aria-label": "Add header" },
  tooltip: "Add a header",
  children: [
    {
      name: "header-1",
      icon: () => <p className="header-1">Header 1</p>,
      execute: (state, api) => setHeader(state, api, "# ")
    },
    {
      name: "header-2",
      icon: () => <p className="header-2">Header 2</p>,
      execute: (state, api) => setHeader(state, api, "## ")
    },
    {
      name: "header-3",
      icon: () => <p className="header-3">Header 3</p>,
      execute: (state, api) => setHeader(state, api, "### ")
    },
    {
      name: "header-4",
      icon: () => <p className="header-4">Header 4</p>,
      execute: (state, api) => setHeader(state, api, "#### ")
    }
  ]
};
