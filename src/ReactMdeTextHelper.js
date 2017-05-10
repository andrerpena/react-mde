// TEXT INSERTION HELPERS

/**
 * Inserts text in the given position
 *
 * @param {any} text
 * @param {any} insertionText
 * @param {any} position
 * @returns
 */
export function insertText(text, insertionText, position) {
    const newText = [text.slice(0, position), insertionText, text.slice(position)].join('');
    return { newText, insertionLength: insertionText.length };
}


/**
 * Inserts the given text before. The selection is moved ahead so the
 *
 * @export
 * @param {any} text
 * @param {any} insertionText
 * @param {any} selection
 * @returns
 */
export function insertBefore(text, insertionText, selection, includeTheInsertionInTheSelectioStart = true) {
    const textInsertion = insertText(text, insertionText, selection[0]);
    const newText = textInsertion.newText;
    const insertionLength = textInsertion.insertionLength;
    let newSelection;

    if (includeTheInsertionInTheSelectioStart) {
        // in this case, the text inserted before will be part of the resulting selection
        newSelection = [selection[0], selection[1] + insertionLength];
    } else {
        // in this case, the inserted before will NOT be part of the resulting selection
        newSelection = selection.map(s => s + textInsertion.insertionLength);
    }

    return { newText, newSelection };
}

/**
 * Inserts the given text after. The selection will change to encompass the new text
 *
 * @export
 * @param {any} text
 * @param {any} insertionText
 * @param {any} selection
 * @returns
 */
export function insertAfter(text, insertionText, selection) {
    const textInsertion = insertText(text, insertionText, selection[1]);
    const newText = textInsertion.newText;
    const insertionLength = textInsertion.insertionLength;
    let newSelection;

    newSelection = [selection[0], selection[1] + insertionLength];

    return { newText, newSelection };
}

/**
 * Inserts breaks before, only if needed. The returned selection will not include this breaks
 *
 * @export
 * @param {any} text
 * @param {any} selection
 * @returns
 */
export function insertBreaksBeforeSoThatTheresAnEmptyLineBefore(text, selection) {
    const breaksNeededBefore = getBreaksNeededForEmptyLineBefore(text, selection[0]);
    const insertionBefore = Array(breaksNeededBefore + 1).join('\n');

    let newText = text;
    let newSelection = selection;

    // if line-breaks have to be added before
    if (insertionBefore) {
        const textInsertion = insertText(text, insertionBefore, selection[0]);
        newText = textInsertion.newText;
        newSelection = selection.map(s => s + textInsertion.insertionLength);
    }

    return { newText, newSelection };
}

/**
 * Inserts breaks after, only if needed. The returned selection will not include this breaks
 *
 * @export
 * @param {any} text
 * @param {any} selection
 * @returns
 */
export function insertBreaksAfterSoThatTheresAnEmptyLineAfter(text, selection) {
    const breaksNeededBefore = getBreaksNeededForEmptyLineAfter(text, selection[1]);
    const insertionAfter = Array(breaksNeededBefore + 1).join('\n');

    let newText = text;
    let newSelection = selection;

    // if line-breaks have to be added before
    if (insertionAfter) {
        const textInsertion = insertText(text, insertionAfter, selection[1]);
        newText = textInsertion.newText;
        newSelection = selection.map(s => s + textInsertion.insertionLength);
    }

    return { newText, newSelection };
}


/**
 * Inserts insertionString before each line
 */
export function insertBeforeEachLine(text, insertion, selection) {
    const substring = text.slice(selection[0], selection[1]);
    const lines = substring.split(/\n/);

    let insertionLength = 0;
    const modifiedText = lines.map((item, index) => {
        if (typeof insertion === 'string') {
            insertionLength += insertion.length;
            return insertion + item;
        } else if (typeof insertion === 'function') {
            const _insertion = insertion(item, index);
            insertionLength += _insertion.length;
            return insertion(item, index) + item;
        }
    }).join('\n');

    const newText = text.slice(0, selection[0]) + modifiedText + text.slice(selection[1]);
    return { newText, newSelection: [selection[0], selection[1] + insertionLength] };
}

// MISC


/**
 * Returns the selection of the current work if selection[0] is equal to selection[1] and carret is inside a word
 *
 * @export
 * @param {any} text
 * @param {any} selection
 */
export function selectCurrentWorkIfCarretIsInsideOne(text, selection) {
    if (text && text.length && selection[0] == selection[1]) {
        // the user is pointing to a word
        return getSurroundingWord(text, selection[0]).position;
    }
    return selection;
}

/**
 * Gets the word surrounding the given position. Word delimiters are spaces and line-breaks
 *
 * @export
 * @param {any} text
 * @param {any} position
 */
export function getSurroundingWord(text, position) {
    if (!text) throw Error('Argument \'text\' should be truthy');

    const isWordDelimiter = c => c == ' ' || c.charCodeAt(0) == 10;

    let leftIndex = 0; // leftIndex is initialized to 0 because if position is 0, it won't even enter the iteration
    let rightIndex = text.length; // rightIndex is initialized to text.length because if position is equal to text.length it won't even enter the interation

    // iterate to the left
    for (var i = position; i - 1 > -1; i--) {
        if (isWordDelimiter(text[i - 1])) {
            leftIndex = i;
            break;
        }
    }

    // iterate to the right
    for (var i = position; i < text.length; i++) {
        if (isWordDelimiter(text[i])) {
            rightIndex = i;
            break;
        }
    }

    return {
        word: text.slice(leftIndex, rightIndex),
        position: [leftIndex, rightIndex]
    };
}

/**
 *  Gets the number of breaks needed so that there will be an empty line between the previous text
 */
export function getBreaksNeededForEmptyLineBefore(text = '', startPosition) {
    if (startPosition == 0) return 0;

    // rules:
    // - If we're in the first line, no breaks are needed
    // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
    //      may need to insert 0, 1 or 2 breaks

    let neededBreaks = 2;
    let isInFirstLine = true;
    for (let i = startPosition - 1; i >= 0 && (neededBreaks >= 0); i--) {
        switch (text.charCodeAt(i)) {
            case 32: continue;
            case 10: {
                neededBreaks--;
                isInFirstLine = false;
                break;
            }
            default: return neededBreaks;
        }
    }
    return isInFirstLine ? 0 : neededBreaks;
}

/**
 *  Gets the number of breaks needed so that there will be an empty line after the next text
 */
export function getBreaksNeededForEmptyLineAfter(text, startPosition) {
    if (!text) throw Error('Argument \'text\' should be truthy');
    if (startPosition == text.length - 1) return 0;

    // rules:
    // - If we're in the first line, no breaks are needed
    // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
    //      may need to insert 0, 1 or 2 breaks

    let neededBreaks = 2;
    let isInLastLine = true;
    for (let i = startPosition; i < text.length && (neededBreaks >= 0); i++) {
        switch (text.charCodeAt(i)) {
            case 32: continue;
            case 10: {
                neededBreaks--;
                isInLastLine = false;
                break;
            }
            default: return neededBreaks;
        }
    }
    return isInLastLine ? 0 : neededBreaks;
}
