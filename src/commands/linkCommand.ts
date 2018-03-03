import {Command, TextSelection} from "../types";
import {insertText} from "../helpers/ReactMdeTextHelper";

export const linkCommand: Command = {
    icon: "link",
    tooltip:
        "Insert a link",
    execute:
        (text: string, selection: TextSelection) => {
            const {newText, insertionLength} = insertText(text, "[", selection.start);
            const finalText = insertText(newText, "](url)", selection.end + insertionLength).newText;
            return {
                text: finalText,
                selection: {
                    start: selection.start + insertionLength,
                    end: selection.end + insertionLength,
                },
            };
        },
};