// Command controller

// Individual commands
import { headerCommand } from "./commands/markdown-commands/headerCommand";
import { boldCommand } from "./commands/markdown-commands/boldCommand";
import { italicCommand } from "./commands/markdown-commands/italicCommand";
import { strikeThroughCommand } from "./commands/markdown-commands/strikeThroughCommand";
import { linkCommand } from "./commands/markdown-commands/linkCommand";
import { quoteCommand } from "./commands/markdown-commands/quoteCommand";
import { codeCommand } from "./commands/markdown-commands/codeCommand";
import {
  checkedListCommand,
  orderedListCommand,
  unorderedListCommand
} from "./commands/markdown-commands/listCommands";
import { imageCommand } from "./commands/markdown-commands/imageCommand";
import { CommandController } from "./commands/command-controller";
import { TextController } from "./types/CommandOptions";
import { TextAreaTextController } from "./text/textarea-text-controller";

export {
  CommandController,
  TextController,
  TextAreaTextController,
  headerCommand,
  boldCommand,
  italicCommand,
  strikeThroughCommand,
  linkCommand,
  quoteCommand,
  codeCommand,
  checkedListCommand,
  orderedListCommand,
  unorderedListCommand,
  imageCommand
};
