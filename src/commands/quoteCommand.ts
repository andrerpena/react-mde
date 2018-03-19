import {Command} from "../types";
import {
    insertBefore, insertBreaksAfterSoThatThereIsAnEmptyLineAfter,
    insertBreaksBeforeSoThatThereIsAnEmptyLineBefore,
    selectWordIfCaretIsInsideOne,
} from "../util/MarkdownUtil";

export const quoteCommand: Command = {
    icon: "quote-right",
    tooltip: "Insert a quote",
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

            textInsertion = insertBreaksAfterSoThatThereIsAnEmptyLineAfter(text, selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            setMarkdownState({
                text,
                selection,
            });
        },
};
