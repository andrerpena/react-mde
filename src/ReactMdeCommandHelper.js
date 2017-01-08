import {
    insertText,
    insertBeforeEachLine,
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

    let breaksNeededBefore = getBreaksNeededForEmptyLineBefore(text, selection[0]);
    insertionBefore = Array(breaksNeededBefore + 1).join("\n");

    // if line-breaks have to be added before
    if (insertionBefore) {
        textInsertion = insertText(text, insertionBefore, selection[0]);
        text = textInsertion.newText;
        selection = selection.map(s => s + textInsertion.insertionLength)
    }

    textInsertion = insertBeforeEachLine(text, insertionBeforeEachLine, selection);
    text = textInsertion.newText;
    selection = textInsertion.newSelection;

    let breaksNeededAfter = getBreaksNeededForEmptyLineAfter(text, selection[1]);
    insertionAfter = Array(breaksNeededAfter + 1).join("\n");

    if (insertionAfter) {
        textInsertion = insertText(text, insertionAfter, selection[1]);
        text = textInsertion.newText;
    }

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

export function makeACommandThatInsertsBeforeAndAfter(text, selection, inserton) {
    selection = selectCurrentWorkIfCarretIsInsideOne(text, selection);
    // the user is selecting a word section
    var {newText, insertionLength} = insertText(text, selection, selection[0]);
    newText = insertText(newText, selection, selection[1] + insertionLength).newText;
    return {
        text: newText,
        selection: [selection[0] + insertionLength, selection[1] + insertionLength]
    }
}