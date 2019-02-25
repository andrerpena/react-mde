import { Command, ButtonContentOptions } from "./Command";
import { MdeState } from "./MdeState";
import { EditorState } from "draft-js";
export interface LayoutProps {
    buttonContentOptions: ButtonContentOptions;
    onChange: (editorState: EditorState) => void;
    onCommand: (command: Command) => void;
    commands?: Command[][];
    layoutOptions: any;
    mdeEditorState: MdeState;
    emptyPreviewHtml: string;
    readOnly: boolean;
    otherProps?: any;
    onTabChange?: any;
    cleanHtml?: any;
}
