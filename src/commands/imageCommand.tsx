import * as React from "react";
import { Command } from "../types";
import { selectWord } from "../util/MarkdownUtil";

export const imageCommand: Command = {
  name: "image",
  buttonProps: { "aria-label": "Add image" },
  execute: ({ initialState, textApi }) => {
    // Select everything
    const newSelectionRange = selectWord({
      text: initialState.text,
      selection: initialState.selection
    });
    const state1 = textApi.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the image
    const imageTemplate =
      state1.selectedText || "https://example.com/your-image.png";
    textApi.replaceSelection(`![](${imageTemplate})`);
    // Adjust the selection to not contain the **
    textApi.setSelectionRange({
      start: 4 + state1.selection.start,
      end: 4 + state1.selection.start + imageTemplate.length
    });
  }
};
