import {Command} from "../types";
import React = require("react");
import {makeHeader} from "../MarkdownUtil";

export const headerCommand: Command = {
    icon: "heading",
    tooltip: "Add header",
    commands: [
        {
            text: <p className="header-1">Header</p>,
            execute: (getMarkdownState, setMarkdownState) => {
                const {text, selection} = getMarkdownState()
                setMarkdownState(makeHeader({text, selection}, "# "));
            },
        },
        {
            text: <p className="header-2">Header</p>,
            execute: (getMarkdownState, setMarkdownState) => {
                const {text, selection} = getMarkdownState()
                setMarkdownState(makeHeader({text, selection}, "## "));
            },
        },
        {
            text: <p className="header-3">Header</p>,
            execute: (getMarkdownState, setMarkdownState) => {
                const {text, selection} = getMarkdownState()
                setMarkdownState(makeHeader({text, selection}, "### "));
            },
        },
    ],
};
