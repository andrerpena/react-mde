import * as React from "react";

import {
    getSelection,
} from "./helpers/ReactMdeSelectionHelper";
import { Command, CommandSet, Value } from "./types";
import { ReactMdeToolbar } from "./ReactMdeToolbar";
import { ReactMdeTextArea } from "./ReactMdeTextArea";
import { ReactMdePreview } from "./ReactMdePreview";

export interface ReactMdeProps {
    commands: Array<Array<Command | CommandSet>>;
    value: Value;
    onChange: (value: Value) => void;
    textAreaProps?: any;
    showdownOptions?: any;
}

export class ReactMde extends React.Component<ReactMdeProps> {

    textArea: HTMLTextAreaElement;
    preview: HTMLDivElement;

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
    handleCommand = (command: Command) => {
        const {value: {text}, onChange} = this.props;
        const newValue = command.execute(text, getSelection(this.textArea));
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
        } = this.props;

        return (
            <div className="react-mde">
                <ReactMdeToolbar
                    commands={commands}
                    onCommand={this.handleCommand}
                />
                <ReactMdeTextArea
                    onChange={this.handleValueChange}
                    value={value}
                    textAreaProps={textAreaProps}
                    textAreaRef={(c) => this.textArea = c}
                />
                <ReactMdePreview
                    markdown={value ? value.text : ""}
                    previewRef={(c) => this.preview = c}
                    showdownOptions={showdownOptions}
                />
            </div>
        );
    }
}
