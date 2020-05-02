import { CommandMap, ToolbarCommands } from "../command";
import { headerCommand } from "./headerCommand";
import { boldCommand } from "./boldCommand";
import { italicCommand } from "./italicCommand";
import { strikeThroughCommand } from "./strikeThroughCommand";
import { linkCommand } from "./linkCommand";
import { quoteCommand } from "./quoteCommand";
import {
  checkedListCommand,
  orderedListCommand,
  unorderedListCommand
} from "./listCommands";
import { imageCommand } from "./imageCommand";

export function getDefaultToolbarCommands(): ToolbarCommands {
  return [
    ["header", "bold", "italic", "strikethrough"],
    ["link", "quote", "code", "image"],
    ["unordered-list", "ordered-list", "checked-list"]
  ];
}

export function getDefaultCommandMap(): CommandMap {
  return {
    header: headerCommand,
    bold: boldCommand,
    italic: italicCommand,
    strikethrough: strikeThroughCommand,
    link: linkCommand,
    quote: quoteCommand,
    code: quoteCommand,
    image: imageCommand,
    "unordered-list": unorderedListCommand,
    "ordered-list": orderedListCommand,
    "checked-list": checkedListCommand
  };
}
