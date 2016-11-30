/**
 * Inserts text in the given position
 * 
 * @param {any} text
 * @param {any} insertionText
 * @param {any} position
 * @returns
 */
export function  insertText(text, insertionText, position) {
    return [text.slice(0, position), insertionText, text.slice(position)].join('');
}
