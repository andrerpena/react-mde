import * as React from "react";
import {VerticalLayout, NoPreviewLayout, HorizontalLayout} from "./components-layout";

class LayoutMap {
    vertical: typeof VerticalLayout = VerticalLayout;
    noPreview: typeof NoPreviewLayout = NoPreviewLayout;
    horizontal: typeof HorizontalLayout = HorizontalLayout;
}

const layoutMap = new LayoutMap();

export { LayoutMap, layoutMap };
