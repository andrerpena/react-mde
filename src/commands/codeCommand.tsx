import * as React from "react";
import {Command} from "../types";
import {
    insertAfter,
    insertBefore,
    insertBeforeAndAfter, insertBreaksAfterSoThatThereIsAnEmptyLineAfter,
    insertBreaksBeforeSoThatThereIsAnEmptyLineBefore,
    selectWordIfCaretIsInsideOne,
} from "../util/MarkdownUtil";
import {buildNewDraftState, getMarkdownStateFromDraftState} from "../util/DraftUtil";

export const codeCommand: Command = {
    buttonContentBuilder: ({ iconProvider }) => iconProvider("code"),

    buttonProps: { "aria-label": "Insert code" },

    execute: (state) => {
        let {text, selection} = getMarkdownStateFromDraftState(state);
        selection = selectWordIfCaretIsInsideOne({text, selection});

        // when there's no breaking line
        if (text.slice(selection.start, selection.end).indexOf("\n") === -1) {
            const mdState = insertBeforeAndAfter({text, selection}, "`");
            return buildNewDraftState(state, mdState);
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

        return buildNewDraftState(state, {text, selection});
    },
};
