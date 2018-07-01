import * as React from "react";
import {Command, GenerateMarkdownPreview, MdeState, ButtonContentOptions} from "./types";
import {getDefaultCommands} from "./commands";
import {layoutMap, LayoutMap} from "./LayoutMap";
import {ContentState, EditorState} from "draft-js";
import {getMdeStateFromDraftState} from "./util/DraftUtil";
import { MdeToolbarIcon } from "./components";

export interface ReactMdeProps {
    editorState: MdeState;
    className?: string;
    commands?: Command[][];
    buttonContentOptions?: ButtonContentOptions;
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
        buttonContentOptions: {
          iconProvider: (name) => <MdeToolbarIcon icon={name} />,
        },
        layout: "vertical",
        emptyPreviewHtml: "<p>&nbsp;</p>",
        readOnly: false,
    };

    handleOnChange = ({markdown, html, draftEditorState}: MdeState) => {
        const {onChange} = this.props;
        onChange({markdown, html, draftEditorState});
    }

    handleDraftStateChange = (draftEditorState: EditorState) => {
        const {generateMarkdownPreview} = this.props;
        getMdeStateFromDraftState(draftEditorState, generateMarkdownPreview).then((mdeState) => {
            this.handleOnChange({
                html: mdeState.html,
                markdown: mdeState.markdown,
                draftEditorState,
            });
        });
    }

    onCommand = (command: Command) => {
        if (!command.execute) return;
        const {draftEditorState} = this.props.editorState;
        const executedCommand = command.execute(draftEditorState);
        // When this issue is solved, probably it won't be required anymore to do an explicit type cast:
        // https://github.com/Microsoft/TypeScript/issues/1260
        if (executedCommand.constructor.name === "Promise") {
            return (executedCommand as Promise<EditorState>).then((result) => this.handleDraftStateChange(result));
        } else {
            const newEditorState = executedCommand as EditorState;
            return this.handleDraftStateChange(newEditorState);
        }
    }

    async componentDidMount() {
        const {editorState, generateMarkdownPreview} = this.props;
        if (!editorState || editorState.draftEditorState) return;

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
        const {buttonContentOptions, commands, layoutOptions, className, emptyPreviewHtml, readOnly} = this.props;
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
                    buttonContentOptions={buttonContentOptions}
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
