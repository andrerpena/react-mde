import {
    insertText,
    insertBeforeEachLine,
    insertBreaksBeforeSoThatTheresAnEmptyLineBefore,
    insertBreaksAfterSoThatTheresAnEmptyLineAfter,
    getBreaksNeededForEmptyLineBefore,
    getBreaksNeededForEmptyLineAfter
} from './ReactMdeTextHelper'

import {
    selectCurrentWorkIfCarretIsInsideOne
} from './ReactMdeTextHelper'

/**
 * Helper for creating commands that make lists 
 * @export
 * @param {any} text
 * @param {any} selection
 * @param {any} insertionBeforeEachLine
 * @returns
 */
export function makeList(text, selection, insertionBeforeEachLine) {

    let textInsertion;
    var insertionBefore = '';
    var insertionAfter = '';

    selection = selectCurrentWorkIfCarretIsInsideOne(text, selection);

    textInsertion = insertBreaksBeforeSoThatTheresAnEmptyLineBefore(text, selection);
    text = textInsertion.newText;
    selection = textInsertion.newSelection;

    textInsertion = insertBeforeEachLine(text, insertionBeforeEachLine, selection);
    text = textInsertion.newText;
    selection = textInsertion.newSelection;

    textInsertion = insertBreaksAfterSoThatTheresAnEmptyLineAfter(text, selection);
    text = textInsertion.newText;
    selection = textInsertion.newSelection;

    return {
        text: text,
        selection: selection
    }
}

/**
 * Helper for creating a command that makes a header
 * @param {any} text
 * @param {any} selection
 * @param {any} insertionBefore
 * @returns
 */
export function makeHeader(text, selection, insertionBefore) {
    selection = selectCurrentWorkIfCarretIsInsideOne(text, selection);
    // the user is selecting a word section
    var {newText, insertionLength} = insertText(text, insertionBefore, selection[0]);
    return {
        text: newText,
        selection: [selection[0] + insertionLength, selection[1] + insertionLength]
    }
}

export function makeACommandThatInsertsBeforeAndAfter(text, selection, insertion) {
    selection = selectCurrentWorkIfCarretIsInsideOne(text, selection);
    // the user is selecting a word section
    var {newText, insertionLength} = insertText(text, insertion, selection[0]);
    newText = insertText(newText, insertion, selection[1] + insertionLength).newText;
    return {
        text: newText,
        selection: [selection[0] + insertionLength, selection[1] + insertionLength]
    }
}