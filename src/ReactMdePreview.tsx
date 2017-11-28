import * as React from "react";
import { MarkdownHelp } from "./components/MarkdownHelp";
import * as Showdown from "showdown";

interface ReactMdePreviewProps {
    previewRef?: (ref: HTMLDivElement) => void;
    markdown: string;
}

interface ReactMdePreviewState {
}

export class ReactMdePreview extends React.Component<ReactMdePreviewProps, ReactMdePreviewState> {
    converter: Showdown.Converter;
    preview: HTMLDivElement;

    static defaultProps: Partial<ReactMdePreviewProps> = {
        previewRef: (() => {
        }),
    }

    constructor() {
        super();
        this.converter = new Showdown.Converter();
    }

    render() {
        const {markdown, previewRef} = this.props;
        const html = this.converter.makeHtml(markdown) || "<p>&nbsp</p>";
        return (
            <div className="mde-preview"
            >
                <div
                    className="mde-preview-content"
                    dangerouslySetInnerHTML={{__html: html}}
                    ref={(p) => {
                        this.preview = p;
                        previewRef(p);
                    }}
                />
                <div className="mde-help">
                    <MarkdownHelp/>
                </div>
            </div>
        );
    }
}

