import { selectWord } from "../util/MarkdownUtil";

export const linkCommand = {
  name: "link",
  buttonProps: { "aria-label": "Add a link" },
  execute: (state0, api) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: state0.text,
      selection: state0.selection
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the bold mark up
    const state2 = api.replaceSelection(`[${state1.selectedText}](https://)`);
    // Adjust the selection to not contain the **
    api.setSelectionRange({
      start: state2.selection.end - 11 - state1.selectedText.length,
      end: state2.selection.end - 11
    });
  },
  keyCommand: "bold"
};
