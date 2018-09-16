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

        const { buttonContentOptions, commands, editorState, emptyPreviewHtml, readOnly } = this.props;

        let styleTabCode = "mde-tab";
        let styleTabPreview = "mde-tab";
        switch (this.state.tab) {
            case TAB_CODE: styleTabCode += " mde-tab-activated"; break;
            case TAB_PREVIEW: styleTabPreview += " mde-tab-activated"; break;
        }

        return (

        );
    }
}
