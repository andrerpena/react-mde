import * as React from "react";
import { Command, GenerateMarkdownPreview, MdeState, ButtonContentOptions } from "./types";
import { LayoutMap } from "./LayoutMap";
import { EditorState } from "draft-js";
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
    otherProps?: any;
}
export declare class ReactMde extends React.Component<ReactMdeProps> {
    static defaultProps: Partial<ReactMdeProps>;
    handleOnChange: ({ markdown, html, draftEditorState }: MdeState) => void;
    handleDraftStateChange: (draftEditorState: EditorState) => void;
    onCommand: (command: Command) => void | Promise<void>;
    ensureMdeStateIsInSync(): Promise<void>;
    componentDidMount(): Promise<void>;
    componentDidUpdate(): Promise<void>;
    render(): JSX.Element;
}
//# sourceMappingURL=ReactMde.d.ts.map