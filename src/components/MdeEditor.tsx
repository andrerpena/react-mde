import * as React from "react";
import { Editor, EditorState, EditorProps, DraftHandleValue } from "draft-js";
import { buildNewDraftState, getMarkdownStateFromDraftState } from "../util/DraftUtil";
import { addTab } from "../util/MarkdownUtil";


export interface MdeEditorProps {
  className?: string;
  onChange: (value: EditorState) => void;
  editorRef?: (ref: MdeEditor) => void;
  editorState: EditorState;
  readOnly: boolean;
  draftEditorProps: Partial<EditorProps>;
  handleKeyCommand: (command: string, editorState: EditorState) => DraftHandleValue;
  height: number;
}

export class MdeEditor extends React.Component<MdeEditorProps, {}> {
  editorRef: Editor;

  handleOnChange = (editorState: EditorState) => {
    const { onChange } = this.props;
    onChange(editorState);
  };

  handleTab = event => {
    event.preventDefault();
    const { editorState } = this.props;
    let mdState = getMarkdownStateFromDraftState(editorState);
    mdState = addTab(mdState, event.shiftKey);
    const newDraftState = buildNewDraftState(editorState, mdState);
    this.handleOnChange(newDraftState);
  };

  render() {
    const {
      editorState,
      className,
      readOnly,
      draftEditorProps,
      handleKeyCommand,
      height
    } = this.props;
    return (
      <div className={`mde-text ${className || ""}`} style={{height}}>
        <Editor
          ref={editor => (this.editorRef = editor)}
          stripPastedStyles={true}
          editorState={editorState}
          onChange={this.handleOnChange}
          onTab={this.handleTab}
          handleKeyCommand={handleKeyCommand}
          readOnly={readOnly}
          {...draftEditorProps}
        />
      </div>
    );
  }
}
