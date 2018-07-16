import * as React from "react";
import {Command} from "../../src/types";
import {insertBeforeAndAfter, insertText} from "../../src/util/MarkdownUtil";
import {getMarkdownStateFromDraftState, buildNewDraftState} from "../../src/util/DraftUtil";
import ButtonComponent from "./ButtonComponent";
x
let myVal = "def";
const customCommand: Command = {

    buttonContentBuilder: ({ iconProvider }) => iconProvider("bold"),
    buttonProps: { "aria-label": "Add bold text" },
    execute: (state) => {
        const {text, selection} = getMarkdownStateFromDraftState(state);
        const {newText, insertionLength} = insertText(text, "![", selection.start);
        const finalText = insertText(newText, `](${myVal})`, selection.end + insertionLength).newText;

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
    CustomButtonComponent: ButtonComponent,
    setValues: (value) => {
        myVal = value;
    },
};

export default customCommand;
