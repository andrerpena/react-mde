"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function getSurroundingWord(text, position) {
    if (!text)
        throw Error("Argument 'text' should be truthy");
    var isWordDelimiter = function (c) { return c === " " || c.charCodeAt(0) === 10; };
    // leftIndex is initialized to 0 because if position is 0, it won't even enter the iteration
    var leftIndex = 0;
    // rightIndex is initialized to text.length because if position is equal to text.length it won't even enter the interation
    var rightIndex = text.length;
    // iterate to the left
    for (var i = position; i - 1 > -1; i--) {
        if (isWordDelimiter(text[i - 1])) {
            leftIndex = i;
            break;
        }
    }
    // iterate to the right
    for (var i = position; i < text.length; i++) {
        if (isWordDelimiter(text[i])) {
            rightIndex = i;
            break;
        }
    }
    return {
        word: text.slice(leftIndex, rightIndex),
        position: {
            start: leftIndex,
            end: rightIndex,
        },
    };
}
exports.getSurroundingWord = getSurroundingWord;
function insertBeforeAndAfter(markdownState, insertion) {
    var text = markdownState.text;
    var selection = markdownState.selection;
    selection = selectWordIfCaretIsInsideOne({ text: text, selection: selection });
    // the user is selecting a word section
    var _a = insertText(text, insertion, selection.start), newText = _a.newText, insertionLength = _a.insertionLength;
    var finalText = insertText(newText, insertion, selection.end + insertionLength).newText;
    return {
        text: finalText,
        selection: {
            start: selection.start + insertionLength,
            end: selection.end + insertionLength,
        },
    };
}
exports.insertBeforeAndAfter = insertBeforeAndAfter;
function selectWordIfCaretIsInsideOne(_a) {
    var text = _a.text, selection = _a.selection;
    if (text && text.length && selection.start === selection.end) {
        // the user is pointing to a word
        return getSurroundingWord(text, selection.start).position;
    }
    return selection;
}
exports.selectWordIfCaretIsInsideOne = selectWordIfCaretIsInsideOne;
/**
 * Inserts breaks before, only if needed. The returned selection will not include this breaks
 *
 * @export
 * @param {any} text
 * @param {any} selection
 * @returns
 */
function insertBreaksBeforeSoThatThereIsAnEmptyLineBefore(_a) {
    var text = _a.text, selection = _a.selection;
    var breaksNeededBefore = getBreaksNeededForEmptyLineBefore(text, selection.start);
    var insertionBefore = Array(breaksNeededBefore + 1).join("\n");
    var newText = text;
    var newSelection = selection;
    var insertionLength = 0;
    // if line-breaks have to be added before
    if (insertionBefore) {
        var textInsertion = insertText(text, insertionBefore, selection.start);
        newText = textInsertion.newText;
        insertionLength = textInsertion.insertionLength;
        newSelection = {
            start: selection.start + textInsertion.insertionLength,
            end: selection.end + textInsertion.insertionLength,
        };
    }
    return {
        newText: newText,
        insertionLength: insertionLength,
        newSelection: newSelection,
    };
}
exports.insertBreaksBeforeSoThatThereIsAnEmptyLineBefore = insertBreaksBeforeSoThatThereIsAnEmptyLineBefore;
/**
 * Inserts the given text before. The selection is moved ahead so the
 *
 * @export
 * @param {any} originalText
 * @param {any} textToInsert
 * @param {any} selection
 * @param selectInsertion {boolean} Whether or not the inserted text should be selected
 * @returns
 */
function insertBefore(originalText, textToInsert, selection, selectInsertion) {
    if (selectInsertion === void 0) { selectInsertion = true; }
    var textInsertion = insertText(originalText, textToInsert, selection.start);
    var newSelection = {
        start: selectInsertion ? selection.start : selection.start + textInsertion.insertionLength,
        end: selection.end + textInsertion.insertionLength,
    };
    return __assign({}, textInsertion, { newSelection: newSelection });
}
exports.insertBefore = insertBefore;
/**
 * Inserts the given text after. The selection will change to encompass the new text
 *
 * @export
 * @param {any} originalText
 * @param {any} textToInsert
 * @param {any} selection
 * @returns
 */
