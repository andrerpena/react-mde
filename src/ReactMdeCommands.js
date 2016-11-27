function insertText(text, insertionText, position) {
    return [text.slice(0, position), insertionText, text.slice(position)].join('');
}

export default {

    makeBold: function (text, selection) {
        var newText = insertText(text, '**', selection[0]);
        newText = insertText(newText, '**', selection[1] + 2);
        return {
            text: newText,
            selection: [selection[0] + 2, selection[1] + 2]
        }
    },

    makeItalic: function (text, selection) {
        var newText = insertText(text, '*', selection[0]);
        newText = insertText(newText, '*', selection[1] + 1);
        return {
            text: newText,
            selection: [selection[0] + 1, selection[1] + 1]
        }
    }
}