import {Command, TextSelection} from "../types";
import {makeList} from "../helpers/ReactMdeCommandHelper";

export const unorderedListCommand: Command = {
    icon: "list-ul",
    tooltip: "Add a bulleted list",
    execute: (text: string, selection: TextSelection) => makeList(text, selection, "- "),
};
