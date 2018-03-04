import {Command, TextSelection} from "../types";
import {makeACommandThatInsertsBeforeAndAfter} from "../helpers/ReactMdeCommandHelper";

export const italicCommand: Command = {
    icon: "italic",
    tooltip:
        "Add italic text",
    execute:
        (text: string, selection: TextSelection) => {
            return makeACommandThatInsertsBeforeAndAfter(text, selection, "_");
        },
};
