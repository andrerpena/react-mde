import * as React from "react";
import {Command} from "../types";
import {makeList} from "../util/MarkdownUtil";
import {MdeToolbarIcon} from "../components";

export const orderedListCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="list-ol"/>,
    buttonProps: { "aria-label": "Insert numbered list" },
    execute: (getMarkdownState, setMarkdownState) =>
        setMarkdownState(
            makeList(getMarkdownState(),
                (item: string, index: number) => `${index + 1}. `)),
};
