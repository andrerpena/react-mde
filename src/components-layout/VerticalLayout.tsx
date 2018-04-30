import * as React from "react";
import {Command} from "../types";
import {ReactMde} from "../ReactMde";
import {MdePreview, MdeEditor, MdeToolbar} from "../components";
import {LayoutProps} from "../types/LayoutProps";

export class VerticalLayout extends React.Component<LayoutProps, {}> {
    state = {
        showCode: true,
        showPreview: true,
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

    handleShowCode = () => {
        if (!this.state.showCode || this.state.showPreview)
            this.setState({showCode: !this.state.showCode});
    }

    handleShowPreview = () => {
        if (!this.state.showPreview || this.state.showCode)
            this.setState({showPreview: !this.state.showPreview});
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
        let stylePreview = null;
        let styleCode = null;
        if (this.state.showCode)
            styleTabCode += " mde-tab-activated";
        else
            stylePreview = "mde-preview-only";
        if (this.state.showPreview)
            styleTabPreview += " mde-tab-activated";
        else
            styleCode = "mde-text-only";

        return (
            <div className="react-mde-vertical-layout">
                <MdeToolbar
                    commands={commands}
                    onCommand={this.handleCommand}
                >
                    <div className="mde-tabs">
                        <button
                            className={styleTabCode}
                            onClick={this.handleShowCode}
                        >
                            Code
                        </button>
                        <button
                            className={styleTabPreview}
                            onClick={this.handleShowPreview}
                        >
                            Preview
                        </button>
                    </div>
                </MdeToolbar>
                <div className="react-mde-content">
                    {this.state.showCode &&
                        <MdeEditor
                            className={styleCode}
                            editorRef={(c) => this.editorRef = c}
                            onChange={this.handleMdeStateChange}
                            editorState={mdeEditorState}
                        />
                    }
                    {this.state.showPreview &&
                        <MdePreview
                            className={stylePreview}
                            previewRef={(c) => this.previewRef = c}
                            html={mdeEditorState ? mdeEditorState.html : ""}
                        />
                    }
                </div>
            </div>
        );
    }
}
