import React from 'react';

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

function makeHeader(text, selection, insertionBefore) {
    if (text && text.length && selection[0] == selection[1]) {
        // the user is pointing to a word
        selection = getSurroundingWord(text, selection[0]).position;
    }
    // the user is selecting a word section
    var {newText, insertionLength} = insertText(text, insertionBefore, selection[0]);
    return {
        previousText: text,
        text: newText,
        selection: [selection[0] + insertionLength, selection[1] + insertionLength]
    }
}

export default {

    makeHeader: {
        type: 'command-set',
        icon: 'header',
        subCommands: [
            {
                content: <p className="header-1">Header</p>,
                execute: function (text, selection) {
                    return makeHeader(text, selection, '# ');
                }
            },
            {
                content: <p className="header-2">Header</p>,
                execute: function (text, selection) {
                    return makeHeader(text, selection, '## ');
                }
            },
            {
                content: <p className="header-3">Header</p>,
                execute: function (text, selection) {
                    return makeHeader(text, selection, '### ');
                }
            }
        ]
    },

    makeBold: {
        icon: 'bold',
        tooltip: 'Add bold text',
        execute: function (text, selection) {
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
        }
    },

    makeItalic: {
        icon: 'italic',
        tooltip: 'Add italic text',
        execute: function (text, selection) {
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
        }
    },

    makeLink: {
        icon: 'link',
        tooltip: 'Insert a link',
        execute: function (text, selection) {
            var {newText, insertionLength} = insertText(text, '[', selection[0]);
            newText = insertText(newText, '](url)', selection[1] + insertionLength).newText;
            return {
                previousText: text,
                text: newText,
                selection: [selection[0] + insertionLength, selection[1] + insertionLength]
            }
        }
    },

    makeQuote: {
        icon: 'quote-right',
        tooltip: 'Insert a quote',
        execute: function (text, selection) {
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
        }
    },

    makeImage: {
        icon: 'picture-o',
        tooltip: 'Insert a picture',
        execute: function (text, selection) {
            var {newText, insertionLength} = insertText(text, '![', selection[0]);
            newText = insertText(newText, '](image-url)', selection[1] + insertionLength).newText;
            return {
                previousText: text,
                text: newText,
                selection: [selection[0] + insertionLength, selection[1] + insertionLength]
            }
        }
    },

    makeUnorderedList: {
        icon: 'list-ul',
        tooltip: 'Add a bulleted list',
        execute: function (text, selection) {
            return makeList(text, selection, '- ');
        }
    },

    makeOrderedList: {
        icon: 'list-ol',
        tooltip: 'Add a numbered list',
        execute: function (text, selection) {
            return makeList(text, selection, (item, index) => `${index + 1}. `);
        }
    },

    getDefaultCommands: function () {
        return [
            [this.makeHeader],
            [this.makeBold, this.makeItalic],
            [this.makeLink, this.makeQuote, this.makeImage],
            [this.makeUnorderedList, this.makeOrderedList]
        ]
    }

}