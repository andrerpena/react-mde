import * as React from "react";
import {Command} from "../types";
import {onTab} from "../util/MarkdownUtil";
import {getMarkdownStateFromDraftState, buildNewDraftState} from "../util/DraftUtil";

export const tabCommand: Command = {
    buttonContentBuilder: () => null,
    buttonProps: null,

    execute: (state, reverse) => {
        let mdState = getMarkdownStateFromDraftState(state);
        mdState = onTab(mdState, reverse);
        return buildNewDraftState(state, mdState);
    },
};
