"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MarkdownUtil_1 = require("../util/MarkdownUtil");
var DraftUtil_1 = require("../util/DraftUtil");
exports.unorderedListCommand = {
    buttonContentBuilder: function (_a) {
        var iconProvider = _a.iconProvider;
        return iconProvider("list-ul");
    },
    buttonProps: { "aria-label": "Insert a bulleted list" },
    execute: function (state) {
        var mdState = DraftUtil_1.getMarkdownStateFromDraftState(state);
        mdState = MarkdownUtil_1.makeList(mdState, "- ");
        return DraftUtil_1.buildNewDraftState(state, mdState);
    },
};
