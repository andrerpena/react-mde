import * as React from "react";
import {Command, LayoutProps} from "../types";
import {ReactMde} from "../ReactMde";
import {MdePreview, MdeEditor, MdeToolbar} from "../components";
import * as classNames from "classnames";

export interface HorizontalLayoutOptions {
    displayToggleButtons: boolean;
}

const defaultLayoutOptions: HorizontalLayoutOptions = {
    displayToggleButtons: false,
};

export class HorizontalLayout extends React.Component<LayoutProps, {}> {
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
        const {onCommand} = this.props;
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
        const {commands, mdeEditorState, layoutOptions} = this.props;
        const finalLayoutOptions = layoutOptions
            ? {...defaultLayoutOptions, ...layoutOptions}
            : defaultLayoutOptions;

        return (
            <div className="react-mde-horizontal-layout">
                <MdeToolbar
                    commands={commands}
                    onCommand={this.handleCommand}
                >
                    {finalLayoutOptions.displayToggleButtons && <div className="mde-tabs">
                        <button
                            className={classNames({
                                "mde-tab": true,
                                "mde-tab-activated": this.state.showCode,
                            })}
                            onClick={this.handleShowCode}
                        >
                            Code
                        </button>
                        <button
                            className={classNames({
                                "mde-tab": true,
                                "mde-tab-activated": this.state.showPreview,
                            })}
                            onClick={this.handleShowPreview}
                        >
                            Preview
                        </button>
                    </div>}
                </MdeToolbar>
                <div className="mde-content">
                    {this.state.showCode &&
                    <MdeEditor
                        editorRef={(c) => this.editorRef = c}
                        onChange={this.handleMdeStateChange}
                        editorState={mdeEditorState}
                    />
                    }
                    {this.state.showPreview &&
                    <MdePreview
                        className={classNames({
                            "mde-preview-only": !this.state.showCode,
                        })}
                        previewRef={(c) => this.previewRef = c}
                        html={mdeEditorState ? mdeEditorState.html : ""}
                    />
                    }
                </div>
            </div>
        );
    }
}
