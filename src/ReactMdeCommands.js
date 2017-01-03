import { insertText, insertBeforeEachLine, getSurroundingWord, getBreaksNeededForEmptyLineBefore, getBreaksNeededForEmptyLineAfter } from './TextHelper';

function makeList(text, selection, insertionBeforeEachLine) {

    let textInsertion;
    var insertionBefore = '';
    var insertionAfter = '';

    if (text && text.length && selection[0] == selection[1]) {
        // the user is pointing to a word
        selection = getSurroundingWord(text, selection[0]).position;
    }

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
        previousText: text,
        text: text,
        selection: selection
    }
}

export default {

    /**
     * Makes the text bold
     * 
     * @param {any} text
     * @param {any} selection
     * @returns
     */
    makeBold: function (text, selection) {
        if (text && text.length && selection[0] == selection[1]) {
            // the user is pointing to a word
            selection = getSurroundingWord(text, selection[0]).position;
        }
        // the user is selecting a word section
        var {newText, insertionLength} = insertText(text, '**', selection[0]);
        newText = insertText(newText, '**', selection[1] + insertionLength).newText;
        return {
            previousText: text,
            text: newText,
            selection: [selection[0] + insertionLength, selection[1] + insertionLength]
        }
    },

    /**
     * Makes the text italic
     * 
     * @param {any} text
     * @param {any} selection
     * @returns
     */
    makeItalic: function (text, selection) {
        if (text && text.length && selection[0] == selection[1]) {
            // the user is pointing to a word
            selection = getSurroundingWord(text, selection[0]).position;
        }
        // the user is selecting a word section
        var {newText, insertionLength} = insertText(text, '_', selection[0]);
        newText = insertText(newText, '_', selection[1] + insertionLength).newText;
        return {
            previousText: text,
            text: newText,
            selection: [selection[0] + insertionLength, selection[1] + insertionLength]
        }
    },

    /**
     * Makes a link
     * 
     * @param {any} text
     * @param {any} selection
     * @returns
     */
    makeLink: function (text, selection) {
        var {newText, insertionLength} = insertText(text, '[', selection[0]);
        newText = insertText(newText, '](url)', selection[1] + insertionLength).newText;
        return {
            previousText: text,
            text: newText,
            selection: [selection[0] + insertionLength, selection[1] + insertionLength]
        }
    },

    makeQuote: function (text, selection) {
        if (text && text.length && selection[0] == selection[1]) {
            // the user is pointing to a word
            selection = getSurroundingWord(text, selection[0]).position;
        }

        let insertionBefore = '> ';
        if (selection[0] > 0) {
            let breaksNeeded = getBreaksNeededForEmptyLineBefore(text, selection[0]);
            insertionBefore = Array(breaksNeeded + 1).join("\n") + insertionBefore;
        }

        // the user is selecting a word section
        var {newText, insertionLength} = insertText(text, insertionBefore, selection[0]);
        newText = insertText(newText, '\n\n', selection[1] + insertionLength).newText;
        return {
            previousText: text,
            text: newText,
            selection: [selection[0] + insertionLength, selection[1] + insertionLength]
        }
    },


    /**
     * Makes an image
     * 
     * @param {any} text
     * @param {any} selection
     * @returns
     */
    makeImage: function (text, selection) {
        var {newText, insertionLength} = insertText(text, '![', selection[0]);
        newText = insertText(newText, '](image-url)', selection[1] + insertionLength).newText;
        return {
            previousText: text,
            text: newText,
            selection: [selection[0] + insertionLength, selection[1] + insertionLength]
        }
    },

    makeUnorderedList: function (text, selection) {
        return makeList(text, selection, '- ');
    },

    makeOrderedList: function (text, selection) {
        return makeList(text, selection, (item, index) => `${index + 1}. `);
    }

}