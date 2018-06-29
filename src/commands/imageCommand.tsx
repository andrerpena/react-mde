import * as React from "react";
import {Command} from "../types";
import {insertText} from "../util/MarkdownUtil";
import {buildNewDraftState, getMarkdownStateFromDraftState} from "../util/DraftUtil";

export const imageCommand: Command = {
    buttonContentBuilder: ({ iconProvider }) => iconProvider("image"),

    buttonProps: { "aria-label": "Insert a picture" },

    execute: (state) => {
        const {text, selection} = getMarkdownStateFromDraftState(state);
        const {newText, insertionLength} = insertText(text, "![", selection.start);
        const finalText = insertText(newText, "](image-url)", selection.end + insertionLength).newText;

        return buildNewDraftState(
            state,
            {
                text: finalText,
                selection: {
                    start: selection.start + insertionLength,
                    end: selection.end + insertionLength,
                },
            },
        );
    },
};
