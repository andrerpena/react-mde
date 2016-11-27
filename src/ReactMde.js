import React, { Component } from 'react';
import ReactMdeCommands from './ReactMdeCommands';

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

const HeaderItem = ({icon, onClick}) => (
    <li className="mde-header-item">
        <button type="button" onClick={onClick}>
            <i className={`fa fa-${icon}`} aria-hidden="true"></i>
        </button>
    </li>
);

class ReactMde extends Component {

    /**
     *
     */
    constructor() {
        super();
    }

    handleValueChange(e) {
        let {
            onChange
        } = this.props;
        onChange({ text: e.target.value, selection: null });
    }

    handleSelection() {
        let {
            value: { text, selection },
            onChange
        } = this.props;
        if (selection) {
            if (!selection.constructor === Array)
                throw Error('selection should be falsy or an array');
            setSelection(this.refs.textarea, selection[0], selection[1]);
        }
    }

    handleBoldCommand() {
        let {
            value: { text },
            onChange
        } = this.props;
        let textarea = this.refs.textarea;
        var newValue = ReactMdeCommands.makeBold(text, getSelection(textarea));
        onChange(newValue);
    }

    handleItalicCommand() {
        let {
            value: { text },
            onChange
        } = this.props;
        let textarea = this.refs.textarea;
        var newValue = ReactMdeCommands.makeItalic(text, getSelection(textarea));
        onChange(newValue);
    }

    componentDidMount() {
        this.handleSelection();
    }

    componentDidUpdate() {
        this.handleSelection();
    }

    render() {

        let {
            value: { text },
            onChange
        } = this.props;

        return (
            <div className="react-mde">
                <div className="mde-header">
                    <HeaderGroup>
                        <HeaderItem icon="bold" onClick={this.handleBoldCommand.bind(this)} />
                        <HeaderItem icon="italic" onClick={this.handleItalicCommand.bind(this)} />
                    </HeaderGroup>
                    <HeaderGroup>
                        <HeaderItem icon="link" />
                        <HeaderItem icon="quote-right" />
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
                </div>
                <div className="mde-text">
                    <textarea onChange={this.handleValueChange.bind(this)} value={text} ref="textarea" />
                </div>
                <div className="mde-preview"></div>
            </div>
        );
    }
}

export default ReactMde;
