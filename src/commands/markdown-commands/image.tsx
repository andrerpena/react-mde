import * as React from "react";
import { Command } from "../command";
import { textHelpers } from "../../helpers/textHelpers";

export const image: Command = {
  execute: ({ initialState, textApi }) => {
    // Replaces the current selection with the whole word selected
    const state1 = textApi.setSelectionRange(
      textHelpers.selectWord({
        text: initialState.text,
        selection: initialState.selection
      })
    );
    // Replaces the current selection with the image
    const imageTemplate =
      textHelpers.getSelectedText(state1) ||
      "https://example.com/your-image.png";
    textApi.replaceSelection(`![](${imageTemplate})`);
    // Adjust the selection to not contain the **
    textApi.setSelectionRange({
      start: state1.selection.start + 4,
      end: state1.selection.start + 4 + imageTemplate.length
    });
  }
};
