import * as React from "react";
import { Command } from "../command";
import { textHelpers } from "../../helpers/textHelpers";

export const codeBlock: Command = {
  execute: async ({ textApi, initialState }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = textHelpers.selectWord({
      text: initialState.text,
      selection: initialState.selection
    });
    const state1 = textApi.setSelectionRange(newSelectionRange);

    // when there's no breaking line
    if (textHelpers.getSelectedText(state1).indexOf("\n") === -1) {
      textApi.replaceSelection(`\`${textHelpers.getSelectedText(state1)}\``);
      // Adjust the selection to not contain the **

      const selectionStart = state1.selection.start + 1;
      const selectionEnd =
        selectionStart + textHelpers.getSelectedText(state1).length;

      textApi.setSelectionRange({
        start: selectionStart,
        end: selectionEnd
      });
      return;
    }

    const breaksBeforeCount = textHelpers.getBreaksNeededForEmptyLineBefore(
      state1.text,
      state1.selection.start
    );
    const breaksBefore = Array(breaksBeforeCount + 1).join("\n");

    const breaksAfterCount = textHelpers.getBreaksNeededForEmptyLineAfter(
      state1.text,
      state1.selection.end
    );
    const breaksAfter = Array(breaksAfterCount + 1).join("\n");

    textApi.replaceSelection(
      `${breaksBefore}\`\`\`\n${textHelpers.getSelectedText(
        state1
      )}\n\`\`\`${breaksAfter}`
    );

    const selectionStart = state1.selection.start + breaksBeforeCount + 4;
    const selectionEnd =
      selectionStart + textHelpers.getSelectedText(state1).length;

    textApi.setSelectionRange({
      start: selectionStart,
      end: selectionEnd
    });
  }
};
