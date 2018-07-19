import * as React from "react";
import { EditorState } from "draft-js";
export interface ButtonContentOptions {
    iconProvider: (iconName: string) => React.ReactNode;
}
export declare type ButtonContentBuilder = (options: ButtonContentOptions) => React.ReactNode;
export interface Command {
    buttonContentBuilder: ButtonContentBuilder;
    buttonProps?: any;
    children?: Command[];
    execute?: (EditorState: any, data?: any) => EditorState | Promise<EditorState>;
    CustomButtonComponent?: any;
    setValues?: any;
}
//# sourceMappingURL=Command.d.ts.map