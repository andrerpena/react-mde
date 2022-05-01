// Command controller

// Individual commands
import { header } from "./commands/markdown-commands/header";
import { bold } from "./commands/markdown-commands/bold";
import { italic } from "./commands/markdown-commands/italic";
import { strikethrough } from "./commands/markdown-commands/strikethrough";
import { link } from "./commands/markdown-commands/link";
import { quote } from "./commands/markdown-commands/quote";
import { code } from "./commands/markdown-commands/code";
import {
  checkedListCommand,
  orderedListCommand,
  unorderedListCommand
} from "./commands/markdown-commands/list";
import { image } from "./commands/markdown-commands/image";
import { CommandController } from "./commands/command-controller";
import type { TextController } from "./types/CommandOptions";
import { TextAreaTextController } from "./text/textarea-text-controller";
import { markdownHelpers } from "./helpers/markdown-helpers";

export {
  markdownHelpers,
  CommandController,
  TextController,
  TextAreaTextController,
  header,
  bold,
  italic,
  strikethrough,
  link,
  quote,
  code,
  checkedListCommand,
  orderedListCommand,
  unorderedListCommand,
  image
};
