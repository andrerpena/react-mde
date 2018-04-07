import {Command} from "./Command";
import {MdeState} from "./MdeState";
import {EditorState} from "draft-js";

export interface LayoutProps {
    onChange: (editorState: EditorState) => void;
    onCommand: (command: Command) => void;
    commands?: Command[][];
    layoutOptions: any;
    mdeEditorState: MdeState;
}
