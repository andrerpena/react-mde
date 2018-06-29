import * as React from "react";
import {Command} from "../types";
import {insertText, selectWordIfCaretIsInsideOne} from "../util/MarkdownUtil";
import {buildNewDraftState, getMarkdownStateFromDraftState} from "../util/DraftUtil";

export const linkCommand: Command = {
    buttonContentBuilder: ({ iconProvider }) => iconProvider("link"),

    buttonProps: { "aria-label": "Insert a link" },

    execute: (state) => {
        const {text, selection} = getMarkdownStateFromDraftState(state);
        const newSelection = selectWordIfCaretIsInsideOne({text, selection});
        const {newText, insertionLength} = insertText(text, "[", newSelection.start);
        const finalText = insertText(newText, "](url)", newSelection.end + insertionLength).newText;

        return buildNewDraftState(
            state,
            {
                text: finalText,
                selection: {
                    start: newSelection.start + insertionLength,
                    end: newSelection.end + insertionLength,
                },
            },
        );
    },
};
