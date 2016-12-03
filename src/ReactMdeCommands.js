import { insertText, getSurroundingWord } from './TextHelper';

export default {

    /**
     * Makes the text bold
     * 
     * @param {any} text
     * @param {any} selection
     * @returns
     */
    makeBold: function (text, selection) {

        if (selection[0] == selection[1]) {
            // the user is pointing to a word
            selection = getSurroundingWord(text, selection[0]).position;

        }
        // the user is selecting a word section
        var newText = insertText(text, '**', selection[0]);
        newText = insertText(newText, '**', selection[1] + 2);
        return {
            text: newText,
            selection: [selection[0] + 2, selection[1] + 2]
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
        var newText = insertText(text, '*', selection[0]);
        newText = insertText(newText, '*', selection[1] + 1);
        return {
            text: newText,
            selection: [selection[0] + 1, selection[1] + 1]
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

        var newText = insertText(text, '[', selection[0]);
        newText = insertText(newText, '](url)', selection[1] + 1);
        return {
            text: newText,
            selection: [selection[0] + 1, selection[1] + 1]
        }
    },

    makeQuote: function (text, selection) {
        var newText = insertText(text, '[', selection[0]);
        newText = insertText(newText, '](url)', selection[1] + 1);
        return {
            text: newText,
            selection: [selection[0] + 1, selection[1] + 1]
        }
    }
}