import {Command, TextSelection} from "../types";
import {makeACommandThatInsertsBeforeAndAfter} from "../helpers/ReactMdeCommandHelper";

export const boldCommand: Command = {
    icon: "bold",
    tooltip:
        "Add bold text",
    execute:
        (text: string, selection: TextSelection) => {
            return makeACommandThatInsertsBeforeAndAfter(text, selection, "**");
        },
};
