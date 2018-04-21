import * as React from "react";
import {VerticalLayout, NoPreviewLayout, HorizontalLayout, TabbedLayout} from "./components-layout";

class LayoutMap {
    vertical: typeof VerticalLayout = VerticalLayout;
    noPreview: typeof NoPreviewLayout = NoPreviewLayout;
    horizontal: typeof HorizontalLayout = HorizontalLayout;
    tabbed: typeof TabbedLayout = TabbedLayout;
}

const layoutMap = new LayoutMap();

export { LayoutMap, layoutMap };
