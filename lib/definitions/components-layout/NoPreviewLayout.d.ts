import * as React from "react";
import { Command, LayoutProps } from "../types";
import { MdePreview, MdeEditor } from "../components";
export declare class NoPreviewLayout extends React.Component<LayoutProps, {}> {
    editorRef: MdeEditor;
    previewRef: MdePreview;
    /**
     * Handler for the textArea value change
     * @memberOf ReactMde
     */
    handleMdeStateChange: (value: any) => void;
    handleCommand: (command: Command) => void;
    /**
     * Renders react-mde
     * @returns
     * @memberOf ReactMde
     */
    render(): JSX.Element;
}
//# sourceMappingURL=NoPreviewLayout.d.ts.map