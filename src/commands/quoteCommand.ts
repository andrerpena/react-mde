import {
    insertBefore, insertBreaksAfterSoThatThereIsAnEmptyLineAfter, insertBreaksBeforeSoThatThereIsAnEmptyLineBefore,
    selectCurrentWordIfCaretIsInsideOne,
} from "../helpers/ReactMdeTextHelper";
import {Command, TextSelection} from "../types";

export const quoteCommand: Command = {
    icon: "quote-right",
    tooltip: "Insert a quote",
    execute:
        (text: string, selection: TextSelection) => {
            selection = selectCurrentWordIfCaretIsInsideOne(text, selection);

            let textInsertion;

            textInsertion = insertBreaksBeforeSoThatThereIsAnEmptyLineBefore(text, selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            textInsertion = insertBefore(text, "> ", selection, false);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            textInsertion = insertBreaksAfterSoThatThereIsAnEmptyLineAfter(text, selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            return {
                text,
                selection,
            };
        },
};
