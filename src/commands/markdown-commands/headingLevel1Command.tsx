import * as React from "react";
import { Command } from "../command";
import { setHeader } from "../../helpers/headerHelpers";

export const headingLevel1Command: Command = {
  execute: ({ initialState, textApi }) => {
    setHeader(initialState, textApi, "# ");
  }
};
