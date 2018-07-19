"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var components_1 = require("../components");
var classNames = require("classnames");
var HorizontalLayout = /** @class */ (function (_super) {
    __extends(HorizontalLayout, _super);
    function HorizontalLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Handler for the textArea value change
         * @memberOf ReactMde
         */
        _this.handleMdeStateChange = function (value) {
            var onChange = _this.props.onChange;
            onChange(value);
        };
        _this.handleCommand = function (command) {
            var onCommand = _this.props.onCommand;
            onCommand(command);
        };
        return _this;
    }
    /**
     * Renders react-mde
     * @returns
     * @memberOf ReactMde
     */
    HorizontalLayout.prototype.render = function () {
        var _this = this;
        var _a = this.props, buttonContentOptions = _a.buttonContentOptions, commands = _a.commands, mdeEditorState = _a.mdeEditorState, layoutOptions = _a.layoutOptions, emptyPreviewHtml = _a.emptyPreviewHtml, readOnly = _a.readOnly, otherProps = _a.otherProps;
        var finalLayoutOptions = layoutOptions ? __assign({}, layoutOptions) : {};
        return (React.createElement("div", { className: "react-mde-horizontal-layout" },
            React.createElement(components_1.MdeToolbar, { buttonContentOptions: buttonContentOptions, commands: commands, onCommand: this.handleCommand, readOnly: readOnly, otherProps: otherProps }),
            React.createElement("div", { className: "mde-content" },
                React.createElement(components_1.MdeEditor, { className: classNames(finalLayoutOptions.editorClassName), editorRef: function (c) { return _this.editorRef = c; }, onChange: this.handleMdeStateChange, editorState: mdeEditorState, readOnly: readOnly }),
                React.createElement(components_1.MdePreview, { className: classNames(finalLayoutOptions.editorClassName), previewRef: function (c) { return _this.previewRef = c; }, html: mdeEditorState ? mdeEditorState.html : "", emptyPreviewHtml: emptyPreviewHtml }))));
    };
    return HorizontalLayout;
}(React.Component));
exports.HorizontalLayout = HorizontalLayout;
