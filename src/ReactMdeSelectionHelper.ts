import { TextSelection } from './types/TextSelection';

/**
 * Gets the selection of the given element
 *
 * @param {any} element
 * @returns
 */
export function getSelection(element: HTMLTextAreaElement): TextSelection {
    if (!element) throw Error('Argument \'element\' should be truthy');
    return {
        start: element.selectionStart,
        end: element.selectionEnd,
    };
}

/**
 * Sets the selection of the given element
 *
 * @param {any} element
 * @param {any} start
 * @param {any} end
 */
export function setSelection(element: HTMLTextAreaElement, start: number, end: number): void {
    if (!element) throw Error('Argument \'element\' should be truthy');

    element.focus();
    if (!element.setSelectionRange) {
        throw Error('Incompatible browser. element.setSelectionRange is not defined');
    }
    element.setSelectionRange(start, end);
}
