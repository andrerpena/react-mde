import * as React from "react";
import {Command} from "../types";
import {
    insertBefore, insertBreaksAfterSoThatThereIsAnEmptyLineAfter,
    insertBreaksBeforeSoThatThereIsAnEmptyLineBefore,
    selectWordIfCaretIsInsideOne,
} from "../util/MarkdownUtil";
import {MdeToolbarIcon} from "../components";

export const quoteCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="quote-right"/>,
    buttonProps: { "aria-label": "Insert a quote" },
    execute:
        (getMarkdownState, setMarkdownState) => {
            let {text, selection} = getMarkdownState();
            selection = selectWordIfCaretIsInsideOne({text, selection});

            let textInsertion;

            textInsertion = insertBreaksBeforeSoThatThereIsAnEmptyLineBefore({text, selection});
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            textInsertion = insertBefore(text, "> ", selection, false);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            textInsertion = insertBreaksAfterSoThatThereIsAnEmptyLineAfter({text, selection});
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            setMarkdownState({
                text,
                selection,
            });
        },
};
