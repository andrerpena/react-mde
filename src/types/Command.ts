import * as React from "react";
import {MarkdownState} from "./MarkdownState";
import {EditorState} from "draft-js";

type Execute = (EditorState, data?) => EditorState;
type ExecutePromise = (EditorState, data?) => Promise<EditorState>;

export interface ButtonContentOptions {
  iconProvider: (iconName: string) => React.ReactNode;
}

export type ButtonContentBuilder = (options: ButtonContentOptions) => React.ReactNode;

export interface Command {
    buttonContentBuilder: ButtonContentBuilder;
    buttonProps?: any;
    children?: Command[];
    execute?: Execute | ExecutePromise;
}
