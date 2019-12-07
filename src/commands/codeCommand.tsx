import * as React from "react";
import {Command} from "../types";
import {TextApi, TextState} from "..";
import {getBreaksNeededForEmptyLineAfter, getBreaksNeededForEmptyLineBefore, selectWord} from "../util/MarkdownUtil";

export const codeCommand: Command = {
    name: "code",
    buttonProps: {"aria-label": "Insert code"},
    execute: (state0: TextState, api: TextApi) => {
        // Adjust the selection to encompass the whole word if the caret is inside one
        const newSelectionRange = selectWord({text: state0.text, selection: state0.selection});
        const state1 = api.setSelectionRange(newSelectionRange);

        // when there's no breaking line
        if (state1.selectedText.indexOf("\n") === -1) {
            api.replaceSelection(`\`${state1.selectedText}\``);
            // Adjust the selection to not contain the **

            const selectionStart = state1.selection.start + 1;
            const selectionEnd = selectionStart + state1.selectedText.length;

            api.setSelectionRange({
                start: selectionStart,
                end: selectionEnd
            });
            return;
        }

        const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(state1.text, state1.selection.start);
        const breaksBefore = Array(breaksBeforeCount + 1).join("\n");

        const breaksAfterCount = getBreaksNeededForEmptyLineAfter(state1.text, state1.selection.end);
        const breaksAfter = Array(breaksAfterCount + 1).join("\n");

        api.replaceSelection(`${breaksBefore}\`\`\`\n${state1.selectedText}\n\`\`\`${breaksAfter}`);

        const selectionStart = state1.selection.start + breaksBeforeCount + 4;
        const selectionEnd = selectionStart + state1.selectedText.length;

        api.setSelectionRange({
            start: selectionStart,
            end: selectionEnd
        });
    }
    ,
    keyCommand: "code",
}
