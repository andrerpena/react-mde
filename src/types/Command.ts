import * as React from "react";
import {MarkdownState} from "./MarkdownState";
import {EditorState} from "draft-js";

export interface Command {
    buttonContent: React.ReactNode;
    buttonProps?: any;
    children?: Command[];
    execute?: (EditorState, data?) => EditorState | Promise<EditorState>;
}
