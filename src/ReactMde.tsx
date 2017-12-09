import * as React from "react";

import {
    getSelection,
} from "./helpers/ReactMdeSelectionHelper";
import { Command, CommandSet, Value } from "./types";
import { ReactMdeToolbar } from "./ReactMdeToolbar";
import { ReactMdeTextArea } from "./ReactMdeTextArea";
import { ReactMdePreview } from "./ReactMdePreview";

export interface ReactMdeVisibility {
    toolbar?: boolean;
    textarea?: boolean;
    preview?: boolean;
    previewHelp?: boolean;
}

export interface ReactMdeProps {
    commands: Array<Array<Command | CommandSet>>;
    value: Value;
    onChange: (value: Value) => void;
    textAreaProps?: any;
    showdownOptions?: any;
    visibility?: ReactMdeVisibility;
}

export class ReactMde extends React.Component<ReactMdeProps> {

    textArea: HTMLTextAreaElement;
    preview: HTMLDivElement;

    static defaultProps: Partial<ReactMdeProps> = {
        visibility: {
            toolbar: true,
            textarea: true,
            preview: true,
            previewHelp: true,
        },
    };

    /**
     * Handler for the textArea value change
     * @memberOf ReactMde
     */
    handleValueChange = (value) => {
        const {onChange} = this.props;
        onChange(value);
    }

    /**
     * Executes a command
     * @memberOf ReactMde
     */
    handleCommand = async (command: Command) => {
        const {value: {text}, onChange} = this.props;
        let newValue = command.execute(text, getSelection(this.textArea));
        if (newValue instanceof Promise) {
            newValue = await newValue;
        }
        // This is necessary because otherwise, when the value is reset, the scroll will jump to the end
        newValue.scrollTop = this.textArea.scrollTop;
        onChange(newValue);
    }

    /**
     * Renders react-mde
     * @returns
     * @memberOf ReactMde
     */
    render() {
        const {
            value,
            commands,
            textAreaProps,
            showdownOptions,
            visibility,
        } = this.props;

        const mergedVisibility = {...ReactMde.defaultProps.visibility, ...visibility};

        return (
            <div className="react-mde">
                {mergedVisibility.toolbar && <ReactMdeToolbar
                    commands={commands}
                    onCommand={this.handleCommand}
                />}
                {mergedVisibility.textarea && <ReactMdeTextArea
                    onChange={this.handleValueChange}
                    value={value}
                    textAreaProps={textAreaProps}
                    textAreaRef={(c) => this.textArea = c}
                />}
                {mergedVisibility.preview && <ReactMdePreview
                    markdown={value ? value.text : ""}
                    previewRef={(c) => this.preview = c}
                    showdownOptions={showdownOptions}
                    helpVisible={mergedVisibility.previewHelp}
                />}
            </div>
        );
    }
}
