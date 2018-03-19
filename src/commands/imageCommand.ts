import {Command} from "../types";
import {insertText} from "../util/MarkdownUtil";

export const imageCommand: Command = {
    icon: "image",
    tooltip: "Insert a picture",
    execute:
        (getMarkdownState, setMarkdownState) => {
            const {text, selection} = getMarkdownState();
            const {newText, insertionLength} = insertText(text, "![", selection.start);
            const finalText = insertText(newText, "](image-url)", selection.end + insertionLength).newText;
            setMarkdownState({
                text: finalText,
                selection: {
                    start: selection.start + insertionLength,
                    end: selection.end + insertionLength,
                },
            });
        },
};
