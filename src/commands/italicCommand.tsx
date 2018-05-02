import * as React from "react";
import {Command} from "../types";
import {insertBeforeAndAfter} from "../util/MarkdownUtil";
import {buildNewDraftState, getMarkdownStateFromDraftState} from "../util/DraftUtil";
import {MdeToolbarIcon} from "../components";


export const italicCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="italic"/>,

    buttonProps: { "aria-label": "Add italic text" },

    execute: state => {
        let mdState = getMarkdownStateFromDraftState(state);
        mdState = insertBeforeAndAfter(mdState, "_");
        return buildNewDraftState(state, mdState);
    },
};
