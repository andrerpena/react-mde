"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MarkdownUtil_1 = require("../util/MarkdownUtil");
var DraftUtil_1 = require("../util/DraftUtil");
exports.codeCommand = {
    buttonContentBuilder: function (_a) {
        var iconProvider = _a.iconProvider;
        return iconProvider("code");
    },
    buttonProps: { "aria-label": "Insert code" },
    execute: function (state) {
        var _a = DraftUtil_1.getMarkdownStateFromDraftState(state), text = _a.text, selection = _a.selection;
        selection = MarkdownUtil_1.selectWordIfCaretIsInsideOne({ text: text, selection: selection });
        // when there's no breaking line
        if (text.slice(selection.start, selection.end).indexOf("\n") === -1) {
            var mdState = MarkdownUtil_1.insertBeforeAndAfter({ text: text, selection: selection }, "`");
            return DraftUtil_1.buildNewDraftState(state, mdState);
        }
        var textInsertion;
        // insert breaks before, if needed
        textInsertion = MarkdownUtil_1.insertBreaksBeforeSoThatThereIsAnEmptyLineBefore({ text: text, selection: selection });
        text = textInsertion.newText;
        selection = textInsertion.newSelection;
        // inserts ```\n before
        textInsertion = MarkdownUtil_1.insertBefore(text, "```\n", selection, false);
        text = textInsertion.newText;
        selection = textInsertion.newSelection;
        // inserts ```\n after
        textInsertion = MarkdownUtil_1.insertAfter(text, "\n```", selection);
        text = textInsertion.newText;
        selection = textInsertion.newSelection;
        // insert breaks after, if needed
        textInsertion = MarkdownUtil_1.insertBreaksAfterSoThatThereIsAnEmptyLineAfter({ text: text, selection: selection });
        text = textInsertion.newText;
        selection = textInsertion.newSelection;
        return DraftUtil_1.buildNewDraftState(state, { text: text, selection: selection });
    },
};