function insertAfter(originalText, textToInsert, selection) {
    var textInsertion = insertText(originalText, textToInsert, selection.end);
    var newSelection = {
        start: selection.start,
        end: selection.end + textInsertion.insertionLength,
    };
    return __assign({}, textInsertion, { newSelection: newSelection });
}
exports.insertAfter = insertAfter;
/**
 * Inserts "textToBeInserted" in "text" at the "insertionPosition"
 *
 * @param {any} originalText
 * @param {any} textToInsert
 * @param {any} insertionPosition
 * @returns
 */
function insertText(originalText, textToInsert, insertionPosition) {
    var newText = [originalText.slice(0, insertionPosition), textToInsert, originalText.slice(insertionPosition)].join("");
    return { newText: newText, insertionLength: textToInsert.length };
}
exports.insertText = insertText;
/**
 *  Gets the number of line-breaks that would have to be inserted before the given 'startPosition'
 *  to make sure there's an empty line between 'startPosition' and the previous text
 */
function getBreaksNeededForEmptyLineBefore(text, startPosition) {
    if (text === void 0) { text = ""; }
    if (startPosition === 0)
        return 0;
    // rules:
    // - If we're in the first line, no breaks are needed
    // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
    //      may need to insert 0, 1 or 2 breaks
    var neededBreaks = 2;
    var isInFirstLine = true;
    for (var i = startPosition - 1; i >= 0 && (neededBreaks >= 0); i--) {
        switch (text.charCodeAt(i)) {
            case 32: // blank space
                continue;
            case 10: // line break
                neededBreaks--;
                isInFirstLine = false;
                break;
            default:
                return neededBreaks;
        }
    }
    return isInFirstLine ? 0 : neededBreaks;
}
exports.getBreaksNeededForEmptyLineBefore = getBreaksNeededForEmptyLineBefore;
/**
 *  Gets the number of line-breaks that would have to be inserted after the given 'startPosition'
 *  to make sure there's an empty line between 'startPosition' and the next text
 */
function getBreaksNeededForEmptyLineAfter(text, startPosition) {
    if (text === void 0) { text = ""; }
    if (startPosition === text.length - 1)
        return 0;
    // rules:
    // - If we're in the first line, no breaks are needed
    // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
    //      may need to insert 0, 1 or 2 breaks
    var neededBreaks = 2;
    var isInLastLine = true;
    for (var i = startPosition; i < text.length && (neededBreaks >= 0); i++) {
        switch (text.charCodeAt(i)) {
            case 32:
                continue;
            case 10: {
                neededBreaks--;
                isInLastLine = false;
                break;
            }
            default:
                return neededBreaks;
        }
    }
    return isInLastLine ? 0 : neededBreaks;
}
exports.getBreaksNeededForEmptyLineAfter = getBreaksNeededForEmptyLineAfter;
/**
 * Inserts breaks after, only if needed. The returned selection will not include this breaks
 *
 * @export
 * @returns
 * @param markdownState
 */
function insertBreaksAfterSoThatThereIsAnEmptyLineAfter(_a) {
    var text = _a.text, selection = _a.selection;
    var breaksNeededBefore = getBreaksNeededForEmptyLineAfter(text, selection.end);
    var insertionAfter = Array(breaksNeededBefore + 1).join("\n");
    var newText = text;
    var insertionLength = 0;
    // if line-breaks have to be added before
    if (insertionAfter) {
        var textInsertion = insertText(text, insertionAfter, selection.end);
        newText = textInsertion.newText;
        insertionLength = textInsertion.insertionLength;
    }
    return {
        newText: newText,
        insertionLength: insertionLength,
        newSelection: selection,
    };
}
exports.insertBreaksAfterSoThatThereIsAnEmptyLineAfter = insertBreaksAfterSoThatThereIsAnEmptyLineAfter;
/**
 * Inserts insertionString before each line
 */
