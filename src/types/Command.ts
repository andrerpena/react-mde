import * as React from "react";
import {MarkdownState} from "./MarkdownState";

export interface Command {
    type?: string;
    icon?: React.ReactNode;
    tooltip?: string;
    execute: (getMarkdownState: () => MarkdownState, setMarkdownState: (state: MarkdownState) => void, lockEditor?: (lock: boolean) => void) => void;
}
