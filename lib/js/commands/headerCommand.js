"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MarkdownUtil_1 = require("../util/MarkdownUtil");
var DraftUtil_1 = require("../util/DraftUtil");
function setHeader(state, str) {
    var mdState = DraftUtil_1.getMarkdownStateFromDraftState(state);
    mdState = MarkdownUtil_1.makeHeader(mdState, str);
    return DraftUtil_1.buildNewDraftState(state, mdState);
}
exports.headerCommand = {
    buttonContentBuilder: function (_a) {
        var iconProvider = _a.iconProvider;
        return iconProvider("heading");
    },
    buttonProps: { "aria-label": "Add header" },
    children: [
        {
            buttonContentBuilder: function () { return React.createElement("p", { className: "header-1" }, "Header 1"); },
            execute: function (state) { return setHeader(state, "# "); },
        },
        {
            buttonContentBuilder: function () { return React.createElement("p", { className: "header-2" }, "Header 2"); },
            execute: function (state) { return setHeader(state, "## "); },
        },
        {
            buttonContentBuilder: function () { return React.createElement("p", { className: "header-3" }, "Header 3"); },
            execute: function (state) { return setHeader(state, "### "); },
        },
        {
            buttonContentBuilder: function () { return React.createElement("p", { className: "header-4" }, "Header 4"); },
            execute: function (state) { return setHeader(state, "#### "); },
        },
    ],
};
