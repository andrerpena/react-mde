import * as React from "react";
import {VerticalLayout, NoPreviewLayout} from "./components-layout";

class LayoutMap {
    vertical: typeof VerticalLayout = VerticalLayout;
    noPreview: typeof NoPreviewLayout = NoPreviewLayout;
}

const layoutMap = new LayoutMap();

export { LayoutMap, layoutMap };
