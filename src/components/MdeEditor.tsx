import * as React from "react";
import { MdeState, Command } from "../types";
import { Editor, EditorState, EditorProps } from "draft-js";
import {
  boldCommand,
  codeCommand,
  italicCommand,
  tabCommand
} from "../commands";

export interface MdeEditorProps {
  className?: string;
  onChange: (value: EditorState) => void;
  editorRef?: (ref: MdeEditor) => void;
  editorState: MdeState;
  readOnly: boolean;
  draftEditorProps: Partial<EditorProps>;
}

export class MdeEditor extends React.Component<MdeEditorProps, {}> {
  editorRef: Editor;

  handleOnChange = (editorState: EditorState) => {
    const { onChange } = this.props;
    onChange(editorState);
  };

  executeCastAsEditorState = (
    commandToExecute: Command,
    editorState: EditorState,
    data?: any
  ): EditorState => {
    const newEditorState = commandToExecute.execute(
      editorState,
      data
    ) as EditorState;
    return newEditorState;
  };

  // TODO: remove this
  handleKeyCommand = (command, editorState) => {
    const { onChange } = this.props;
    switch (command) {
      case "bold":
        onChange(this.executeCastAsEditorState(boldCommand, editorState));
        return "handled";

      case "italic":
        onChange(this.executeCastAsEditorState(italicCommand, editorState));
        return "handled";

      case "code":
        onChange(this.executeCastAsEditorState(codeCommand, editorState));
        return "handled";

      default:
        return "not-handled";
    }
  };

  handleTab = event => {
    event.preventDefault();

    const {
      editorState: { draftEditorState },
      onChange
    } = this.props;
    onChange(
      this.executeCastAsEditorState(
        tabCommand,
        draftEditorState,
        event.shiftKey
      )
    );
  };

  render() {
    const {
      editorState: { draftEditorState },
      className,
      readOnly,
      draftEditorProps
    } = this.props;
    return (
      <div className={`mde-text ${className || ""}`}>
        <Editor
          ref={editor => (this.editorRef = editor)}
          stripPastedStyles={true}
          editorState={draftEditorState}
          onChange={this.handleOnChange}
          onTab={this.handleTab}
          handleKeyCommand={this.handleKeyCommand}
          readOnly={readOnly}
          {...draftEditorProps}
        />
      </div>
    );
  }
}
