import * as React from "react";
import {Command} from "../types";
import {insertBeforeAndAfter} from "../util/MarkdownUtil";
import {getMarkdownStateFromDraftState, buildNewDraftState} from "../util/DraftUtil";

export const boldCommand: Command = {
    buttonContentBuilder: ({ iconProvider }) => iconProvider("bold"),

    buttonProps: { "aria-label": "Add bold text" },

    execute: (state) => {
        let mdState = getMarkdownStateFromDraftState(state);
        mdState = insertBeforeAndAfter(mdState, "**");
        return buildNewDraftState(state, mdState);
    },
};
