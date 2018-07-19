"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MarkdownUtil_1 = require("../util/MarkdownUtil");
var DraftUtil_1 = require("../util/DraftUtil");
exports.strikethroughCommand = {
    buttonContentBuilder: function (_a) {
        var iconProvider = _a.iconProvider;
        return iconProvider("strikethrough");
    },
    buttonProps: { "aria-label": "Add strikethrough text" },
    execute: function (state) {
        var mdState = DraftUtil_1.getMarkdownStateFromDraftState(state);
        mdState = MarkdownUtil_1.insertBeforeAndAfter(mdState, "~~");
        return DraftUtil_1.buildNewDraftState(state, mdState);
    },
};
