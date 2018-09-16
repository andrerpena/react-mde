import { boldCommand } from "./boldCommand";
import { codeCommand } from "./codeCommand";
import { headerCommand } from "./headerCommand";
import { imageCommand } from "./imageCommand";
import { italicCommand } from "./italicCommand";
import { strikethroughCommand } from "./strikethroughCommand";
import { linkCommand } from "./linkCommand";
import { orderedListCommand } from "./orderedCommand";
import { quoteCommand } from "./quoteCommand";
import { unorderedListCommand } from "./unorderedListCommand";
import { checkListCommand } from "./checkListCommand";
import { CommandGroup } from "../types";

const getDefaultCommands: () => CommandGroup[] = () => [
  { commands: [headerCommand, boldCommand, italicCommand, strikethroughCommand] },
  { commands: [linkCommand, quoteCommand, codeCommand, imageCommand] },
  { commands: [unorderedListCommand, orderedListCommand, checkListCommand] }
];

export {
  boldCommand,
  codeCommand,
  headerCommand,
  imageCommand,
  italicCommand,
  strikethroughCommand,
  linkCommand,
  orderedListCommand,
  quoteCommand,
  unorderedListCommand,
  checkListCommand,
  getDefaultCommands
};
