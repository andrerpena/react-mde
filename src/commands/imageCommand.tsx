import * as React from "react";
import {Command} from "../types";
import {TextApi, TextState} from "../types/CommandOptions";
import {selectWord} from "../util/MarkdownUtil";

export const imageCommand: Command = {
    name: "image",
    buttonContentBuilder: ({iconProvider}) => iconProvider("image"),
    buttonProps: {"aria-label": "Add image"},
    execute: (state0: TextState, api: TextApi) => {
        // Adjust the selection to encompass the whole word if the caret is inside one
        const newSelectionRange = selectWord({text: state0.text, selection: state0.selection});
        const state1 = api.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the bold mark up
        const state2 = api.replaceSelection(`![${state1.selectedText}](image-url)`);
        // Adjust the selection to not contain the **
        api.setSelectionRange({
            start: state2.selection.end - 12 - state1.selectedText.length,
            end: state2.selection.end - 12
        });
    },
    keyCommand: "image",
};