import * as React from "react";
import {VerticalLayout} from "./components-layout";

class LayoutMap {
    vertical: typeof VerticalLayout = VerticalLayout
}

const layoutMap = new LayoutMap()

export { LayoutMap, layoutMap }