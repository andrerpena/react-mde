import * as React from "react";

export interface ReactMdePreviewProps {
    className?: string;
    previewRef?: (ref: MdePreview) => void;
    html: string;
    emptyPreviewHtml: string;
    cleanHtml?: any;
}

export interface MdePreviewState {
    safeHtml: string;
}

export class MdePreview extends React.Component<ReactMdePreviewProps, MdePreviewState> {
    previewRef: HTMLDivElement;

    constructor(props) {
        super(props);
        this.state = {
            safeHtml: "",
        };
        const {html} = this.props;
        this.cleanHtml(html);
    }

    componentWillReceiveProps(newProps) {
        const {html} = newProps;
        this.cleanHtml(html);
    }

    cleanHtml(html) {
        this.props.cleanHtml(html).then((safeHtml) => {
            this.setState({safeHtml});
        });
    }

    render() {
        const {className} = this.props;
        const {safeHtml} = this.state;

        return (
            <div className={`mde-preview ${className || ""}`}>
                <div
                    className="mde-preview-content"
                    dangerouslySetInnerHTML={{__html: safeHtml || "<p>&nbsp;</p>" }}
                    ref={(p) => this.previewRef = p}
                />
            </div>
        );
    }
}
