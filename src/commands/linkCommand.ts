import {Command} from "../types";
import {insertText} from "../util/MarkdownUtil";

export const linkCommand: Command = {
    icon: "link",
    tooltip:
        "Insert a link",
    execute:
        (getMarkdownState, setMarkdownState) => {
            const {text, selection} = getMarkdownState();
            const {newText, insertionLength} = insertText(text, "[", selection.start);
            const finalText = insertText(newText, "](url)", selection.end + insertionLength).newText;
            setMarkdownState({
                text: finalText,
                selection: {
                    start: selection.start + insertionLength,
                    end: selection.end + insertionLength,
                },
            });
        },
};
