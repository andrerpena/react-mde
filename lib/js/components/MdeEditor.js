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
var draft_js_1 = require("draft-js");
var commands_1 = require("../commands");
var MdeEditor = /** @class */ (function (_super) {
    __extends(MdeEditor, _super);
    function MdeEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleOnChange = function (editorState) {
            var onChange = _this.props.onChange;
            onChange(editorState);
        };
        _this.executeCastAsEditorState = function (commandToExecute, editorState, data) {
            var newEditorState = commandToExecute.execute(editorState, data);
            return newEditorState;
        };
        _this.handleKeyCommand = function (command, editorState) {
            var onChange = _this.props.onChange;
            switch (command) {
                case "bold":
                    onChange(_this.executeCastAsEditorState(commands_1.boldCommand, editorState));
                    return "handled";
                case "italic":
                    onChange(_this.executeCastAsEditorState(commands_1.italicCommand, editorState));
                    return "handled";
                case "code":
                    onChange(_this.executeCastAsEditorState(commands_1.codeCommand, editorState));
                    return "handled";
                default:
                    return "not-handled";
            }
        };
        _this.handleTab = function (event) {
            event.preventDefault();
            var _a = _this.props, draftEditorState = _a.editorState.draftEditorState, onChange = _a.onChange;
            onChange(_this.executeCastAsEditorState(commands_1.tabCommand, draftEditorState, event.shiftKey));
        };
        return _this;
    }
    MdeEditor.prototype.render = function () {
        var _this = this;
        var _a = this.props, draftEditorState = _a.editorState.draftEditorState, className = _a.className, readOnly = _a.readOnly;
        return (React.createElement("div", { className: "mde-text " + (className || "") },
            React.createElement(draft_js_1.Editor, { ref: function (editor) { return (_this.editorRef = editor); }, stripPastedStyles: true, editorState: draftEditorState, onChange: this.handleOnChange, onTab: this.handleTab, handleKeyCommand: this.handleKeyCommand, readOnly: readOnly })));
    };
    return MdeEditor;
}(React.Component));
exports.MdeEditor = MdeEditor;
