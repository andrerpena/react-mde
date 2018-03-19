import {Command} from "../types";
import {makeList} from "../util/MarkdownUtil";

export const orderedListCommand: Command = {
    icon: "list-ol",
    tooltip: "Add a numbered list",
    execute: (getMarkdownState, setMarkdownState) =>
        setMarkdownState(
            makeList(getMarkdownState(),
                (item: string, index: number) => `${index + 1}. `)),
};
