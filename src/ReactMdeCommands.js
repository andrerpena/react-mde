/**
 * Inserts text in the given position
 * 
 * @param {any} text
 * @param {any} insertionText
 * @param {any} position
 * @returns
 */
function insertText(text, insertionText, position) {
    return [text.slice(0, position), insertionText, text.slice(position)].join('');
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
    }
}