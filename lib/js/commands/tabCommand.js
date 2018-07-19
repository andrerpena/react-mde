"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MarkdownUtil_1 = require("../util/MarkdownUtil");
var DraftUtil_1 = require("../util/DraftUtil");
exports.tabCommand = {
    buttonContentBuilder: function () { return null; },
    buttonProps: null,
    execute: function (state, reverse) {
        var mdState = DraftUtil_1.getMarkdownStateFromDraftState(state);
        mdState = MarkdownUtil_1.onTab(mdState, reverse);
        return DraftUtil_1.buildNewDraftState(state, mdState);
    },
};
