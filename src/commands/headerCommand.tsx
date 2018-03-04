import {CommandSet, TextSelection} from "../types";
import {makeHeader} from "../helpers/ReactMdeCommandHelper";
import React = require("react");

export const headerCommand: CommandSet = {
    type: "dropdown",
    icon: "heading",
    subCommands: [
        {
            content: <p className="header-1">Header</p>,
            execute: (text: string, selection: TextSelection) => {
                return makeHeader(text, selection, "# ");
            },
        },
        {
            content: <p className="header-2">Header</p>,
            execute(text: string, selection: TextSelection) {
                return makeHeader(text, selection, "## ");
            },
        },
        {
            content: <p className="header-3">Header</p>,
            execute(text: string, selection: TextSelection) {
                return makeHeader(text, selection, "### ");
            },
        },
    ],
};
