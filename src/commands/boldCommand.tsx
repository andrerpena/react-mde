import * as React from "react";
import {Command} from "../types";
import {insertBeforeAndAfter} from "../util/MarkdownUtil";
import {MdeToolbarIcon} from "../components";

export const boldCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="bold"/>,
    buttonProps: { "aria-label": "Add bold text" },
    execute:
        (getMarkdownState, setMarkdownState) => {
            setMarkdownState(insertBeforeAndAfter(getMarkdownState(), "**"));
        },
};
