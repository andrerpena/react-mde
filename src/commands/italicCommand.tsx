import * as React from "react";
import {Command} from "../types";
import {insertBeforeAndAfter} from "../util/MarkdownUtil";
import {MdeToolbarIcon} from "../components";

export const italicCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="italic"/>,
    buttonProps: { "aria-label": "Add italic text" },
    execute:
        (getMarkdownState, setMarkdownState) => {
            setMarkdownState(insertBeforeAndAfter(getMarkdownState(), "_"));
        },
};
