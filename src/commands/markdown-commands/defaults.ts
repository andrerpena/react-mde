import { CommandMap } from "../command";
import { headerCommand } from "./headerCommand";
import { boldCommand } from "./boldCommand";
import { italicCommand } from "./italicCommand";
import { strikeThroughCommand } from "./strikeThroughCommand";
import { linkCommand } from "./linkCommand";
import { quoteCommand } from "./quoteCommand";
import { codeCommand } from "./codeCommand";
import {
  checkedListCommand,
  orderedListCommand,
  unorderedListCommand
} from "./listCommands";
import { imageCommand } from "./imageCommand";

export function getDefaultCommandMap(): CommandMap {
  return {
    header: headerCommand,
    bold: boldCommand,
    italic: italicCommand,
    strikethrough: strikeThroughCommand,
    link: linkCommand,
    quote: quoteCommand,
    code: codeCommand,
    image: imageCommand,
    "unordered-list": unorderedListCommand,
    "ordered-list": orderedListCommand,
    "checked-list": checkedListCommand
  };
}
