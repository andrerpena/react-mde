import * as React from "react";
import {MarkdownHelp} from "./MarkdownHelp";
import * as Showdown from "showdown";
import {ShowdownFlavor} from "../types/index";

export interface ReactMdePreviewProps {
    previewRef?: (ref: HTMLDivElement) => void;
    showdownFlavor?: ShowdownFlavor;
    showdownOptions?: any;
    markdown: string;
    helpVisible: boolean;
    processHtml?: (html: string) => string;
}

export interface ReactMdePreviewState {
}

export class ReactMdePreview extends React.Component<ReactMdePreviewProps, ReactMdePreviewState> {
    converter: Showdown.Converter;
    preview: HTMLDivElement;

    static defaultProps: Partial<ReactMdePreviewProps> = {
        helpVisible: true,
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

    render() {
        const {markdown, previewRef, helpVisible, processHtml} = this.props;
        const html = this.converter.makeHtml(markdown) || "<p>&nbsp</p>";
        const processedHtml = processHtml ? processHtml(html) : html;

        return (
            <div className="mde-preview">
                <div
                    className="mde-preview-content"
                    dangerouslySetInnerHTML={{__html: processedHtml}}
                    ref={(p) => {
                        this.preview = p;
                        if (previewRef) {
                            previewRef(p);
                        }
                    }}
                />
                {helpVisible && <div className="mde-help">
                    <MarkdownHelp/>
                </div>}
            </div>
        );
    }
}
