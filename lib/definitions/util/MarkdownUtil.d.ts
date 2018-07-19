import { TextInsertionResult, TextSelection, Word, AlterLineFunction, MarkdownState } from "../types";
export declare function getSurroundingWord(text: string, position: number): Word;
export declare function insertBeforeAndAfter(markdownState: MarkdownState, insertion: string): MarkdownState;
export declare function selectWordIfCaretIsInsideOne({ text, selection }: MarkdownState): TextSelection;
/**
 * Inserts breaks before, only if needed. The returned selection will not include this breaks
 *
 * @export
 * @param {any} text
 * @param {any} selection
 * @returns
 */
export declare function insertBreaksBeforeSoThatThereIsAnEmptyLineBefore({ text, selection }: MarkdownState): TextInsertionResult;
/**
 * Inserts the given text before. The selection is moved ahead so the
 *
 * @export
 * @param {any} originalText
 * @param {any} textToInsert
 * @param {any} selection
 * @param selectInsertion {boolean} Whether or not the inserted text should be selected
 * @returns
 */
export declare function insertBefore(originalText: string, textToInsert: string, selection: TextSelection, selectInsertion?: boolean): TextInsertionResult;
/**
 * Inserts the given text after. The selection will change to encompass the new text
 *
 * @export
 * @param {any} originalText
 * @param {any} textToInsert
 * @param {any} selection
 * @returns
 */
export declare function insertAfter(originalText: string, textToInsert: string, selection: TextSelection): TextInsertionResult;
/**
 * Inserts "textToBeInserted" in "text" at the "insertionPosition"
 *
 * @param {any} originalText
 * @param {any} textToInsert
 * @param {any} insertionPosition
 * @returns
 */
export declare function insertText(originalText: string, textToInsert: string, insertionPosition: number): TextInsertionResult;
/**
 *  Gets the number of line-breaks that would have to be inserted before the given 'startPosition'
 *  to make sure there's an empty line between 'startPosition' and the previous text
 */
export declare function getBreaksNeededForEmptyLineBefore(text: string, startPosition: number): number;
/**
 *  Gets the number of line-breaks that would have to be inserted after the given 'startPosition'
 *  to make sure there's an empty line between 'startPosition' and the next text
 */
export declare function getBreaksNeededForEmptyLineAfter(text: string, startPosition: number): number;
/**
 * Inserts breaks after, only if needed. The returned selection will not include this breaks
 *
 * @export
 * @returns
 * @param markdownState
 */
export declare function insertBreaksAfterSoThatThereIsAnEmptyLineAfter({ text, selection }: MarkdownState): TextInsertionResult;
/**
 * Inserts insertionString before each line
 */
export declare function insertBeforeEachLine(text: string, insertion: string | AlterLineFunction, selection: TextSelection): TextInsertionResult;
/**
 * Helper for creating commands that make lists
 * @export
 * @param markdownState
 * @param {any} insertionBeforeEachLine
 * @returns
 */
export declare function makeList({ text, selection }: MarkdownState, insertionBeforeEachLine: string | AlterLineFunction): MarkdownState;
export declare function onTab({ text, selection }: MarkdownState, reverse: boolean): MarkdownState;
/**
 * Helper for creating a command that makes a header
 * @param {any} text
 * @param {any} selection
 * @param {any} insertionBefore
 * @returns
 */
export declare function makeHeader({ text, selection }: MarkdownState, insertionBefore: string): MarkdownState;
//# sourceMappingURL=MarkdownUtil.d.ts.map