import { EditorState, ContentState, SelectionState } from "draft-js";
import { GenerateMarkdownPreview, MdeState, TextSelection, MarkdownState } from "../types";
export declare function getContentLengthOfAllBlocksBefore(editorState: any, key: any): number;
export declare function getSelection(editorState: EditorState): TextSelection;
export declare function getContentLengthBetween(editorState: any, startKey: any, startOffset: any, endKey: any, endOffset: any): number;
export declare function getPlainText(editorState: EditorState): string;
export declare function buildSelectionState(contentState: ContentState, selection: TextSelection): SelectionState;
export declare function getMarkdownStateFromDraftState(editorState: EditorState): MarkdownState;
export declare function getMdeStateFromDraftState(editorState: EditorState, generateMarkdownPreview: GenerateMarkdownPreview): Promise<MdeState>;
export declare function buildNewDraftState(currentState: EditorState, markdownState: MarkdownState): EditorState;
//# sourceMappingURL=DraftUtil.d.ts.map