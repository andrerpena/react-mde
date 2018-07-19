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
var NoPreviewLayout = /** @class */ (function (_super) {
    __extends(NoPreviewLayout, _super);
    function NoPreviewLayout() {
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
    NoPreviewLayout.prototype.render = function () {
        var _this = this;
        var _a = this.props, buttonContentOptions = _a.buttonContentOptions, commands = _a.commands, mdeEditorState = _a.mdeEditorState, readOnly = _a.readOnly, otherProps = _a.otherProps;
        return (React.createElement("div", { className: "react-mde-no-preview-layout" },
            React.createElement(components_1.MdeToolbar, { buttonContentOptions: buttonContentOptions, commands: commands, onCommand: this.handleCommand, readOnly: readOnly, otherProps: otherProps }),
            React.createElement(components_1.MdeEditor, { editorRef: function (c) { return _this.editorRef = c; }, onChange: this.handleMdeStateChange, editorState: mdeEditorState, readOnly: readOnly })));
    };
    return NoPreviewLayout;
}(React.Component));
exports.NoPreviewLayout = NoPreviewLayout;
