import * as React from "react";
import {Command} from "../types";
import {
    insertAfter,
    insertBefore,
    insertBeforeAndAfter, insertBreaksAfterSoThatThereIsAnEmptyLineAfter,
    insertBreaksBeforeSoThatThereIsAnEmptyLineBefore,
    selectWordIfCaretIsInsideOne,
} from "../util/MarkdownUtil";
import {MdeToolbarIcon} from "../components";

export const codeCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="code"/>,
    buttonProps: { "aria-label": "Insert code" },
    execute:
        (getMarkdownState, setMarkdownState) => {
            let {text, selection} = getMarkdownState();
            selection = selectWordIfCaretIsInsideOne({text, selection});

            if (text.slice(selection.start, selection.end).indexOf("\n") === -1) {
                // when there's no breaking line
                setMarkdownState(insertBeforeAndAfter({text, selection}, "`"));
                return;
            }
            let textInsertion;

            // insert breaks before, if needed
            textInsertion = insertBreaksBeforeSoThatThereIsAnEmptyLineBefore({text, selection});
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            // inserts ```\n before
            textInsertion = insertBefore(text, "```\n", selection, false);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            // inserts ```\n after
            textInsertion = insertAfter(text, "\n```", selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            // insert breaks after, if needed
            textInsertion = insertBreaksAfterSoThatThereIsAnEmptyLineAfter({text, selection});
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            setMarkdownState({text, selection});
        },
};
