import * as React from "react";
import * as Showdown from "showdown";

export interface ReactMdePreviewProps {
    previewRef?: (ref: HTMLDivElement) => void;
    showdownOptions?: any;
    markdown: string;
}

export interface ReactMdePreviewState {
}

export class ReactMdePreview extends React.Component<ReactMdePreviewProps, ReactMdePreviewState> {
    converter: Showdown.Converter;
    preview: HTMLDivElement;

    constructor(props) {
        super(props);
        const {showdownOptions} = props;
        this.converter = new Showdown.Converter(showdownOptions ? showdownOptions : undefined);
    }

    render() {
        const {markdown, previewRef} = this.props;
        const html = this.converter.makeHtml(markdown) || "<p>&nbsp</p>";
        return (
            <div className="mde-preview">
                <div className="mde-preview-title">
                  Preview
                </div>

                <div
                    className="mde-preview-content"
                    dangerouslySetInnerHTML={{__html: html}}
                    ref={(p) => {
                        this.preview = p;
                        if (previewRef) {
                            previewRef(p);
                        }
                    }}
                />
            </div>
        );
    }
}
