import React, { Component } from 'react';
import ReactMdeCommands from './ReactMdeCommands';
import BoldButton from './buttons/BoldButton';

/**
 * Gets the selection of the given element
 * 
 * @param {any} element
 * @returns
 */
function getSelection(element) {
    if (!element) throw Error('Argument \'element\' should be truthy');
    return [element.selectionStart, element.selectionEnd]
}

/**
 * Sets the selection of the given element
 * 
 * @param {any} element
 * @param {any} start
 * @param {any} end
 */
function setSelection(element, start, end) {
    if (!element) throw Error('Argument \'element\' should be truthy');

    element.focus();
    if (!element.setSelectionRange)
        throw Error('Incompatible browser. element.setSelectionRange is not defined');
    element.setSelectionRange(start, end);
}

const HeaderGroup = (props) => (
    <ul className="mde-header-group">
        {props.children}
    </ul>
);

const HeaderItem = ({icon, onClick}) => {
    var x = React.isValidElement(icon) ? icon : <i className={`fa fa-${icon}`} aria-hidden="true"></i>
    return (
        <li className="mde-header-item">
            <button type="button" onClick={onClick}>
                { x }
            </button>
        </li>
    );
}

class ReactMde extends Component {

    /**
     *
     */
    constructor() {
        super();
    }

    handleValueChange(e) {
        let {
            value: { text },
            onChange
        } = this.props;
        onChange({ text: e.target.value, selection: null });
    }

    /**
     * Handles what happens after the mount
     */
    handleAfterMount() {
        let {
            value: { text, selection, previousText },
            onChange
        } = this.props;
        if (selection) {
            if (!selection.constructor === Array)
                throw Error('selection should be falsy or an array');
            try {
                // In order to minimize the history problem with inputs, we're doing some tricks:
                //  - Set focus on the textarea
                //  - Set the value back to its previous value.
                //  - Select the whole text
                //  - Insert the new value
                this.refs.textarea.focus();
                this.refs.textarea.value = previousText;
                setSelection(this.refs.textarea, 0, previousText.length);
                document.execCommand("insertText", false, text);
            } catch (ex) {
                // It's not recommended but I'm swalling the exception here
            }
            setSelection(this.refs.textarea, selection[0], selection[1]);
        }
    }

    /**
     * Handles the execution of a command
     * @param {function} command
     * @memberOf ReactMde
     */
    getCommandHandler(command) {
        return function () {
            let {
                value: { text },
                onChange
            } = this.props;
            let textarea = this.refs.textarea;
            var newValue = command(text, getSelection(textarea));
            onChange(newValue);
        }
    }

    render() {

        let {
            value: { text, selection },
            onChange
        } = this.props;

        return (
            <div className="react-mde">
                <div className="mde-header">
                    <HeaderGroup>
                        <HeaderItem icon={<BoldButton/>} onClick={this.getCommandHandler(ReactMdeCommands.makeBold).bind(this)} />
                        <HeaderItem icon="italic" onClick={this.getCommandHandler(ReactMdeCommands.makeItalic).bind(this)} />
                    </HeaderGroup>
                    <HeaderGroup>
                        <HeaderItem icon="link" onClick={this.getCommandHandler(ReactMdeCommands.makeLink).bind(this)} />
                        <HeaderItem icon="quote-right" onClick={this.getCommandHandler(ReactMdeCommands.makeQuote).bind(this)} />
                        <HeaderItem icon="picture-o" />
                    </HeaderGroup>
                    <HeaderGroup>
                        <HeaderItem icon="list-ol" />
                        <HeaderItem icon="list" />
                    </HeaderGroup>
                    <HeaderGroup>
                        <HeaderItem icon="at" />
                        <HeaderItem icon="bookmark" />
                    </HeaderGroup>
                    <HeaderGroup>
                        <HeaderItem icon="star" />
                    </HeaderGroup>
                </div>
                <div className="mde-text">
                    <textarea onChange={this.handleValueChange.bind(this)} value={text} ref="textarea" />
                </div>
                <div className="mde-preview"></div>
            </div>
        );
    }

    componentDidMount() {
        this.handleAfterMount();
    }

    componentDidUpdate() {
        this.handleAfterMount();
    }
}

export default ReactMde;
