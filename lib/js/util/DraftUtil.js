"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var draft_js_1 = require("draft-js");
function getContentLengthOfAllBlocksBefore(editorState, key) {
    var count = 0;
    var blockBefore;
    var currentKey = key;
    while (true) {
        blockBefore = editorState.getCurrentContent().getBlockBefore(currentKey);
        if (!blockBefore) {
            break;
        }
        // we have to add 1 here to account for the \n character
        count += blockBefore.getText().length + 1;
        currentKey = blockBefore.getKey();
    }
    return count;
}
exports.getContentLengthOfAllBlocksBefore = getContentLengthOfAllBlocksBefore;
function getSelection(editorState) {
    var selection = editorState.getSelection();
    var startKey = selection.getStartKey();
    var startOffset = selection.getStartOffset();
    var endKey = selection.getEndKey();
    var endOffset = selection.getEndOffset();
    var editorWiseOffset = getContentLengthOfAllBlocksBefore(editorState, startKey);
    var offsetBetweenKeys = getContentLengthBetween(editorState, startKey, startOffset, endKey, endOffset);
    // start and end are on the same block
    return { start: startOffset + editorWiseOffset, end: startOffset + offsetBetweenKeys + editorWiseOffset };
}
exports.getSelection = getSelection;
function getContentLengthBetween(editorState, startKey, startOffset, endKey, endOffset) {
    if (startKey === endKey) {
        return endOffset - startOffset;
    }
    var count = editorState.getCurrentContent().getBlockForKey(startKey).getText().length - startOffset;
    var blockAfter;
    var currentKey = startKey;
    while (true) {
        blockAfter = editorState.getCurrentContent().getBlockAfter(currentKey);
        if (!blockAfter || blockAfter.getKey() === endKey) {
            break;
        }
        // we have to add 1 here to account for the \n character
        count += (blockAfter.getText().length + 1);
        currentKey = blockAfter.getKey();
    }
    // we have to add 1 here to account for the \n character
    count += endOffset + 1;
    return count;
}
exports.getContentLengthBetween = getContentLengthBetween;
function getPlainText(editorState) {
    return editorState.getCurrentContent().getPlainText("\n");
}
exports.getPlainText = getPlainText;
var findBlockKeyAndOffsetForPosition = function (position, block, globalOffset, blockOffset, contentState) {
    if (!block || position < globalOffset + blockOffset) {
        return null;
    }
    if (position > globalOffset + block.getText().length) {
        // the princess is in another castle
        return findBlockKeyAndOffsetForPosition(position, contentState.getBlockAfter(block.getKey()), globalOffset + block.getText().length + 1, 0, contentState);
    }
    else {
        // the princess is in this castle
        return {
            block: block,
            globalOffset: globalOffset,
            blockOffset: position - globalOffset,
        };
    }
};
function buildSelectionState(contentState, selection) {
    var firstBlock = contentState.getFirstBlock();
    if (firstBlock === null) {
        return null;
    }
    var startBlockData = findBlockKeyAndOffsetForPosition(selection.start, firstBlock, 0, 0, contentState);
    if (startBlockData === null) {
        return null;
    }
    var endBlockData = findBlockKeyAndOffsetForPosition(selection.end, startBlockData.block, startBlockData.globalOffset, startBlockData.blockOffset, contentState);
    if (endBlockData === null) {
        return null;
    }
    var selectionState = draft_js_1.SelectionState.createEmpty(startBlockData.block.getKey());
    return selectionState.merge({
        anchorKey: startBlockData.block.getKey(),
        anchorOffset: startBlockData.blockOffset,
        focusKey: endBlockData.block.getKey(),
        focusOffset: endBlockData.blockOffset,
    });
}
exports.buildSelectionState = buildSelectionState;
function getMarkdownStateFromDraftState(editorState) {
    return {
        text: getPlainText(editorState),
        selection: getSelection(editorState),
    };
}
exports.getMarkdownStateFromDraftState = getMarkdownStateFromDraftState;
function getMdeStateFromDraftState(editorState, generateMarkdownPreview) {
    return __awaiter(this, void 0, void 0, function () {
        var markdown, html, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    markdown = getPlainText(editorState);
                    if (!generateMarkdownPreview) return [3 /*break*/, 2];
                    return [4 /*yield*/, generateMarkdownPreview(markdown)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = "";
                    _b.label = 3;
                case 3:
                    html = _a;
                    return [2 /*return*/, {
                            html: html,
                            markdown: markdown,
                            draftEditorState: editorState,
                        }];
            }
        });
    });
}
exports.getMdeStateFromDraftState = getMdeStateFromDraftState;
function buildNewDraftState(currentState, markdownState) {
    var text = markdownState.text, selection = markdownState.selection;
    // TODO: Fix the redo. It's no working properly but this is an implementation detail.
    // handling text change history push
    var contentState = draft_js_1.ContentState.createFromText(text);
    var state = draft_js_1.EditorState.forceSelection(currentState, currentState.getSelection());
    state = draft_js_1.EditorState.push(state, contentState, "insert-characters");
    // handling text selection history push
    var selectionState = selection
        ? buildSelectionState(state.getCurrentContent(), selection)
        : currentState.getSelection();
    return draft_js_1.EditorState.forceSelection(state, selectionState);
}
exports.buildNewDraftState = buildNewDraftState;
