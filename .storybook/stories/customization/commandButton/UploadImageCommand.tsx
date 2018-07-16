import * as React from "react";
import {Command} from "../../../../src/types";
import {insertText} from "../../../../src/util/MarkdownUtil";
import {getMarkdownStateFromDraftState, buildNewDraftState} from "../../../../src/util/DraftUtil";
import ButtonComponent from "./ButtonComponent";

let myVal = "def";
const UploadImageCommand: Command = {

    buttonContentBuilder: ({iconProvider}) => iconProvider("bold"),
    buttonProps: {
        "aria-label": "Add bold text",
        "setValues": (value) => {
            myVal = value;
        },
    },
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
    buttonComponentClass: ButtonComponent,
};

export default UploadImageCommand;
