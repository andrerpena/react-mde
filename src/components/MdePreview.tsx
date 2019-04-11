import * as React from "react";
import {GenerateMarkdownPreview} from "../types";
import { classNames } from "../util/ClassNames";

export interface ReactMdePreviewProps {
    className?: string;
    previewRef?: (ref: MdePreview) => void;
    emptyPreviewHtml?: string;
    minHeight: number;
    generateMarkdownPreview: GenerateMarkdownPreview;
    markdown: string;
}

export interface ReactMdePreviewState {
    loading: boolean;
    html?: string;
}

export class MdePreview extends React.Component<ReactMdePreviewProps, ReactMdePreviewState> {
    previewRef: HTMLDivElement;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount(): void {
        const {markdown, generateMarkdownPreview} = this.props;
        generateMarkdownPreview(markdown).then((previewHtml) => {
            this.setState({
                html: previewHtml,
                loading: false
            });
        });
    }

    render() {
        const {className, minHeight, emptyPreviewHtml} = this.props;
        const {html, loading} = this.state;
        const finalHtml = loading ? emptyPreviewHtml : html;
        return (
            <div className={classNames("mde-preview", {className, loading})} style={{minHeight: minHeight + 10}}>
                <div
                    className="mde-preview-content"
                    dangerouslySetInnerHTML={{__html: finalHtml || "<p>&nbsp;</p>"}}
                    ref={(p) => this.previewRef = p}
                />
            </div>
        );
    }
}
