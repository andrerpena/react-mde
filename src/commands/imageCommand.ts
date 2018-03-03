import {Command, TextSelection} from "../types";
import {insertText} from "../helpers/ReactMdeTextHelper";

export const imageCommand: Command = {
    icon: "image",
    tooltip: "Insert a picture",
    execute:
        (text: string, selection: TextSelection) => {
            const {newText, insertionLength} = insertText(text, "![", selection.start);
            const finalText = insertText(newText, "](image-url)", selection.end + insertionLength).newText;
            return {
                text: finalText,
                selection: {
                    start: selection.start + insertionLength,
                    end: selection.end + insertionLength,
                },
            };
        },
};