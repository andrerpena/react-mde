import * as React from "react";
import {Command, LayoutProps} from "../types";
import {ReactMde} from "../ReactMde";
import {MdePreview, MdeEditor, MdeToolbar} from "../components";

export const TAB_CODE: string = "TAB_CODE";
export const TAB_PREVIEW: string = "TAB_PREVIEW";

export class TabbedLayout extends React.Component<LayoutProps, {}> {
    state = {
        tab: TAB_CODE,
    };

    editorRef: MdeEditor;
    previewRef: MdePreview;

    /**
     * Handler for the textArea value change
     * @memberOf ReactMde
     */
    handleMdeStateChange = (value) => {
        const {onChange} = this.props;
        onChange(value);
    }

    handleCommand = (command: Command) => {
        const { onCommand } = this.props;
        onCommand(command);
    }

    /**
     * Renders react-mde
     * @returns
     * @memberOf ReactMde
     */
    render() {

        const { buttonContentOptions, commands, mdeEditorState, emptyPreviewHtml, readOnly, otherProps } = this.props;

        let styleTabCode = "mde-tab";
        let styleTabPreview = "mde-tab";
        const isReadOnly = readOnly || this.state.tab === TAB_PREVIEW;
        const allCommands = isReadOnly ? [] : commands;
        const currentTab = readOnly ? TAB_PREVIEW : this.state.tab;
        const disableCodeButton = readOnly;
        if (currentTab === TAB_CODE) {
            styleTabCode += " mde-tab-activated";
        } else {
            styleTabPreview += " mde-tab-activated";
        }

        return (
            <div className="react-mde-tabbed-layout">
                <MdeToolbar
                    buttonContentOptions={buttonContentOptions}
                    commands={allCommands}
                    onCommand={this.handleCommand}
                    readOnly={isReadOnly}
                    otherProps={otherProps}
                >
                    <div className="mde-tabs">
                        <button
                            type="button"
                            className={styleTabCode}
                            onClick={() => this.setState({tab: TAB_CODE})}
                            disabled={disableCodeButton}
                        >
                            Code
                        </button>
                        <button
                            type="button"
                            className={styleTabPreview}
                            onClick={() => this.setState({tab: TAB_PREVIEW})}
                        >
                            Preview
                        </button>
                    </div>
                </MdeToolbar>
                {
                    currentTab === TAB_CODE ?
                        <MdeEditor
                            editorRef={(c) => this.editorRef = c}
                            onChange={this.handleMdeStateChange}
                            editorState={mdeEditorState}
                            readOnly={readOnly}
                        />
                    :
                        < MdePreview
                            previewRef={(c) => this.previewRef = c}
                            html={mdeEditorState ? mdeEditorState.html : ""}
                            emptyPreviewHtml={emptyPreviewHtml}
                        />
                }
            </div>
        );
    }
}
