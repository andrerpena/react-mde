import * as React from "react";
import {Command} from "../types";
import {insertBeforeAndAfter} from "../util/MarkdownUtil";
import {buildNewDraftState, getMarkdownStateFromDraftState} from "../util/DraftUtil";
import {MdeToolbarIcon} from "../components";


export const strikethroughCommand: Command = {
    buttonContent: <MdeToolbarIcon icon="strikethrough"/>,

    buttonProps: { "aria-label": "Add strikethrough text" },

    execute: state => {
        let mdState = getMarkdownStateFromDraftState(state);
        mdState = insertBeforeAndAfter(mdState, "~~");
        return buildNewDraftState(state, mdState);
    },
};
