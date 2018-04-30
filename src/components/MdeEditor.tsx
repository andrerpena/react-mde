import * as React from "react";
import {MdeState} from "../types";
import {Editor, EditorState} from "draft-js";

export interface MdeEditorProps {
    className?: string;
    onChange: (value: EditorState) => void;
    editorRef?: (ref: MdeEditor) => void;
    editorState: MdeState;
}

export class MdeEditor extends React.Component<MdeEditorProps, {}> {
    editorRef: Editor;

    handleOnChange = (editorState: EditorState) => {
        const {onChange} = this.props;
        onChange(editorState);
    }

    render() {
        const {editorState: {draftEditorState}, className} = this.props;
        return (
            <div className={`mde-text ${className || ""}`}>
                <Editor
                    ref={(editor) => this.editorRef = editor}
                    stripPastedStyles={true}
                    editorState={draftEditorState}
                    onChange={this.handleOnChange}
                />
            </div>
        );
    }
}
