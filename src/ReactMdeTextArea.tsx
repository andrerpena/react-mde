import * as React from "react";
import { Value } from "./types";
import { setSelection } from "./helpers/ReactMdeSelectionHelper";

export interface ReactMdeTextAreaProps {
    onChange: (value: Value) => void;
    textAreaRef?: (ref: HTMLTextAreaElement) => void;
    value: Value;
    textAreaProps?: any;
}

interface ReactMdeTextAreaState {

}

export class ReactMdeTextArea extends React.Component<ReactMdeTextAreaProps, ReactMdeTextAreaState> {
    textArea: HTMLTextAreaElement;

    static defaultProps: Partial<ReactMdeTextAreaProps> = {
        textAreaProps: {},
    };

    /**
     * Handler for the textArea value change
     * @param {any} e
     * @memberOf ReactMde
     */
    handleValueChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const {onChange} = this.props;
        onChange({text: e.currentTarget.value, selection: null});
    }

    componentDidUpdate() {
        const {value: {selection}} = this.props;
        if (selection) {
            setSelection(this.textArea, selection.start, selection.end);
        }
    }

    render() {
        const {value: {text}, textAreaProps, textAreaRef} = this.props;
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
            </div>
        );
    }
}
