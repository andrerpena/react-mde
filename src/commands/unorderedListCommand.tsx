import * as React from "react";
import {Command} from "../types";
import {makeList} from "../util/MarkdownUtil";
import {MdeToolbarIcon} from "../components";

export const unorderedListCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="list-ul"/>,
    buttonProps: { "aria-label": "Insert a bulleted list" },
    execute: (getMarkdownState, setMarkdownState) => setMarkdownState(makeList(getMarkdownState(), "- ")),
};
