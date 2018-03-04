import {Command, TextSelection} from "../types";
import {makeList} from "../helpers/ReactMdeCommandHelper";

export const orderedListCommand: Command = {
    icon: "list-ol",
    tooltip: "Add a numbered list",
    execute: (text: string, selection: TextSelection) => makeList(text, selection, (item: string, index: number) => `${index + 1}. `),
};
