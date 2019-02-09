import * as React from "react";
import {Command} from "../types";
import {TextApi, TextState} from "../types/CommandOptions";
import {getBreaksNeededForEmptyLineAfter, getBreaksNeededForEmptyLineBefore, selectWord} from "../util/MarkdownUtil";

export const codeCommand: Command = {
    name: "code",
    buttonContentBuilder: ({iconProvider}) => iconProvider("code"),
    buttonProps: {"aria-label": "Add bold text"},
    execute: (state0: TextState, api: TextApi) => {
        // Adjust the selection to encompass the whole word if the caret is inside one
        const newSelectionRange = selectWord({text: state0.text, selection: state0.selection});
        const state1 = api.setSelectionRange(newSelectionRange);

        // when there's no breaking line
        if (state1.selectedText.indexOf("\n") === -1) {
            const state2 = api.replaceSelection(`\`${state1.selectedText}\``);
            // Adjust the selection to not contain the **
            api.setSelectionRange({
                start: state2.selection.end - 1 - state1.selectedText.length,
                end: state2.selection.end - 1
            });
            return;
        }

        const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(state1.text, state1.selection.start);
        const breaksBefore = Array(breaksBeforeCount + 1).join("\n");

        const breaksAfterCount = getBreaksNeededForEmptyLineAfter(state1.text, state1.selection.end);
        const breaksAfter = Array(breaksAfterCount + 1).join("\n");

        const state2 = api.replaceSelection(`${breaksBefore}\`\`\`\n${state1.selectedText}\n\`\`\`${breaksAfter}`);
        // Adjust the selection to not contain the **
        api.setSelectionRange({
            start: state2.selection.end - 1 - state1.selectedText.length - breaksAfterCount - 3,
            end: state2.selection.end - 1 - breaksAfterCount - 3
        });
    }
    ,
    keyCommand: "code",
}