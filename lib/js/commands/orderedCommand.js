"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MarkdownUtil_1 = require("../util/MarkdownUtil");
var DraftUtil_1 = require("../util/DraftUtil");
exports.orderedListCommand = {
    buttonContentBuilder: function (_a) {
        var iconProvider = _a.iconProvider;
        return iconProvider("list-ol");
    },
    buttonProps: { "aria-label": "Insert numbered list" },
    execute: function (state) {
        var mdState = DraftUtil_1.getMarkdownStateFromDraftState(state);
        mdState = MarkdownUtil_1.makeList(mdState, function (item, index) { return index + 1 + ". "; });
        return DraftUtil_1.buildNewDraftState(state, mdState);
    },
};
