import * as React from "react";
import { Command } from "../types";
import { TextApi, TextState } from "..";
import { selectWord } from "../util/MarkdownUtil";

export const imageCommand: Command = {
  name: "image",
  buttonProps: { "aria-label": "Add image" },
  execute: (state0: TextState, api: TextApi) => {
    // Select everything
    const newSelectionRange = selectWord({
      text: state0.text,
      selection: state0.selection
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the image
    const imageTemplate =
      state1.selectedText || "https://example.com/your-image.png";
    api.replaceSelection(`![](${imageTemplate})`);
    // Adjust the selection to not contain the **
    api.setSelectionRange({
      start: 4 + state1.selection.start,
      end: 4 + state1.selection.start + imageTemplate.length
    });
  },
  keyCommand: "image"
};
