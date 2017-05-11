import {
    insertText,
    insertBefore,
    insertBeforeEachLine,
    selectCurrentWorkIfCarretIsInsideOne,
    insertBreaksBeforeSoThatTheresAnEmptyLineBefore,
    insertBreaksAfterSoThatTheresAnEmptyLineAfter
} from './ReactMdeTextHelper';

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

    selection = selectCurrentWorkIfCarretIsInsideOne(text, selection);

    // insert breaks before, if needed
    textInsertion = insertBreaksBeforeSoThatTheresAnEmptyLineBefore(text, selection);
    text = textInsertion.newText;
    selection = textInsertion.newSelection;

    // inserts 'insertionBeforeEachLine' before each line
    textInsertion = insertBeforeEachLine(text, insertionBeforeEachLine, selection);
    text = textInsertion.newText;
    selection = textInsertion.newSelection;

    // insert breaks after, if needed
    textInsertion = insertBreaksAfterSoThatTheresAnEmptyLineAfter(text, selection);
    text = textInsertion.newText;
    selection = textInsertion.newSelection;

    return {
        text,
        selection
    };
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
    const insertionText = insertBefore(text, insertionBefore, selection, false);
    const newText = insertionText.newText;
    const newSelection = insertionText.newSelection;
    return {
        text: newText,
        selection: newSelection
    };
}

export function makeACommandThatInsertsBeforeAndAfter(text, selection, insertion) {
    selection = selectCurrentWorkIfCarretIsInsideOne(text, selection);
    // the user is selecting a word section
    const { textAfterFirstInsertion, insertionLength } = insertText(text, insertion, selection[0]);
    const finalText = insertText(textAfterFirstInsertion, insertion, selection[1] + insertionLength).newText;
    return {
        text: finalText,
        selection: [selection[0] + insertionLength, selection[1] + insertionLength]
    };
}
