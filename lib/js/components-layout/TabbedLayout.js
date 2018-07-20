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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var components_1 = require("../components");
exports.TAB_CODE = "TAB_CODE";
exports.TAB_PREVIEW = "TAB_PREVIEW";
var TabbedLayout = /** @class */ (function (_super) {
    __extends(TabbedLayout, _super);
    function TabbedLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            tab: exports.TAB_CODE,
        };
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
        _this.handleTabChange = function (event) {
            var tab = event.target.value;
            _this.setState({ tab: tab });
            _this.props.onTabChange(tab);
        };
        return _this;
    }
    /**
     * Renders react-mde
     * @returns
     * @memberOf ReactMde
     */
    TabbedLayout.prototype.render = function () {
        var _this = this;
        var _a = this.props, buttonContentOptions = _a.buttonContentOptions, commands = _a.commands, mdeEditorState = _a.mdeEditorState, emptyPreviewHtml = _a.emptyPreviewHtml, readOnly = _a.readOnly, otherProps = _a.otherProps;
        var styleTabCode = "mde-tab";
        var styleTabPreview = "mde-tab";
        var isReadOnly = readOnly || this.state.tab === exports.TAB_PREVIEW;
        var allCommands = isReadOnly ? [] : commands;
        var currentTab = readOnly ? exports.TAB_PREVIEW : this.state.tab;
        var disableCodeButton = readOnly;
        if (currentTab === exports.TAB_CODE) {
            styleTabCode += " mde-tab-activated";
        }
        else {
            styleTabPreview += " mde-tab-activated";
        }
        return (React.createElement("div", { className: "react-mde-tabbed-layout" },
            React.createElement(components_1.MdeToolbar, { buttonContentOptions: buttonContentOptions, commands: allCommands, onCommand: this.handleCommand, readOnly: isReadOnly, otherProps: otherProps },
                React.createElement("div", { className: "mde-tabs" },
                    React.createElement("button", { type: "button", className: styleTabCode, onClick: this.handleTabChange, disabled: disableCodeButton, value: exports.TAB_CODE }, "Markdown"),
                    React.createElement("button", { type: "button", className: styleTabPreview, onClick: this.handleTabChange, value: exports.TAB_PREVIEW }, "Preview"))),
            currentTab === exports.TAB_CODE ?
                React.createElement(components_1.MdeEditor, { editorRef: function (c) { return _this.editorRef = c; }, onChange: this.handleMdeStateChange, editorState: mdeEditorState, readOnly: readOnly })
                :
                    React.createElement(components_1.MdePreview, { previewRef: function (c) { return _this.previewRef = c; }, html: mdeEditorState ? mdeEditorState.html : "", emptyPreviewHtml: emptyPreviewHtml })));
    };
    return TabbedLayout;
}(React.Component));
exports.TabbedLayout = TabbedLayout;
