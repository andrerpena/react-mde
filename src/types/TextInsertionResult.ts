/**
 * The result of text being inserted
 */
import { TextRange } from "./TextRange";

export interface TextInsertionResult {
    newText: string;
    newSelection?: TextRange;
    insertionLength: number;
}
