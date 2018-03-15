import * as React from "react";
import { MarkdownState } from "./MarkdownState";
import { EditorState } from "draft-js";

export interface Command {
    icon?: React.ReactNode;
    text?: React.ReactNode;
    tooltip?: string;
    className?: string;
    commands?: Command[];
    execute?: (
        getMarkdownState: () => MarkdownState,
        setMarkdownState: (state: MarkdownState) => void,
        getEditorState?: () => EditorState,
        setEditorState?: (state: EditorState) => void,
        lockEditor?: (lock: boolean) => void,
    ) => void;
}
