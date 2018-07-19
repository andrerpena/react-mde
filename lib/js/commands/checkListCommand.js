"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MarkdownUtil_1 = require("../util/MarkdownUtil");
var DraftUtil_1 = require("../util/DraftUtil");
exports.checkListCommand = {
    buttonContentBuilder: function (_a) {
        var iconProvider = _a.iconProvider;
        return iconProvider("tasks");
    },
    buttonProps: { "aria-label": "Insert checklist" },
    execute: function (state) {
        var mdState = DraftUtil_1.getMarkdownStateFromDraftState(state);
        mdState = MarkdownUtil_1.makeList(mdState, "- [ ] ");
        return DraftUtil_1.buildNewDraftState(state, mdState);
    },
};
