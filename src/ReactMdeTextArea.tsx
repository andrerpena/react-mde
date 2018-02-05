import * as React from "react";
import { Value } from "./types";
import { setSelection } from "./helpers/ReactMdeSelectionHelper";
import { MarkdownHelp } from "./components/MarkdownHelp";

export interface ReactMdeTextAreaProps {
    onChange: (value: Value) => void;
    textAreaRef?: (ref: HTMLTextAreaElement) => void;
    value: Value;
    textAreaProps?: any;
    helpVisible: boolean;
}

export interface ReactMdeTextAreaState {

}

export class ReactMdeTextArea extends React.Component<ReactMdeTextAreaProps, ReactMdeTextAreaState> {
    textArea: HTMLTextAreaElement;

    static defaultProps: Partial<ReactMdeTextAreaProps> = {
        textAreaProps: {},
        helpVisible: true
    };

    /**
     * Handler for the textArea value change
     * @param {any} e
     * @memberOf ReactMde
     */
    handleValueChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const {onChange} = this.props;
        onChange({text: e.currentTarget.value});
    }

    componentDidUpdate() {
        const {value: {selection, scrollTop}} = this.props;
        if (selection) {
            setSelection(this.textArea, selection.start, selection.end);
        }
        if (scrollTop !== null && scrollTop !== undefined) {
            // This is necessary because otherwise, when the value is reset, the scroll will jump to the end
            this.textArea.scrollTop = scrollTop;
        }
    }

    render() {
        const {value: {text}, textAreaProps, textAreaRef, helpVisible} = this.props;
        return (
            <div className="mde-text">
                <textarea
                    onChange={this.handleValueChange}
                    value={text}
                    ref={(c) => {
                        this.textArea = c;
                        if (textAreaRef) {
                            textAreaRef(c);
                        }
                    }}
                    {...textAreaProps}
                />

                {helpVisible && <div className="mde-help">
                    <MarkdownHelp/>
                </div>}

            </div>
        );
    }
}
