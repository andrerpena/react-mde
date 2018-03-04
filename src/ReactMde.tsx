import * as React from "react";

import {Command, CommandSet, Value, ShowdownFlavor} from "./types";
import {getDefaultCommands} from "./commands";
import {layoutMap, LayoutMap} from "./LayoutMap";

export interface ReactMdeVisibility {
    toolbar?: boolean;
    textarea?: boolean;
    preview?: boolean;
    previewHelp?: boolean;
}

export interface ReactMdeProps {
    value: Value;
    commands?: Array<Array<Command | CommandSet>>;
    onChange: (value: Value) => void;
    textAreaProps?: any;
    showdownFlavor?: ShowdownFlavor;
    showdownOptions?: any;
    visibility?: ReactMdeVisibility;
    className?: string;
    processHtml?: (html: string) => string;
    layout?: keyof LayoutMap;
}

export class ReactMde extends React.Component<ReactMdeProps> {
    static defaultProps: Partial<ReactMdeProps> = {
        visibility: {
            toolbar: true,
            textarea: true,
            preview: true,
            previewHelp: true,
        },
        commands: getDefaultCommands(),
        layout: "vertical",
    };
    render() {
        const Layout = layoutMap[this.props.layout];
        return <Layout {...this.props} />;
    }
}
