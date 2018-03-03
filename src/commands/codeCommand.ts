import {
    insertAfter,
    insertBefore, insertBreaksAfterSoThatThereIsAnEmptyLineAfter, insertBreaksBeforeSoThatThereIsAnEmptyLineBefore,
    selectCurrentWordIfCaretIsInsideOne
} from "../helpers/ReactMdeTextHelper";
import {Command, TextSelection} from "../types";
import {makeACommandThatInsertsBeforeAndAfter} from "../helpers/ReactMdeCommandHelper";

export const codeCommand: Command = {
    icon: "code",
    tooltip: "Insert code",
    execute:
        (text = "", selection: TextSelection) => {
            selection = selectCurrentWordIfCaretIsInsideOne(text, selection);

            if (text.slice(selection.start, selection.end).indexOf("\n") === -1) {
                // when there's no breaking line
                return makeACommandThatInsertsBeforeAndAfter(text, selection, "`");
            }
            let textInsertion;

            // insert breaks before, if needed
            textInsertion = insertBreaksBeforeSoThatThereIsAnEmptyLineBefore(text, selection);
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
            textInsertion = insertBreaksAfterSoThatThereIsAnEmptyLineAfter(text, selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            return {text, selection};
        },
};