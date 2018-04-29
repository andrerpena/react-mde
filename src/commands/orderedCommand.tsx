import * as React from "react";
import {Command} from "../types";
import {makeList} from "../util/MarkdownUtil";
import {buildNewDraftState, getMarkdownStateFromDraftState} from "../util/DraftUtil";
import {MdeToolbarIcon} from "../components";


export const orderedListCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="list-ol"/>,

    buttonProps: { "aria-label": "Insert numbered list" },

    execute: state => {
        let mdState = getMarkdownStateFromDraftState(state);
        mdState = makeList(mdState, (item, index) => `${index + 1}. `);
        return buildNewDraftState(state, mdState);
    },
};
