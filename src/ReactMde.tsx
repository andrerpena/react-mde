import * as React from "react";
import {Command, GenerateMarkdownPreview, MdeState} from "./types";
import {getDefaultCommands} from "./commands";
import {layoutMap, LayoutMap} from "./LayoutMap";
import {ContentState, EditorState} from "draft-js";
import {getMdeStateFromDraftState} from "./util/DraftUtil";

export interface ReactMdeProps {
    editorState: MdeState;
    className?: string;
    commands?: Command[][];
    onChange: (value: MdeState) => void;
    generateMarkdownPreview?: GenerateMarkdownPreview;
    layout?: keyof LayoutMap;
    layoutOptions?: any;
    emptyPreviewHtml?: string;
    readOnly?: boolean;
}

export class ReactMde extends React.Component<ReactMdeProps> {

    static defaultProps: Partial<ReactMdeProps> = {
        commands: getDefaultCommands(),
        layout: "vertical",
        emptyPreviewHtml: "<p>&nbsp;</p>",
        readOnly: false,
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
        const {draftEditorState} = this.props.editorState;
        this.handleDraftStateChange(command.execute(draftEditorState));
    }

    async componentDidMount() {
        const {editorState, generateMarkdownPreview} = this.props;
        if (!editorState || editorState.draftEditorState)
            return;

        const newEditorState: MdeState = {
            html: editorState.html,
            markdown: editorState.markdown,
            draftEditorState: EditorState.createWithContent(ContentState.createFromText(editorState.markdown)),
        };
        if (newEditorState.markdown && !newEditorState.html && generateMarkdownPreview != null) {
            newEditorState.html = await generateMarkdownPreview(newEditorState.markdown);
        }

        this.handleOnChange(newEditorState);
    }

    render() {
        const Layout = layoutMap[this.props.layout];
        const {commands, layoutOptions, className, emptyPreviewHtml, readOnly} = this.props;
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
                    emptyPreviewHtml={emptyPreviewHtml}
                    readOnly={readOnly}
                />
            </div>
        );
    }
}
