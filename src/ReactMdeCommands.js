import { insertText, getSurroundingWord, getBreaksNeededForQuote } from './TextHelper';

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
        if(selection[0] > 0) {
            let breaksNeeded = getBreaksNeededForQuote(text, selection[0]);
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
    }
}