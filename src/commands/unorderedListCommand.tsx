import * as React from "react";
import {Command} from "../types";
import {makeList} from "../util/MarkdownUtil";
import {buildNewDraftState, getMarkdownStateFromDraftState} from "../util/DraftUtil";
import {MdeToolbarIcon} from "../components";


export const unorderedListCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="list-ul"/>,

    buttonProps: { "aria-label": "Insert a bulleted list" },

    execute: state => {
        let mdState = getMarkdownStateFromDraftState(state);
        mdState = makeList(mdState, "- ");
        return buildNewDraftState(state, mdState);
    },
};
