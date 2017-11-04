import React from 'react';

import {
    // text insertion
    insertText,
    insertBefore,
    insertAfter,
    insertBreaksBeforeSoThatThereIsAnEmptyLineBefore,
    insertBreaksAfterSoThatThereIsAnEmptyLineAfter,
    // others
    selectCurrentWordIfCaretIsInsideOne
} from './ReactMdeTextHelper';

import {
    makeList,
    makeHeader,
    makeACommandThatInsertsBeforeAndAfter
} from './ReactMdeCommandHelper';

export default {

    makeHeader: {
        type: 'dropdown',
        icon: 'header',
        subCommands: [
            {
                content: <p className="header-1">Header</p>,
                execute(text, selection) {
                    return makeHeader(text, selection, '# ');
                }
            },
            {
                content: <p className="header-2">Header</p>,
                execute(text, selection) {
                    return makeHeader(text, selection, '## ');
                }
            },
            {
                content: <p className="header-3">Header</p>,
                execute(text, selection) {
                    return makeHeader(text, selection, '### ');
                }
            }
        ]
    },

    makeBold: {
        icon: 'bold',
        tooltip: 'Add bold text',
        execute(text, selection) {
            return makeACommandThatInsertsBeforeAndAfter(text, selection, '**');
        }
    },

    makeItalic: {
        icon: 'italic',
        tooltip: 'Add italic text',
        execute(text, selection) {
            return makeACommandThatInsertsBeforeAndAfter(text, selection, '_');
        }
    },

    makeLink: {
        icon: 'link',
        tooltip: 'Insert a link',
        execute(text, selection) {
            const { textAfterFirstInsertion, insertionLength } = insertText(text, '[', selection[0]);
            const finalText = insertText(textAfterFirstInsertion, '](url)', selection[1] + insertionLength).textAfterFirstInsertion;
            return {
                text: finalText,
                selection: [selection[0] + insertionLength, selection[1] + insertionLength]
            };
        }
    },

    makeQuote: {
        icon: 'quote-right',
        tooltip: 'Insert a quote',
        execute(text, selection) {
            selection = selectCurrentWordIfCaretIsInsideOne(text, selection);

            let textInsertion;

            textInsertion = insertBreaksBeforeSoThatThereIsAnEmptyLineBefore(text, selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            textInsertion = insertBefore(text, '> ', selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            textInsertion = insertBreaksAfterSoThatThereIsAnEmptyLineAfter(text, selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            return {
                text,
                selection
            };
        }
    },

    makeCode: {
        icon: 'code',
        tooltip: 'Insert code',
        execute(text = '', selection) {
            selection = selectCurrentWordIfCaretIsInsideOne(text, selection);

            if (text.slice(selection[0], selection[1]).indexOf('\n') === -1) {
                // when there's no breaking line
                return makeACommandThatInsertsBeforeAndAfter(text, selection, '`');
            }
            let textInsertion;

                // insert breaks before, if needed
            textInsertion = insertBreaksBeforeSoThatThereIsAnEmptyLineBefore(text, selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

                // inserts ```\n before
            textInsertion = insertBefore(text, '```\n', selection, false);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

                // inserts ```\n after
            textInsertion = insertAfter(text, '\n```', selection, false);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

                // insert breaks after, if needed
            textInsertion = insertBreaksAfterSoThatThereIsAnEmptyLineAfter(text, selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            return { text, selection };
        }
    },

    makeImage: {
        icon: 'picture-o',
        tooltip: 'Insert a picture',
        execute(text, selection) {
            const { textAfterFirstInsertion, insertionLength } = insertText(text, '![', selection[0]);
            const finalText = insertText(textAfterFirstInsertion, '](image-url)', selection[1] + insertionLength).newText;
            return {
                text: finalText,
                selection: [selection[0] + insertionLength, selection[1] + insertionLength]
            };
        }
    },

    makeUnorderedList: {
        icon: 'list-ul',
        tooltip: 'Add a bulleted list',
        execute(text, selection) {
            return makeList(text, selection, '- ');
        }
    },

    makeOrderedList: {
        icon: 'list-ol',
        tooltip: 'Add a numbered list',
        execute(text, selection) {
            return makeList(text, selection, (item, index) => `${index + 1}. `);
        }
    },

    getDefaultCommands() {
        return [
            [this.makeHeader, this.makeBold, this.makeItalic],
            [this.makeLink, this.makeQuote, this.makeCode, this.makeImage],
            [this.makeUnorderedList, this.makeOrderedList]
        ];
    }

};
