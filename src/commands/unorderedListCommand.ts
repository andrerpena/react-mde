import {Command} from "../types";
import {makeList} from "../MarkdownUtil";

export const unorderedListCommand: Command = {
    icon: "list-ul",
    tooltip: "Add a bulleted list",
    execute: (getMarkdownState, setMarkdownState) => setMarkdownState(makeList(getMarkdownState(), "- ")),
};
