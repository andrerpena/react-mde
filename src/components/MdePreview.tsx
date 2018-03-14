import * as React from "react";
import * as Showdown from "showdown";

export interface ReactMdePreviewProps {
    previewRef?: (ref: MdePreview) => void;
    html: string;
}

export interface MdePreviewState {
}

export class MdePreview extends React.Component<ReactMdePreviewProps, MdePreviewState> {
    converter: Showdown.Converter;
    previewRef: HTMLDivElement;

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
        const {html, previewRef} = this.props;
        return (
            <div className="mde-preview">
                <div
                    className="mde-preview-content"
                    dangerouslySetInnerHTML={{__html: html}}
                    ref={(p) => this.previewRef = p}
                />
            </div>
        );
    }
}
