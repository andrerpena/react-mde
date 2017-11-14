// TEXT INSERTION HELPERS

import { TextSelection } from './types/TextSelection';
import { TextInsertionResult } from './types/TextInsertionResult';
import { Word } from './types/Word';

/**
 * Inserts "textToBeInserted" in "text" at the "insertionPosition"
 *
 * @param {any} originalText
 * @param {any} textToInsert
 * @param {any} insertionPosition
 * @returns
 */
export function insertText(originalText: string, textToInsert: string, insertionPosition: number): TextInsertionResult {
    const newText = [originalText.slice(0, insertionPosition), textToInsert, originalText.slice(insertionPosition)].join('');
    return {newText, insertionLength: textToInsert.length};
}

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
export function insertBefore(originalText: string, textToInsert: string, selection: TextSelection, selectInsertion: boolean = true): TextInsertionResult {
    const textInsertion = insertText(originalText, textToInsert, selection.start);
    const newSelection: TextSelection = {
        start: selectInsertion ? selection.start : selection.start + textInsertion.insertionLength,
        end: selection.end + textInsertion.insertionLength,
    };
    return {...textInsertion, newSelection};
}

/**
 * Inserts the given text after. The selection will change to encompass the new text
 *
 * @export
 * @param {any} originalText
 * @param {any} textToInsert
 * @param {any} selection
 * @returns
 */
export function insertAfter(originalText: string, textToInsert: string, selection: TextSelection): TextInsertionResult {
    const textInsertion = insertText(originalText, textToInsert, selection.end);
    const newSelection: TextSelection = {
        start: selection.start,
        end: selection.end + textInsertion.insertionLength,
    };
    return {...textInsertion, newSelection};
}

/**
 *  Gets the number of line-breaks that would have to be inserted before the given 'startPosition'
 *  to make sure there's an empty line between 'startPosition' and the previous text
 */
export function getBreaksNeededForEmptyLineBefore(text = '', startPosition: number): number {
    if (startPosition === 0) return 0;

    // rules:
    // - If we're in the first line, no breaks are needed
    // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
    //      may need to insert 0, 1 or 2 breaks

    let neededBreaks = 2;
    let isInFirstLine = true;
    for (let i = startPosition - 1; i >= 0 && (neededBreaks >= 0); i--) {
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

/**
 *  Gets the number of line-breaks that would have to be inserted after the given 'startPosition'
 *  to make sure there's an empty line between 'startPosition' and the next text
 */
export function getBreaksNeededForEmptyLineAfter(text: string, startPosition: number): number {
    if (!text) throw Error('Argument \'text\' should be truthy');
    if (startPosition === text.length - 1) return 0;

    // rules:
    // - If we're in the first line, no breaks are needed
    // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
    //      may need to insert 0, 1 or 2 breaks

    let neededBreaks = 2;
    let isInLastLine = true;
    for (let i = startPosition; i < text.length && (neededBreaks >= 0); i++) {
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

/**
 * Inserts breaks before, only if needed. The returned selection will not include this breaks
 *
 * @export
 * @param {any} text
 * @param {any} selection
 * @returns
 */
export function insertBreaksBeforeSoThatThereIsAnEmptyLineBefore(text: string, selection: TextSelection): TextInsertionResult {
    const breaksNeededBefore = getBreaksNeededForEmptyLineBefore(text, selection.start);
    const insertionBefore = Array(breaksNeededBefore + 1).join('\n');

    const newText = text;
    let newSelection = selection;
    const insertionLength = 0;

    // if line-breaks have to be added before
    if (insertionBefore) {
        const textInsertion = insertText(text, insertionBefore, selection.start);
        newSelection = {
            start: selection.start + textInsertion.insertionLength,
            end: selection.end + textInsertion.insertionLength,
        };
    }
    return {
        newText,
        insertionLength,
        newSelection,
    };
}

/**
 * Inserts breaks after, only if needed. The returned selection will not include this breaks
 *
 * @export
 * @param {any} text
 * @param {any} selection
 * @returns
 */
export function insertBreaksAfterSoThatThereIsAnEmptyLineAfter(text: string, selection: TextSelection): TextInsertionResult {
    const breaksNeededBefore = getBreaksNeededForEmptyLineAfter(text, selection.end);
    const insertionAfter = Array(breaksNeededBefore + 1).join('\n');

    const newText = text;
    let newSelection = selection;
    const insertionLength = 0;

    // if line-breaks have to be added before
    if (insertionAfter) {
        const textInsertion = insertText(text, insertionAfter, selection.end);
        newSelection = {
            start: selection.start + textInsertion.insertionLength,
            end: selection.end + textInsertion.insertionLength,
        };
    }
    return {
        newText,
        insertionLength,
        newSelection,
    };
}

/**
 * Inserts insertionString before each line
 */
export function insertBeforeEachLine(text: string, insertion: string | Function, selection: TextSelection): TextInsertionResult {
    const substring = text.slice(selection.start, selection.end);
    const lines = substring.split(/\n/);

    let insertionLength = 0;
    const modifiedText = lines.map((item, index) => {
        if (typeof insertion === 'string') {
            insertionLength += insertion.length;
            return insertion + item;
        } else if (typeof insertion === 'function') {
            const insertionResult = insertion(item, index);
            insertionLength += insertionResult.length;
            return insertion(item, index) + item;
        }
        throw Error('insertion is expected to be either a string or a function');
    }).join('\n');

    const newText = text.slice(0, selection.start) + modifiedText + text.slice(selection.end);
    return {
        newText,
        insertionLength,
        newSelection: {
            start: selection.start,
            end: selection.end + insertionLength,
        },
    };
}

// MISC

/**
 * Gets the word surrounding the given position. Word delimiters are spaces and line-breaks
 *
 * @export
 * @param {any} text
 * @param {any} position
 */
export function getSurroundingWord(text: string, position: number): Word {
    if (!text) throw Error('Argument \'text\' should be truthy');

    const isWordDelimiter = (c: string) => c === ' ' || c.charCodeAt(0) === 10;

    // leftIndex is initialized to 0 because if position is 0, it won't even enter the iteration
    let leftIndex = 0;
    // rightIndex is initialized to text.length because if position is equal to text.length it won't even enter the interation
    let rightIndex = text.length;

    // iterate to the left
    for (let i = position; i - 1 > -1; i--) {
        if (isWordDelimiter(text[i - 1])) {
            leftIndex = i;
            break;
        }
    }

    // iterate to the right
    for (let i = position; i < text.length; i++) {
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

/**
 * Returns the selection of the current work if selection[0] is equal to selection[1] and carret is inside a word
 *
 * @export
 * @param {any} text
 * @param {any} selection
 */
export function selectCurrentWordIfCaretIsInsideOne(text: string, selection: TextSelection): TextSelection {
    if (text && text.length && selection.start === selection.end) {
        // the user is pointing to a word
        return getSurroundingWord(text, selection.start).position;
    }
    return selection;
}
