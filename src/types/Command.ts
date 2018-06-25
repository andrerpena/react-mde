import * as React from "react";
import {MarkdownState} from "./MarkdownState";
import {EditorState} from "draft-js";

type Execute = (EditorState, data?) => EditorState;
type ExecutePromise = (EditorState, data?) => Promise<EditorState>;

export interface Command {
    buttonContent: React.ReactNode;
    buttonProps?: any;
    children?: Command[];
    execute?: Execute | ExecutePromise;
}
