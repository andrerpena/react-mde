import { selectWord } from "../util/MarkdownUtil";

export const imageCommand = {
  name: "image",
  buttonProps: { "aria-label": "Add image" },
  execute: (state0, api) => {
    // Select everything
    const newSelectionRange = selectWord({
      text: state0.text,
      selection: state0.selection
    });
    const state1 = api.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the image
    const imageTemplate =
      state1.selectedText || "https://example.com/your-image.png";
    api.replaceSelection(`![example.png](${imageTemplate})`);
    // Adjust the selection to not contain the **
    api.setSelectionRange({
      start: 15 + state1.selection.start,
      end: 15 + state1.selection.start + imageTemplate.length
    });
  },
  keyCommand: "image"
};
