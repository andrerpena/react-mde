import { boldCommand } from "./boldCommand";
import { italicCommand } from "./italicCommand";
import { strikeThroughCommand } from "./strikeThroughCommand";
import { headerCommand } from "./headerCommand";
import { linkCommand } from "./linkCommand";
import { quoteCommand } from "./quoteCommand";
import { codeCommand } from "./codeCommand";
import { imageCommand } from "./imageCommand";
import {
  checkedListCommand,
  orderedListCommand,
  unorderedListCommand
} from "./listCommands";

const getDefaultCommands = () => [
  {
    commands: [headerCommand, boldCommand, italicCommand, strikeThroughCommand]
  },
  {
    commands: [linkCommand, quoteCommand, codeCommand, imageCommand]
  },
  {
    commands: [unorderedListCommand, orderedListCommand, checkedListCommand]
  }
];

export {
  boldCommand,
  italicCommand,
  strikeThroughCommand,
  headerCommand,
  linkCommand,
  quoteCommand,
  codeCommand,
  imageCommand,
  checkedListCommand,
  orderedListCommand,
  unorderedListCommand,
  getDefaultCommands
};
