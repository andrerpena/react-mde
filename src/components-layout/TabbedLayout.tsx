import * as React from "react";
import {Command} from "../types";
import {ReactMde} from "../ReactMde";
import {MdePreview, MdeEditor, MdeToolbar} from "../components";
import {LayoutProps} from "../types/LayoutProps";


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

        const { commands, mdeEditorState } = this.props;

        let styleTabCode = "mde-tab";
        let styleTabPreview = "mde-tab";
        switch (this.state.tab) {
            case TAB_CODE: styleTabCode += " mde-tab-activated"; break;
            case TAB_PREVIEW: styleTabPreview += " mde-tab-activated"; break;
        }

        return (
            <div className="react-mde-tabbed-layout">
                <MdeToolbar
                    commands={commands}
                    onCommand={this.handleCommand}
                >
                    <div className="mde-tabs">
                        <button
                            className={styleTabCode}
                            onClick={() => this.setState({tab: TAB_CODE})}
                        >
                            Code
                        </button>
                        <button
                            className={styleTabPreview}
                            onClick={() => this.setState({tab: TAB_PREVIEW})}
                        >
                            Preview
                        </button>
                    </div>
                </MdeToolbar>
                {
                    this.state.tab === TAB_CODE ?
                        <MdeEditor
                            editorRef={(c) => this.editorRef = c}
                            onChange={this.handleMdeStateChange}
                            editorState={mdeEditorState}
                        />
                    :
                        < MdePreview
                            previewRef={(c) => this.previewRef = c}
                            html={mdeEditorState ? mdeEditorState.html : ""}
                        />
                }
            </div>
        );
    }
}
