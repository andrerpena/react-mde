import * as React from "react";
import { Command } from "../command";
import { markdownHelpers } from "../../helpers/markdown-helpers";

export const code: Command = {
  execute: async ({ textApi, initialState }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = markdownHelpers.selectWord({
      text: initialState.text,
      selection: initialState.selection
    });
    const state1 = textApi.setSelectionRange(newSelectionRange);

    // when there's no breaking line
    if (state1.selectedText.indexOf("\n") === -1) {
      textApi.replaceSelection(`\`${state1.selectedText}\``);
      // Adjust the selection to not contain the **

      const selectionStart = state1.selection.start + 1;
      const selectionEnd = selectionStart + state1.selectedText.length;

      textApi.setSelectionRange({
        start: selectionStart,
        end: selectionEnd
      });
      return;
    }

    const breaksBeforeCount = markdownHelpers.getBreaksNeededForEmptyLineBefore(
      state1.text,
      state1.selection.start
    );
    const breaksBefore = Array(breaksBeforeCount + 1).join("\n");

    const breaksAfterCount = markdownHelpers.getBreaksNeededForEmptyLineAfter(
      state1.text,
      state1.selection.end
    );
    const breaksAfter = Array(breaksAfterCount + 1).join("\n");

    textApi.replaceSelection(
      `${breaksBefore}\`\`\`\n${state1.selectedText}\n\`\`\`${breaksAfter}`
    );

    const selectionStart = state1.selection.start + breaksBeforeCount + 4;
    const selectionEnd = selectionStart + state1.selectedText.length;

    textApi.setSelectionRange({
      start: selectionStart,
      end: selectionEnd
    });
  }
};
