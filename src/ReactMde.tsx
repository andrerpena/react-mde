import * as React from "react";

import {Command, CommandSet, MdeState} from "./types";
import {getDefaultCommands} from "./commands";
import {layoutMap, LayoutMap} from "./LayoutMap";
import {MarkdownOptions} from "./types/MarkdownOptions";
import * as Showdown from "showdown";
import {EditorState} from "draft-js";
import * as MarkdownUtil from "./MarkdownUtil";
import {getDraftStateFromMarkdownState, getMarkdownStateFromDraftState} from "./MarkdownUtil";
import {MarkdownState} from "./types/MarkdownState";

export interface ReactMdeProps {
    editorState: MdeState;
    className?: string;
    commands?: Array<Array<Command | CommandSet>>;
    onChange: (value: MdeState) => void;
    markdownOptions?: MarkdownOptions;
    processHtml?: (html: string) => string;
    layout?: keyof LayoutMap;
    layoutOptions: any;
}

export class ReactMde extends React.Component<ReactMdeProps> {
    converter: Showdown.Converter;

    static defaultProps: Partial<ReactMdeProps> = {
        commands: getDefaultCommands(),
        layout: "vertical",
    };

    constructor(props) {
        super(props);
        const {showdownFlavor, showdownOptions} = props;
        this.converter = new Showdown.Converter();
        if (showdownFlavor) {
            this.converter.setFlavor(showdownFlavor);
        }
        if (showdownOptions) {
            for (const option in showdownOptions) {
                if (showdownOptions.hasOwnProperty(option)) {
                    this.converter.setOption(option, showdownOptions[option]);
                }
            }
        }
    }

    handleOnChange(editorState: EditorState) {
        const {onChange, processHtml} = this.props;
        const markdown = MarkdownUtil.getPlainText(editorState);
        const rawHtml = this.converter.makeHtml(markdown) || "<p>&nbsp</p>";
        const html = processHtml ? processHtml(rawHtml) : rawHtml;
        onChange({markdown, html, draftEditorState: editorState})
    }

    onCommand(command: Command) {
        const { editorState } = this.props;
        command.execute(
            () => getMarkdownStateFromDraftState(editorState.draftEditorState),
            (state: MarkdownState) => this.handleOnChange(getDraftStateFromMarkdownState(state)),
            (lock) => {}
        );
    }

    render() {
        const Layout = layoutMap[this.props.layout];
        const { commands, layoutOptions, editorState } = this.props;
        return <Layout
            onChange={this.handleOnChange}
            onCommand={this.onCommand}
            commands={commands}
            layoutOptions={layoutOptions}
            mdeEditorState={editorState}
        />
    }
}
