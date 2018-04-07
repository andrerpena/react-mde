import * as React from "react";
import {Command} from "../types";
import {insertText, selectWordIfCaretIsInsideOne} from "../util/MarkdownUtil";
import {MdeToolbarIcon} from "../components";

export const linkCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="link"/>,
    buttonProps: { "aria-label": "Insert a link" },
    execute:
        (getMarkdownState, setMarkdownState) => {
            const {text, selection} = getMarkdownState();
            const newSelection = selectWordIfCaretIsInsideOne({text, selection});
            const {newText, insertionLength} = insertText(text, "[", newSelection.start);
            const finalText = insertText(newText, "](url)", newSelection.end + insertionLength).newText;
            setMarkdownState({
                text: finalText,
                selection: {
                    start: newSelection.start + insertionLength,
                    end: newSelection.end + insertionLength,
                },
            });
        },
};
