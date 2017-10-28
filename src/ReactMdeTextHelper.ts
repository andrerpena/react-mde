// TEXT INSERTION HELPERS

import { TextSelection } from './types/TextSelection';
import { TextInsertionResult } from './types/TextInsertionResult';

/**
 * Inserts "textToBeInserted" in "text" at the "insertionPosition"
 *
 * @param {any} text
 * @param {any} textToInsert
 * @param {any} insertionPosition
 * @returns
 */
export function insertText(text: string, textToInsert: string, insertionPosition: number): TextInsertionResult {
    const newText = [text.slice(0, insertionPosition), textToInsert, text.slice(insertionPosition)].join('');
    return {newText, insertionLength: textToInsert.length};
}

/**
 * Inserts the given text before. The selection is moved ahead so the
 *
 * @export
 * @param {any} text
 * @param {any} textToInsert
 * @param {any} selection
 * @param selectInsertion
 * @returns
 */
export function insertBefore(text: string, textToInsert: string, selection: TextSelection, selectInsertion: boolean = true): TextInsertionResult {
    const textInsertion = insertText(text, textToInsert, selection.start);
    let newSelection: TextSelection = {
        start: selectInsertion ? selection.start : selection.start + textInsertion.insertionLength,
        end: selection.end + textInsertion.insertionLength,
    };
    return { ...textInsertion, newSelection };
}

/**
 * Inserts the given text after. The selection will change to encompass the new text
 *
 * @export
 * @param {any} text
 * @param {any} insertionText
 * @param {any} selection
 * @returns
 */
export function insertAfter(text: string, insertionText: string, selection: TextSelection) {
    const textInsertion = insertText(text, insertionText, selection.end);
    const newText = textInsertion.textAfterFirstInsertion;
    const insertionLength = textInsertion.insertionLength;
    const newSelection = [selection[0], selection[1] + insertionLength];

    return {newText, newSelection};
}

/**
 *  Gets the number of breaks needed so that there will be an empty line between the previous text
 */
export function getBreaksNeededForEmptyLineBefore(text = '', startPosition) {
    if (startPosition === 0) return 0;

    // rules:
    // - If we're in the first line, no breaks are needed
    // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
    //      may need to insert 0, 1 or 2 breaks

    let neededBreaks = 2;
    let isInFirstLine = true;
    for (let i = startPosition - 1; i >= 0 && (neededBreaks >= 0); i--) {
        switch (text.charCodeAt(i)) {
            case 32:
                continue;
            case 10: {
                neededBreaks--;
                isInFirstLine = false;
                break;
            }
            default:
                return neededBreaks;
        }
    }
    return isInFirstLine ? 0 : neededBreaks;
}

/**
 *  Gets the number of breaks needed so that there will be an empty line after the next text
 */
export function getBreaksNeededForEmptyLineAfter(text, startPosition) {
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
export function insertBreaksBeforeSoThatTheresAnEmptyLineBefore(text, selection) {
    const breaksNeededBefore = getBreaksNeededForEmptyLineBefore(text, selection[0]);
    const insertionBefore = Array(breaksNeededBefore + 1).join('\n');

    let newText = text;
    let newSelection = selection;

    // if line-breaks have to be added before
    if (insertionBefore) {
        const textInsertion = insertText(text, insertionBefore, selection[0]);
        newText = textInsertion.textAfterFirstInsertion;
        newSelection = selection.map(s => s + textInsertion.insertionLength);
    }

    return {newText, newSelection};
}

/**
 * Inserts breaks after, only if needed. The returned selection will not include this breaks
 *
 * @export
 * @param {any} text
 * @param {any} selection
 * @returns
 */
export function insertBreaksAfterSoThatTheresAnEmptyLineAfter(text, selection) {
    const breaksNeededBefore = getBreaksNeededForEmptyLineAfter(text, selection[1]);
    const insertionAfter = Array(breaksNeededBefore + 1).join('\n');

    let newText = text;
    let newSelection = selection;

    // if line-breaks have to be added before
    if (insertionAfter) {
        const textInsertion = insertText(text, insertionAfter, selection[1]);
        newText = textInsertion.textAfterFirstInsertion;
        newSelection = selection.map(s => s + textInsertion.insertionLength);
    }

    return {newText, newSelection};
}


/**
 * Inserts insertionString before each line
 */
export function insertBeforeEachLine(text, insertion, selection) {
    const substring = text.slice(selection[0], selection[1]);
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

    const newText = text.slice(0, selection[0]) + modifiedText + text.slice(selection[1]);
    return {newText, newSelection: [selection[0], selection[1] + insertionLength]};
}

// MISC

/**
 * Gets the word surrounding the given position. Word delimiters are spaces and line-breaks
 *
 * @export
 * @param {any} text
 * @param {any} position
 */
export function getSurroundingWord(text, position) {
    if (!text) throw Error('Argument \'text\' should be truthy');

    const isWordDelimiter = c => c === ' ' || c.charCodeAt(0) === 10;

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
        position: [leftIndex, rightIndex],
    };
}

/**
 * Returns the selection of the current work if selection[0] is equal to selection[1] and carret is inside a word
 *
 * @export
 * @param {any} text
 * @param {any} selection
 */
export function selectCurrentWorkIfCarretIsInsideOne(text, selection) {
    if (text && text.length && selection[0] === selection[1]) {
        // the user is pointing to a word
        return getSurroundingWord(text, selection[0]).position;
    }
    return selection;
}
