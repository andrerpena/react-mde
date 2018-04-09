import * as React from "react";
import {Command, GenerateMarkdownPreview, MdeState} from "./types";
import {getDefaultCommands} from "./commands";
import {layoutMap, LayoutMap} from "./LayoutMap";
import {ContentState, EditorState} from "draft-js";
import {MarkdownState} from "./types/MarkdownState";
import {
    buildNewDraftState,
    buildSelectionState,
    getMarkdownStateFromDraftState, getMdeStateFromDraftState,
} from "./util/DraftUtil";

export interface ReactMdeProps {
    editorState: MdeState;
    className?: string;
    commands?: Command[][];
    onChange: (value: MdeState) => void;
    generateMarkdownPreview: GenerateMarkdownPreview;
    layout?: keyof LayoutMap;
    layoutOptions?: any;
}

export class ReactMde extends React.Component<ReactMdeProps> {

    static defaultProps: Partial<ReactMdeProps> = {
        commands: getDefaultCommands(),
        layout: "vertical",
    };

    handleOnChange = ({markdown, html, draftEditorState}: MdeState) => {
        const {onChange} = this.props;
        onChange({markdown, html, draftEditorState});
    }

    handleDraftStateChange = (draftEditorState: EditorState) => {
        const { generateMarkdownPreview } = this.props;
        getMdeStateFromDraftState(draftEditorState, generateMarkdownPreview)
            .then((mdeState) => {
                this.handleOnChange({
                    html: mdeState.html,
                    markdown: mdeState.markdown,
                    draftEditorState,
                });
            });
    }

    onCommand = (command: Command) => {
        command.execute(
            // get markdown state
            () => getMarkdownStateFromDraftState(this.props.editorState.draftEditorState),
            // set markdown state
            ({text, selection}: MarkdownState) => {
                const {editorState: {draftEditorState}} = this.props;
                const newDraftEditorState = buildNewDraftState(draftEditorState, text, selection);
                this.handleDraftStateChange(newDraftEditorState);
            },
            // get draft state
            () => this.props.editorState.draftEditorState,
            // set draft state
            (draftEditorState: EditorState) => this.handleDraftStateChange(draftEditorState),
        );
    }

    async componentDidMount() {
        const {editorState, generateMarkdownPreview} = this.props;
        if (editorState && !editorState.draftEditorState) {
            const newEditorState: MdeState = {
                html: editorState.html,
                markdown: editorState.markdown,
                draftEditorState: EditorState.createWithContent(ContentState.createFromText(editorState.markdown)),
            };
            if (newEditorState.markdown && !newEditorState.html) {
                newEditorState.html = await generateMarkdownPreview(newEditorState.markdown);
            }
            this.handleOnChange(newEditorState);
        }
    }

    render() {
        const Layout = layoutMap[this.props.layout];
        const {commands, layoutOptions, className} = this.props;
        let {editorState} = this.props;
        if (!editorState || !editorState.draftEditorState) {
            editorState = {
                html: "",
                markdown: "",
                draftEditorState: EditorState.createEmpty(),
            };
        }
        return (
            <div className={`react-mde ${className || ""}`}>
                <Layout
                    onChange={this.handleDraftStateChange}
                    onCommand={this.onCommand}
                    commands={commands}
                    layoutOptions={layoutOptions}
                    mdeEditorState={editorState}
                />
            </div>
        );
    }
}
