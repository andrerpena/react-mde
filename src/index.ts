// Individual commands
import { header } from "./commands/markdown-commands/header";
import { bold } from "./commands/markdown-commands/bold";
import { italic } from "./commands/markdown-commands/italic";
import { strikethrough } from "./commands/markdown-commands/strikethrough";
import { link } from "./commands/markdown-commands/link";
import { quote } from "./commands/markdown-commands/quote";
import { codeBlock } from "./commands/markdown-commands/codeBlock";
import {
  checkedListCommand,
  orderedListCommand,
  unorderedListCommand
} from "./commands/markdown-commands/list";
import { image } from "./commands/markdown-commands/image";
import { CommandController } from "./commands/command-controller";
import type { TextController } from "./types/CommandOptions";
import { TextAreaTextController } from "./text/textarea-text-controller";
import { textHelpers } from "./helpers/textHelpers";
import { code } from "./commands/markdown-commands/code";
import { useTextAreaMarkdownEditor } from "./hooks/use-markdown-editor";

export {
  // helpers
  textHelpers,
  // controllers
  CommandController,
  TextController,
  TextAreaTextController,
  // commands
  header,
  bold,
  italic,
  strikethrough,
  link,
  quote,
  code,
  codeBlock,
  checkedListCommand,
  orderedListCommand,
  unorderedListCommand,
  image,
    // hooks
  useTextAreaMarkdownEditor
};
