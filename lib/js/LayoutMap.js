"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var components_layout_1 = require("./components-layout");
var LayoutMap = /** @class */ (function () {
    function LayoutMap() {
        this.vertical = components_layout_1.VerticalLayout;
        this.noPreview = components_layout_1.NoPreviewLayout;
        this.horizontal = components_layout_1.HorizontalLayout;
        this.tabbed = components_layout_1.TabbedLayout;
    }
    return LayoutMap;
}());
exports.LayoutMap = LayoutMap;
var layoutMap = new LayoutMap();
exports.layoutMap = layoutMap;
