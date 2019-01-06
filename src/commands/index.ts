import { boldCommand } from "./boldCommand";
// import { codeCommand } from "./codeCommand";
// import { headerCommand } from "./headerCommand";
// import { imageCommand } from "./imageCommand";
import { italicCommand } from "./italicCommand";
import { strikeThroughCommand } from "./strikethroughCommand";
// import { linkCommand } from "./linkCommand";
// import { orderedListCommand } from "./orderedListCommand";
// import { quoteCommand } from "./quoteCommand";
// import { unorderedListCommand } from "./unorderedListCommand";
// import { checkListCommand } from "./checkListCommand";
import { CommandGroup } from "../types";

// const getDefaultCommands: () => CommandGroup[] = () => [
//   { commands: [headerCommand, strikeThroughCommand, italicCommand, strikethroughCommand] },
//   { commands: [linkCommand, quoteCommand, codeCommand, imageCommand] },
//   { commands: [unorderedListCommand, orderedListCommand, checkListCommand] }
// ];

const getDefaultCommands: () => CommandGroup[] = () => [
  { commands: [boldCommand, italicCommand, strikeThroughCommand] }
];

export {
  boldCommand,
  getDefaultCommands
};
