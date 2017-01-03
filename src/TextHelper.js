/**
 * Inserts text in the given position
 * 
 * @param {any} text
 * @param {any} insertionText
 * @param {any} position
 * @returns
 */
export function insertText(text, insertionText, position) {
    let newText = [text.slice(0, position), insertionText, text.slice(position)].join('');
    return { newText, insertionLength: insertionText.length };
}

/**
 * Inserts insertionString before each line
 */
export function insertBeforeEachLine(text, insertion, selection) {
    var substring = text.slice(selection[0], selection[1]);
    var lines = substring.split(/\n/);

    let insertionLength = 0;
    let modifiedText = lines.map((item, index) => {

        if (typeof insertion === 'string') {
            insertionLength += insertion.length;
            return insertion + item;
        }
        else if (typeof insertion === 'function') {
            let _insertion = insertion(item, index);
            insertionLength += _insertion.length;
            return insertion(item, index) + item;
        }

    }).join('\n')

    let newText = text.slice(0, selection[0]) + modifiedText + text.slice(selection[1])
    return { newText, newSelection: [selection[0], selection[1] + insertionLength] }
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

    let isWordDelimiter = c => c == ' ' || c.charCodeAt(0) == 10;

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
export function getBreaksNeededForEmptyLineBefore(text, startPosition) {
    if (!text) throw Error('Argument \'text\' should be truthy');
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