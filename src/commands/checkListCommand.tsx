import * as React from "react";
import {Command} from "../types";
import {makeList} from "../util/MarkdownUtil";
import {buildNewDraftState, getMarkdownStateFromDraftState} from "../util/DraftUtil";
import {MdeToolbarIcon} from "../components";


export const checkListCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="tasks"/>,

    buttonProps: { "aria-label": "Insert checklist" },

    execute: state => {
        let mdState = getMarkdownStateFromDraftState(state);
        mdState = makeList(mdState, "- [ ] ");
        return buildNewDraftState(state, mdState);
    },
};
