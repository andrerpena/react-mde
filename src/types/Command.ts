import * as React from "react";
import { MarkdownState } from "./MarkdownState";
import { EditorState } from "draft-js";

export interface Command {
    type?: string;
    icon?: React.ReactNode;
    tooltip?: string;
    execute: (
        getMarkdownState: () => MarkdownState,
        setMarkdownState: (state: MarkdownState) => void,
        getEditorState?: () => EditorState,
        setEditorState?: (state: EditorState) => void,
        lockEditor?: (lock: boolean) => void,
    ) => void;
}
