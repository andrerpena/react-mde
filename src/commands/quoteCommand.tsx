import * as React from "react";
import { Command } from "../types";
import { TextApi, TextState } from "../types/CommandOptions";
import {getBreaksNeededForEmptyLineAfter, getBreaksNeededForEmptyLineBefore, selectWord} from "../util/MarkdownUtil";

export const quoteCommand: Command = {
    name: "quote",
    buttonContentBuilder: ({ iconProvider }) => iconProvider("quote-right"),
    buttonProps: { "aria-label": "Add bold text" },
    execute: (state0: TextState, api: TextApi) => {
        // Adjust the selection to encompass the whole word if the caret is inside one
        const newSelectionRange = selectWord({ text: state0.text, selection: state0.selection });
        const state1 = api.setSelectionRange(newSelectionRange);

        const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(state1.text, state1.selection.start);
        const breaksBefore = Array(breaksBeforeCount + 1).join("\n");

        const breaksAfterCount = getBreaksNeededForEmptyLineAfter(state1.text, state1.selection.end);
        const breaksAfter = Array(breaksAfterCount + 1).join("\n");

        // Replaces the current selection with the bold mark up
        const state2 = api.replaceSelection( `${breaksBefore}> ${state1.selectedText}${breaksAfter}`);
        // Adjust the selection to not contain the **
        api.setSelectionRange({
            start: state2.selection.end - state1.selectedText.length - breaksAfterCount,
            end: state2.selection.end - breaksAfterCount
        });
    },
    keyCommand: "quote",
};