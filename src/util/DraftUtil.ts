import {EditorState, ContentState, SelectionState} from "draft-js";
import {MarkdownState} from "../types/MarkdownState";
import {GenerateMarkdownPreview, MdeState, TextSelection} from "../types";

export function getContentLengthOfAllBlocksBefore(editorState, key) {
    let count = 0;
    let blockBefore;
    let currentKey = key;
    while (true) {
        blockBefore = editorState.getCurrentContent().getBlockBefore(currentKey);
        if (!blockBefore) {
            break;
        }
        // we have to add 1 here to account for the \n character
        count += blockBefore.getText().length + 1;
        currentKey = blockBefore.getKey();
    }
    return count;
}

export function getSelection(editorState): TextSelection {
    const selection = editorState.getSelection();

    const startKey = selection.getStartKey();
    const startOffset = selection.getStartOffset();
    const endKey = selection.getEndKey();
    const endOffset = selection.getEndOffset();

    const editorWiseOffset = getContentLengthOfAllBlocksBefore(editorState, startKey);
    const offsetBetweenKeys = getContentLengthBetween(editorState, startKey, startOffset, endKey, endOffset);
    // start and end are on the same block
    return {start: startOffset + editorWiseOffset, end: startOffset + offsetBetweenKeys + editorWiseOffset};
}

export function getContentLengthBetween(editorState, startKey, startOffset, endKey, endOffset) {
    if (startKey === endKey) {
        return endOffset - startOffset;
    }
    let count = editorState.getCurrentContent().getBlockForKey(startKey).getText().length - startOffset;
    let blockAfter;
    let currentKey = startKey;
    while (true) {
        blockAfter = editorState.getCurrentContent().getBlockAfter(currentKey);
        if (!blockAfter || blockAfter.getKey() === endKey) {
            break;
        }
        // we have to add 1 here to account for the \n character
        count += (blockAfter.getText().length + 1);
        currentKey = blockAfter.getKey();
    }
    // we have to add 1 here to account for the \n character
    count += endOffset + 1;
    return count;
}

export function getPlainText(editorState: EditorState): string {
    return editorState.getCurrentContent().getPlainText("\n");
}

const findBlockKeyAndOffsetForPosition = (position, block, globalOffset, blockOffset, contentState) => {
    if (!block || position < globalOffset + blockOffset) {
        return null;
    }
    if (position > globalOffset + block.getText().length) {
        // the princess is in another castle
        return findBlockKeyAndOffsetForPosition(position, contentState.getBlockAfter(block.getKey()), globalOffset + block.getText().length + 1, 0, contentState);
    } else {
        // the princess is in this castle
        return {
            block,
            globalOffset,
            blockOffset: position - globalOffset,
        };
    }
};

export function buildSelectionState(contentState: ContentState, selection: TextSelection) {
    const firstBlock = contentState.getFirstBlock();
    if (firstBlock === null) {
        return null;
    }
    const startBlockData = findBlockKeyAndOffsetForPosition(selection.start, firstBlock, 0, 0, contentState);
    if (startBlockData === null) {
        return null;
    }
    const endBlockData = findBlockKeyAndOffsetForPosition(selection.end, startBlockData.block, startBlockData.globalOffset, startBlockData.blockOffset, contentState);
    if (endBlockData === null) {
        return null;
    }
    const selectionState = SelectionState.createEmpty(startBlockData.block.getKey());
    return selectionState.merge({
        anchorKey: startBlockData.block.getKey(),
        anchorOffset: startBlockData.blockOffset,
        focusKey: endBlockData.block.getKey(),
        focusOffset: endBlockData.blockOffset,
    }) as SelectionState;
}

export function getMarkdownStateFromDraftState(editorState: EditorState): MarkdownState {
    return {
        text: getPlainText(editorState),
        selection: getSelection(editorState),
    };
}

export async function getMdeStateFromDraftState(editorState: EditorState, generateMarkdownPreview: GenerateMarkdownPreview): Promise<MdeState> {
    const markdown = getPlainText(editorState);
    const html = generateMarkdownPreview ? await generateMarkdownPreview(markdown) : "";
    return {
        html,
        markdown,
        draftEditorState: editorState,
    };
}

export function buildNewDraftState(currentDraftState: EditorState, newText: string, newSelection: TextSelection = null) {
    let newDraftEditorState: EditorState;
    // TODO: Fix the redo. It's no working properly but this is an implementation detail.

    // handling text change history push
    const contentState = ContentState.createFromText(newText);
    newDraftEditorState = EditorState.forceSelection(currentDraftState, currentDraftState.getSelection());
    newDraftEditorState = EditorState.push(newDraftEditorState, contentState, "insert-characters");

    // handling text selection history push
    const newSelectionState = newSelection
        ? buildSelectionState(newDraftEditorState.getCurrentContent(), newSelection)
        : currentDraftState.getSelection();

    return EditorState.forceSelection(newDraftEditorState, newSelectionState);
}

export async function buildNewMdeState(currentState: MdeState, generateMarkdownPreview: GenerateMarkdownPreview, newText: string, newSelection: TextSelection = null): Promise<MdeState> {
    const newDraftState = buildNewDraftState(currentState.draftEditorState, newText, newSelection);
    const html = await generateMarkdownPreview(newText);
    return {
        html,
        markdown: newText,
        draftEditorState: newDraftState,
    };
}
