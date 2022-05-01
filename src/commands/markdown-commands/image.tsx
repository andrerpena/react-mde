import * as React from "react";
import { Command } from "../command";
import { markdownHelpers } from "../../helpers/markdown-helpers";

export const image: Command = {
  execute: ({ initialState, textApi }) => {
    // Replaces the current selection with the whole word selected
    const state1 = textApi.setSelectionRange(
      markdownHelpers.selectWord({
        text: initialState.text,
        selection: initialState.selection
      })
    );
    // Replaces the current selection with the image
    const imageTemplate =
      state1.selectedText || "https://example.com/your-image.png";
    textApi.replaceSelection(`![](${imageTemplate})`);
    // Adjust the selection to not contain the **
    textApi.setSelectionRange({
      start: state1.selection.start + 4,
      end: state1.selection.start + 4 + imageTemplate.length
    });
  }
};
