import * as React from "react";
import { TextApi, TextState } from "./CommandOptions";

export interface ButtonContentOptions {
  iconProvider: (iconName: string) => React.ReactNode;
}

export type ButtonContentBuilder = (options: ButtonContentOptions) => React.ReactNode;

export interface Command {
    name: string,
    buttonComponentClass?: React.ComponentClass | string;
    buttonContentBuilder: ButtonContentBuilder;
    buttonProps?: any;
    children?: Command[];
    execute?: (state: TextState, api: TextApi) => void;
    // Draft.js triggers Key Commands. the keyCommand property determines
    // which Draft.js key command should be handled by this react-mde command
    keyCommand?: string
}
