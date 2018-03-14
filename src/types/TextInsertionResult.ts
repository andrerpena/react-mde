/**
 * The result of text being inserted
 */
import { TextSelection } from "./TextSelection";

export interface TextInsertionResult {
    newText: string;
    newSelection?: TextSelection;
    insertionLength: number;
}
