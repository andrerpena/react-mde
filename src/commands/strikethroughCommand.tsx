import * as React from "react";
import {Command} from "../types";
import {insertBeforeAndAfter} from "../util/MarkdownUtil";
import {MdeToolbarIcon} from "../components";

export const strikethroughCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="strikethrough"/>,
    buttonProps: { "aria-label": "Add strikethrough text" },
    execute:
        (getMarkdownState, setMarkdownState) => {
            setMarkdownState(insertBeforeAndAfter(getMarkdownState(), "~~"));
        },
};
