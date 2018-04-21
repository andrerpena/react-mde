import * as React from "react";
import {Command} from "../types";
import {makeList} from "../util/MarkdownUtil";
import {MdeToolbarIcon} from "../components";

export const checkListCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="tasks"/>,
    buttonProps: { "aria-label": "Insert checklist" },
    execute: (getMarkdownState, setMarkdownState) => setMarkdownState(makeList(getMarkdownState(), "- [ ] ")),
};
