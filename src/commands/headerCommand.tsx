import * as React from "react";
import {Command} from "../types";
import {makeHeader} from "../util/MarkdownUtil";
import {buildNewDraftState, getMarkdownStateFromDraftState} from "../util/DraftUtil";
import {MdeToolbarIcon} from "../components";

function setHeader(state, str) {
    let mdState = getMarkdownStateFromDraftState(state);
    mdState = makeHeader(mdState, str);
    return buildNewDraftState(state, mdState);
}

export const headerCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="heading"/>,

    buttonProps: { "aria-label": "Add header" },

    children: [
        {
            buttonContent: <p className="header-1">Header 1</p>,
            execute: (state) => setHeader(state, "# "),
        },
        {
            buttonContent: <p className="header-2">Header 2</p>,
            execute: (state) => setHeader(state, "## "),
        },
        {
            buttonContent: <p className="header-3">Header 3</p>,
            execute: (state) => setHeader(state, "### "),
        },
        {
            buttonContent: <p className="header-4">Header 4</p>,
            execute: (state) => setHeader(state, "#### "),
        },
    ],
};
