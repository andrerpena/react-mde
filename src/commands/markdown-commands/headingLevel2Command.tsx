import * as React from "react";
import { Command } from "../command";
import { setHeader } from "../../helpers/headerHelpers";

export const headingLevel2Command: Command = {
  execute: ({ initialState, textApi }) => {
    setHeader(initialState, textApi, "## ");
  }
};
