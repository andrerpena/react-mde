import * as React from "react";
import { Command, ButtonContentOptions } from "../types";
import { MdeEditor } from "./index";
export interface MdeToolbarProps {
    buttonContentOptions: ButtonContentOptions;
    commands: Command[][];
    onCommand: (command: Command) => void;
    readOnly: boolean;
    mdeEditorState?: MdeEditor;
    otherProps?: any;
}
export declare const MdeToolbar: React.SFC<MdeToolbarProps>;