function insertBeforeEachLine(text, insertion, selection) {
    var substring = text.slice(selection.start, selection.end);
    var lines = substring.split(/\n/);
    var insertionLength = 0;
    var modifiedText = lines.map(function (item, index) {
        if (typeof insertion === "string") {
            insertionLength += insertion.length;
            return insertion + item;
        }
        else if (typeof insertion === "function") {
            var insertionResult = insertion(item, index);
            insertionLength += insertionResult.length;
            return insertion(item, index) + item;
        }
        throw Error("insertion is expected to be either a string or a function");
    }).join("\n");
    var newText = text.slice(0, selection.start) + modifiedText + text.slice(selection.end);
    return {
        newText: newText,
        insertionLength: insertionLength,
        newSelection: {
            start: lines.length > 1 ? selection.start : selection.start + insertionLength,
            end: selection.end + insertionLength,
        },
    };
}
exports.insertBeforeEachLine = insertBeforeEachLine;
/**
 * Helper for creating commands that make lists
 * @export
 * @param markdownState
 * @param {any} insertionBeforeEachLine
 * @returns
 */
function makeList(_a, insertionBeforeEachLine) {
    var text = _a.text, selection = _a.selection;
    var textInsertion;
    selection = selectWordIfCaretIsInsideOne({ text: text, selection: selection });
    // insert breaks before, if needed
    textInsertion = insertBreaksBeforeSoThatThereIsAnEmptyLineBefore({ text: text, selection: selection });
    text = textInsertion.newText;
    selection = textInsertion.newSelection;
    // insert breaks after, if needed
    textInsertion = insertBreaksAfterSoThatThereIsAnEmptyLineAfter({ text: text, selection: selection });
    text = textInsertion.newText;
    selection = textInsertion.newSelection;
    // inserts 'insertionBeforeEachLine' before each line
    textInsertion = insertBeforeEachLine(text, insertionBeforeEachLine, selection);
    text = textInsertion.newText;
    selection = textInsertion.newSelection;
    return {
        text: text,
        selection: selection,
    };
}
exports.makeList = makeList;
function onTab(_a, reverse) {
    var text = _a.text, selection = _a.selection;
    var start = 0;
    for (var i = selection.start; i - 1 > -1; i--) {
        if (text[i - 1] === "\n") {
            start = i;
            break;
        }
    }
    var end = text.length;
    for (var i = selection.end; i < text.length; i++) {
        if (text[i + 1] === "\n") {
            end = i;
            break;
        }
    }
    var substring = text.slice(start, end);
    var strings = substring.split(/\n/);
    var addLength = 0;
    var spaces = 0;
    var newText = strings.map(function (line) {
        var str = line.match(/^ +/);
        spaces = str && str[0] ? str[0].length : 0;
        if (reverse) {
            var removeSpaces = 4;
            if (!spaces || spaces % 4 !== 0)
                removeSpaces = spaces % 4;
            addLength -= removeSpaces;
            return line.slice(removeSpaces);
        }
        var addSpaces = "    ";
        if (spaces % 4 === 1)
            addSpaces = "   ";
        if (spaces % 4 === 2)
            addSpaces = "  ";
        if (spaces % 4 === 3)
            addSpaces = " ";
        addLength += addSpaces.length;
        return addSpaces + line;
    }).join("\n");
    text = text.slice(0, start) + newText + text.slice(end);
    if (strings.length <= 1)
        selection = {
            start: start + addLength + spaces,
            end: start + addLength + spaces,
        };
    else
        selection = {
            start: start,
            end: end + addLength,
        };
    return { text: text, selection: selection };
}
exports.onTab = onTab;
/**
 * Helper for creating a command that makes a header
 * @param {any} text
 * @param {any} selection
 * @param {any} insertionBefore
 * @returns
 */
function makeHeader(_a, insertionBefore) {
    var text = _a.text, selection = _a.selection;
    selection = selectWordIfCaretIsInsideOne({ text: text, selection: selection });
    // the user is selecting a word section
    var insertionText = insertBefore(text, insertionBefore, selection, false);
    var newText = insertionText.newText;
    var newSelection = insertionText.newSelection;
    return {
        text: newText,
        selection: newSelection,
    };
}
exports.makeHeader = makeHeader;
