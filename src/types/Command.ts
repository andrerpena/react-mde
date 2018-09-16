import * as React from "react";
import { EditorState } from "draft-js";

export interface ButtonContentOptions {
  iconProvider: (iconName: string) => React.ReactNode;
}

export type ButtonContentBuilder = (options: ButtonContentOptions) => React.ReactNode;

export interface Command {
    buttonComponentClass?: React.ComponentClass | string;
    buttonContentBuilder: ButtonContentBuilder;
    buttonProps?: any;
    children?: Command[];
    execute?: (EditorState, data?) => EditorState;
    // Draft.js triggers Key Commands. the keyCommand property determines
    // which Draft.js key command should be handled by this react-mde command
    keyCommand?: string
}
