import * as React from "react";
import { Command, LayoutProps } from "../types";
import { ReactMde } from "../ReactMde";
import { MdePreview, MdeEditor, MdeToolbar } from "../components";

export class NoPreviewLayout extends React.Component<LayoutProps, {}> {
  editorRef: MdeEditor;
  previewRef: MdePreview;

  /**
   * Handler for the textArea value change
   * @memberOf ReactMde
   */
  handleMdeStateChange = value => {
    const { onChange } = this.props;
    onChange(value);
  };

  handleCommand = (command: Command) => {
    const { onCommand } = this.props;
    onCommand(command);
  };

  /**
   * Renders react-mde
   * @returns
   * @memberOf ReactMde
   */
  render() {
    const {
      buttonContentOptions,
      commands,
      mdeEditorState,
      readOnly,
      draftEditorProps
    } = this.props;

    return (
      <div className="react-mde-no-preview-layout">
        <MdeToolbar
          buttonContentOptions={buttonContentOptions}
          commands={commands}
          onCommand={this.handleCommand}
          readOnly={readOnly}
        />
        <MdeEditor
          editorRef={c => (this.editorRef = c)}
          onChange={this.handleMdeStateChange}
          editorState={mdeEditorState}
          readOnly={readOnly}
          draftEditorProps={draftEditorProps}
        />
      </div>
    );
  }
}
