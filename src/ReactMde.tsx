import * as React from "react";
import {Command, MdeState} from "./types";
import {getDefaultCommands} from "./commands";
import {layoutMap, LayoutMap} from "./LayoutMap";
import {EditorState} from "draft-js";
import {MarkdownState} from "./types/MarkdownState";
import {getDraftStateFromMarkdownState, getMarkdownStateFromDraftState, getPlainText} from "./util/DraftUtil";

export interface ReactMdeProps {
    editorState: MdeState;
    className?: string;
    commands?: Command[][];
    onChange: (value: MdeState) => void;
    generateMarkdownPreview: (markdown: string) => Promise<string>;
    layout?: keyof LayoutMap;
    layoutOptions?: any;
}

export class ReactMde extends React.Component<ReactMdeProps> {

    static defaultProps: Partial<ReactMdeProps> = {
        commands: getDefaultCommands(),
        layout: "vertical",
    };

    handleOnChange = (editorState: EditorState) => {
        const {onChange, generateMarkdownPreview} = this.props;
        const markdown = getPlainText(editorState);
        generateMarkdownPreview(markdown)
            .then((html) => {
                onChange({markdown, html, draftEditorState: editorState});
            });
    }

    onCommand(command: Command) {
        command.execute(
            () => getMarkdownStateFromDraftState(this.props.editorState.draftEditorState),
            (state: MarkdownState) => this.handleOnChange(getDraftStateFromMarkdownState(state)),
            () => this.props.editorState.draftEditorState,
            (state: EditorState) => this.handleOnChange(state),
        );
    }

    render() {
        const Layout = layoutMap[this.props.layout];
        const {commands, layoutOptions} = this.props;
        let {editorState} = this.props;
        if (!editorState) {
            editorState = {
                html: "",
                markdown: "",
                draftEditorState: EditorState.createEmpty(),
            };
        }
        return (
            <Layout
                onChange={this.handleOnChange}
                onCommand={this.onCommand}
                commands={commands}
                layoutOptions={layoutOptions}
                mdeEditorState={editorState}
            />
        );
    }
}
