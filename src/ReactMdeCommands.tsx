import * as React from 'react';

import {
    // text insertion
    insertText,
    insertBefore,
    insertAfter,
    insertBreaksBeforeSoThatThereIsAnEmptyLineBefore,
    insertBreaksAfterSoThatThereIsAnEmptyLineAfter,
    // others
    selectCurrentWordIfCaretIsInsideOne,
} from './ReactMdeTextHelper';

import {
    makeList,
    makeHeader,
    makeACommandThatInsertsBeforeAndAfter,
} from './ReactMdeCommandHelper';
import { TextSelection } from './types/TextSelection';
import { Command } from './types/Command';
import { CommandSet } from './types/CommandSet';

const makeHeaderCommand: CommandSet = {
    type: 'dropdown',
    icon: 'header',
    subCommands: [
        {
            content: <p className="header-1">Header</p>,
            execute: (text: string, selection: TextSelection) => {
                return makeHeader(text, selection, '# ');
            },
        },
        {
            content: <p className="header-2">Header</p>,
            execute(text: string, selection: TextSelection) {
                return makeHeader(text, selection, '## ');
            },
        },
        {
            content: <p className="header-3">Header</p>,
            execute(text: string, selection: TextSelection) {
                return makeHeader(text, selection, '### ');
            },
        },
    ],
};

const makeBoldCommand: Command = {
    icon: 'bold',
    tooltip:
        'Add bold text',
    execute:
        (text: string, selection: TextSelection) => {
            return makeACommandThatInsertsBeforeAndAfter(text, selection, '**');
        },
};

const makeItalicCommand: Command = {
    icon: 'italic',
    tooltip:
        'Add italic text',
    execute:
        (text: string, selection: TextSelection) => {
            return makeACommandThatInsertsBeforeAndAfter(text, selection, '_');
        },
};

const makeLinkCommand = {
    icon: 'link',
    tooltip:
        'Insert a link',
    execute:
        (text: string, selection: TextSelection) => {
            const {newText, insertionLength} = insertText(text, '[', selection.start);
            const finalText = insertText(newText, '](url)', selection.end + insertionLength).newText;
            return {
                text: finalText,
                selection: {
                    start: selection.start + insertionLength,
                    end: selection.end + insertionLength,
                },
            };
        },
};

const makeQuoteCommand = {
    icon: 'quote-right',
    tooltip: 'Insert a quote',
    execute:
        (text: string, selection: TextSelection) => {
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
                selection,
            };
        },
};

const makeCodeCommand: Command = {
    icon: 'code',
    tooltip: 'Insert code',
    execute:
        (text = '', selection: TextSelection) => {
            selection = selectCurrentWordIfCaretIsInsideOne(text, selection);

            if (text.slice(selection.start, selection.end).indexOf('\n') === -1) {
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
            textInsertion = insertAfter(text, '\n```', selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            // insert breaks after, if needed
            textInsertion = insertBreaksAfterSoThatThereIsAnEmptyLineAfter(text, selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;

            return {text, selection};
        },
};

const makeImageCommand: Command = {
    icon: 'picture-o',
    tooltip: 'Insert a picture',
    execute:
        (text: string, selection: TextSelection) => {
            const {newText, insertionLength} = insertText(text, '![', selection.start);
            const finalText = insertText(newText, '](image-url)', selection.end + insertionLength).newText;
            return {
                text: finalText,
                selection: {
                    start: selection.start + insertionLength,
                    end: selection.end + insertionLength,
                },
            };
        },
};

const makeUnorderedListCommand: Command = {
    icon: 'list-ul',
    tooltip: 'Add a bulleted list',
    execute:
        (text: string, selection: TextSelection) => {
            return makeList(text, selection, '- ');
        },
};

const makeOrderedListCommand: Command = {
    icon: 'list-ol',
    tooltip: 'Add a numbered list',
    execute:
        (text: string, selection: TextSelection) => {
            return makeList(text, selection, (item: string, index: number) => `${index + 1}. `);
        },
};

export const defaultCommands = [
    [makeHeaderCommand, makeBoldCommand, makeItalicCommand],
    [makeLinkCommand, makeQuoteCommand, makeCodeCommand, makeImageCommand],
    [makeUnorderedListCommand, makeOrderedListCommand],
];
