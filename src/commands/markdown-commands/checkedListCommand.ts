import { Command } from "../command";
import { makeList } from "../../helpers/listHelpers";

export const checkedListCommand: Command = {
  execute: ({ initialState, textApi }) => {
    makeList(initialState, textApi, () => `- [ ] `);
  }
};
