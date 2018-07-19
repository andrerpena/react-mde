import * as React from "react";
export interface ReactMdePreviewProps {
    className?: string;
    previewRef?: (ref: MdePreview) => void;
    html: string;
    emptyPreviewHtml: string;
}
export interface MdePreviewState {
}
export declare class MdePreview extends React.Component<ReactMdePreviewProps, MdePreviewState> {
    previewRef: HTMLDivElement;
    render(): JSX.Element;
}
//# sourceMappingURL=MdePreview.d.ts.map