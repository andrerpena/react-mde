import * as React from "react";
import { MarkdownState } from "./MarkdownState";
import { EditorState } from "draft-js";

export interface Command {
    buttonContent: React.ReactNode;
    buttonProps?: any;
    children?: Command[];
    execute?: (
        getMarkdownState: () => MarkdownState,
        setMarkdownState: (state: MarkdownState) => void,
        getEditorState?: () => EditorState,
        setEditorState?: (state: EditorState) => void,
    ) => void;
}
