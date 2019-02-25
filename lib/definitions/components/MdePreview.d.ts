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
export declare class MdePreview extends React.Component<ReactMdePreviewProps, MdePreviewState> {
    previewRef: HTMLDivElement;
    constructor(props: any);
    componentWillReceiveProps(newProps: any): void;
    cleanHtml(html: any): void;
    render(): JSX.Element;
}
