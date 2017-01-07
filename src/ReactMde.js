import React, { Component } from 'react';
import ReactMdeCommands from './ReactMdeCommands';
import showdown from 'showdown';
import HeaderGroup from './components/HeaderGroup';
import HeaderItem from './components/HeaderItem';
import HeaderItemDropdown from './components/HeaderItemDropdown';
import HeaderItemDropdownItem from './components/HeaderItemDropdownItem';
import MarkdownHelp from './components/MarkdownHelp';

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

class ReactMde extends Component {

    static propTypes = {
        commands: React.PropTypes.array
    }

    /**
     *
     */
    constructor() {
        super();
        this.converter = new showdown.Converter();
    }


    handleValueChange(e) {
        let {
            value: { text, selection },
            onChange
        } = this.props;
        onChange({ text: e.target.value, selection: null });
    }

    /**
     * Handles the execution of a command
     * @param {function} command
     * @memberOf ReactMde
     */
    executeCommand(command) {
        let {
            value: { text, selection },
            onChange
        } = this.props;
        let textarea = this.refs.textarea;

        var newValue = command.execute(text, getSelection(textarea));

        // let's select EVERYTHING and replace with the result of the command.
        // This will cause an 'inconvenience' which is: Ctrl + Z will select the whole
        // text. But this is the LEAST possible inconvenience. We can pretty much live
        // with it. I've tried everything in my reach, including reimplementing the textarea
        // history. That caused more problems than it solved.

        this.refs.textarea.focus();
        setSelection(this.refs.textarea, 0, this.refs.textarea.value.length);
        document.execCommand("insertText", false, newValue.text);

        setSelection(this.refs.textarea, newValue.selection[0], newValue.selection[1]);
    }

    handleHeaderDropdown() {

    }

    render() {

        let {
            value: { text, selection },
            onChange,
            commands
        } = this.props;

        let html = this.converter.makeHtml(text) || '<p>&nbsp</p>';

        let header = null;
        if (commands) {
            header = <div className="mde-header">
                {
                    commands.map((cg, i) => {
                        return <HeaderGroup key={i}>
                            {
                                cg.map((c, j) => {
                                    if (c.type == 'command-set')
                                        return <HeaderItemDropdown key={j} icon={c.icon} commands={c.subCommands} onCommand={c => this.executeCommand(c)} />
                                    else
                                        return <HeaderItem key={j} icon={c.icon} tooltip={c.tooltip} onClick={() => this.executeCommand(c)} />
                                })
                            }
                        </HeaderGroup>
                    })
                }
            </div>
        }

        return (
            <div className="react-mde">
                {header}
                <div className="mde-text">
                    <textarea onChange={this.handleValueChange.bind(this)} value={text} ref="textarea" />
                </div>
                <div className="mde-preview" dangerouslySetInnerHTML={{ __html: html }}>
                </div>
                <div className="mde-help">
                    <MarkdownHelp />
                </div>
            </div>
        );
    }
}

export default ReactMde;
