import * as React from "react";
import {EditorState} from "draft-js";

export interface ButtonContentOptions {
  iconProvider: (iconName: string) => React.ReactNode;
}

export type ButtonContentBuilder = (options: ButtonContentOptions) => React.ReactNode;

export interface Command {
    buttonComponentClass: React.ComponentClass | string;
    buttonContentBuilder: ButtonContentBuilder;
    buttonProps?: any;
    children?: Command[];
    execute?: (EditorState, data?) => EditorState | Promise<EditorState>;
}
