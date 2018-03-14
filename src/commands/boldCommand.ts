import {Command} from "../types";
import {insertBeforeAndAfter} from "../MarkdownUtil";

export const boldCommand: Command = {
    icon: "bold",
    tooltip:
        "Add bold text",
    execute:
        (getMarkdownState, setMarkdownState) => {
            setMarkdownState(insertBeforeAndAfter(getMarkdownState(), "**"));
        },
};
