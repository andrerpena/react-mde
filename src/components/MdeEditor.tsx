import * as React from "react";
import {MdeState} from "../types";
import {Editor, EditorState} from "draft-js";
import {boldCommand, codeCommand, italicCommand, tabCommand} from "../commands";

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

    handleKeyCommand = (command, editorState) => {
        const {onChange} = this.props;
        switch (command) {
            case "bold":
                onChange(boldCommand.execute(editorState));
                return "handled";

            case "italic":
                onChange(italicCommand.execute(editorState));
                return "handled";

            case "code":
                onChange(codeCommand.execute(editorState));
                return "handled";

            default:
                return "not-handled";
        }
    }

    handleTab = (event) => {
        event.preventDefault();

        const {editorState: {draftEditorState}, onChange} = this.props;
        onChange(tabCommand.execute(draftEditorState, event.shiftKey));
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
                    onTab={this.handleTab}
                    handleKeyCommand={this.handleKeyCommand}
                />
            </div>
        );
    }
}
