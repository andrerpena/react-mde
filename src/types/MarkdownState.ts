import {TextRange} from "./TextRange";

export interface MarkdownState {
    selection: TextRange;
    text: string;
}
