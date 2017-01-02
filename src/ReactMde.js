import React, { Component } from 'react';
import ReactMdeCommands from './ReactMdeCommands';
import showdown from 'showdown';

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
                {x}
            </button>
        </li>
    );
}

const MarkdownHelp = ({helpText = 'Markdown styling is supported', markdownReferenceUrl = 'http://commonmark.org/help/'}) => {
    return <a className="markdown-help" href={markdownReferenceUrl} target="_blank">
        <svg aria-hidden="true" className="markdown-help-svg" height="16" version="1.1" viewBox="0 0 16 16" width="16">
            <path fillRule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z">
            </path>
        </svg>
        <span className="markdown-help-text">{helpText}</span>
    </a>;
}

class ReactMde extends Component {

    /**
     *
     */
    constructor() {
        super();
        this.converter = new showdown.Converter();
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

        let html = this.converter.makeHtml(text) || '<p>&nbsp</p>';

        return (
            <div className="react-mde">
                <div className="mde-header">
                    <HeaderGroup>
                        <HeaderItem icon="bold" onClick={this.getCommandHandler(ReactMdeCommands.makeBold).bind(this)} />
                        <HeaderItem icon="italic" onClick={this.getCommandHandler(ReactMdeCommands.makeItalic).bind(this)} />
                    </HeaderGroup>
                    <HeaderGroup>
                        <HeaderItem icon="link" onClick={this.getCommandHandler(ReactMdeCommands.makeLink).bind(this)} />
                        <HeaderItem icon="quote-right" onClick={this.getCommandHandler(ReactMdeCommands.makeQuote).bind(this)} />
                        <HeaderItem icon="picture-o" onClick={this.getCommandHandler(ReactMdeCommands.makeImage).bind(this)} />
                    </HeaderGroup>
                    <HeaderGroup>
                        <HeaderItem icon="list-ul" />
                        <HeaderItem icon="list-ol" />
                    </HeaderGroup>
                    <HeaderGroup>
                        <HeaderItem icon="at" />
                        <HeaderItem icon="bookmark" />
                    </HeaderGroup>
                </div>
                <div className="mde-text">
                    <textarea onChange={this.handleValueChange.bind(this)} value={text} ref="textarea" />
                </div>
                <div className="mde-preview">
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
                <div className="mde-help">
                    <MarkdownHelp />
                </div>
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