import {Command} from "../types";
import {insertBeforeAndAfter} from "../util/MarkdownUtil";

export const boldCommand: Command = {
    icon: "bold",
    tooltip:
        "Add bold text",
    execute:
        (getMarkdownState, setMarkdownState) => {
            setMarkdownState(insertBeforeAndAfter(getMarkdownState(), "**"));
        },
};
