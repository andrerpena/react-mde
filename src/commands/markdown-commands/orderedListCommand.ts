import { Command } from "../command";
import { makeList } from "../../helpers/listHelpers";

export const orderedListCommand: Command = {
  execute: ({ initialState, textApi }) => {
    makeList(initialState, textApi, (item, index) => `${index + 1}. `);
  }
};
