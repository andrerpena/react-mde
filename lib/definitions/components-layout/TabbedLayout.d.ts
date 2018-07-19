import * as React from "react";
import { Command, LayoutProps } from "../types";
import { MdePreview, MdeEditor } from "../components";
export declare const TAB_CODE: string;
export declare const TAB_PREVIEW: string;
export declare class TabbedLayout extends React.Component<LayoutProps, {}> {
    state: {
        tab: string;
    };
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
//# sourceMappingURL=TabbedLayout.d.ts.map