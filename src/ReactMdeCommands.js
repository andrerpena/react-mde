import React from 'react';

import {
    // text insertion
    insertText,
    insertBeforeEachLine,
    // others
    selectCurrentWorkIfCarretIsInsideOne,
    getSurroundingWord,
    getBreaksNeededForEmptyLineBefore,
    getBreaksNeededForEmptyLineAfter } from './ReactMdeTextHelper';

import {
    makeList,
    makeHeader,
    makeACommandThatInsertsBeforeAndAfter
} from './ReactMdeCommandHelper';

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
            return makeACommandThatInsertsBeforeAndAfter(text, selection, '**');
        }
    },

    makeItalic: {
        icon: 'italic',
        tooltip: 'Add italic text',
        execute: function (text, selection) {
            return makeACommandThatInsertsBeforeAndAfter(text, selection, '_');
        }
    },

    makeLink: {
        icon: 'link',
        tooltip: 'Insert a link',
        execute: function (text, selection) {
            var {newText, insertionLength} = insertText(text, '[', selection[0]);
            newText = insertText(newText, '](url)', selection[1] + insertionLength).newText;
            return {
                text: newText,
                selection: [selection[0] + insertionLength, selection[1] + insertionLength]
            }
        }
    },

    makeQuote: {
        icon: 'quote-right',
        tooltip: 'Insert a quote',
        execute: function (text, selection) {
            selection = selectCurrentWorkIfCarretIsInsideOne(text, selection);

            

            let insertionBefore = '> ';
            if (selection[0] > 0) {
                let breaksNeeded = getBreaksNeededForEmptyLineBefore(text, selection[0]);
                insertionBefore = Array(breaksNeeded + 1).join("\n") + insertionBefore;
            }

            // the user is selecting a word section
            var {newText, insertionLength} = insertText(text, insertionBefore, selection[0]);
            newText = insertText(newText, '\n\n', selection[1] + insertionLength).newText;
            return {
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
            [this.makeHeader, this.makeBold, this.makeItalic],
            [this.makeLink, this.makeQuote, this.makeImage],
            [this.makeUnorderedList, this.makeOrderedList]
        ]
    }

}