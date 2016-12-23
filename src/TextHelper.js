/**
 * Inserts text in the given position
 * 
 * @param {any} text
 * @param {any} insertionText
 * @param {any} position
 * @returns
 */
export function  insertText(text, insertionText, position) {
    let newText = [text.slice(0, position), insertionText, text.slice(position)].join('');
    return { newText, insertionLength: insertionText.length };
}

/**
 * Gets the word surrounding the given position. Word delimiters are spaces and line-breaks
 * 
 * @export
 * @param {any} text
 * @param {any} position
 */
export function getSurroundingWord(text, position) {

    if(!text) throw Error('Argument \'text\' should be truthy');
    
    let isWordDelimiter = c => c == ' ' || c.charCodeAt(0) == 10;

    let leftIndex = 0; // leftIndex is initialized to 0 because if position is 0, it won't even enter the iteration
    let rightIndex = text.length; // rightIndex is initialized to text.length because if position is equal to text.length it won't even enter the interation
    
    // iterate to the left
    for(var i = position; i -1 > -1; i--) {
        if(isWordDelimiter(text[i - 1])) {
            leftIndex = i;
            break;
        }
    }

    // iterate to the right
    for(var i = position; i < text.length ; i++) {
        if(isWordDelimiter(text[i])) {
            rightIndex = i;
            break;
        }
    }

    return {
        word: text.slice(leftIndex, rightIndex),
        position: [leftIndex,rightIndex]
    };
}