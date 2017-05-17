
/**
 * Gets the selection of the given element
 *
 * @param {any} element
 * @returns
 */
export function getSelection(element) {
    if (!element) throw Error('Argument \'element\' should be truthy');
    return [element.selectionStart, element.selectionEnd];
}

/**
 * Sets the selection of the given element
 *
 * @param {any} element
 * @param {any} start
 * @param {any} end
 */
export function setSelection(element, start, end) {
    if (!element) throw Error('Argument \'element\' should be truthy');

    element.focus();
    if (!element.setSelectionRange) { throw Error('Incompatible browser. element.setSelectionRange is not defined'); }
    element.setSelectionRange(start, end);
}
