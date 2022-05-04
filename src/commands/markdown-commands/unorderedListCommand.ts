import { Command } from "../command";
import { makeList } from "../../helpers/listHelpers";

export const unorderedListCommand: Command = {
  execute: ({ initialState, textApi }) => {
    makeList(initialState, textApi, "- ");
  }
};
