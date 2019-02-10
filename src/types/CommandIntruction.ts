export const INSERT_TEXT_AT_CURSOR = "INSERT_TEXT_AT_CURSOR";
export const SELECT_RANGE = "SELECT_RANGE";

export interface InsertTextAtCursorInstruction {
  type: typeof INSERT_TEXT_AT_CURSOR,
  text: string
}

export interface SelectRangeInstruction {
  type: typeof SELECT_RANGE
  selectionStart: number;
  selectionEnd: number;
}

export type Instruction = InsertTextAtCursorInstruction | SelectRangeInstruction
