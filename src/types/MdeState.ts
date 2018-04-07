import {EditorState} from "draft-js";

export interface MdeState {
    markdown?: string;
    html?: string;
    draftEditorState?: EditorState;
}
