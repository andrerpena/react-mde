import {Command} from "./Command";
import {MdeState} from "./MdeState";
import {CommandSet} from "./index";
import {EditorState} from "draft-js";

export interface LayoutProps {
    onChange: (editorState: EditorState) => void;
    onCommand: (command: Command) => void;
    commands?: Array<Array<Command | CommandSet>>;
    layoutOptions: any;
    mdeEditorState: MdeState
}