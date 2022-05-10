import * as React from "react";
import { Command } from "../command";
import { setHeader } from "../../helpers/headerHelpers";

export const headingLevel4Command: Command = {
  execute: ({ initialState, textApi }) => {
    setHeader(initialState, textApi, "#### ");
  }
};
