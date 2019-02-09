import {boldCommand} from "./boldCommand";
// import { codeCommand } from "./codeCommand";
// import { headerCommand } from "./headerCommand";
// import { imageCommand } from "./imageCommand";
import {italicCommand} from "./italicCommand";
import {strikeThroughCommand} from "./strikethroughCommand";
// import { linkCommand } from "./linkCommand";
// import { orderedListCommand } from "./orderedListCommand";
// import { quoteCommand } from "./quoteCommand";
// import { unorderedListCommand } from "./unorderedListCommand";
// import { checkListCommand } from "./checkListCommand";
import {CommandGroup} from "../types";
import {headerCommand} from "./headerCommand";
import {linkCommand} from "./linkCommand";
import {quoteCommand} from "./quoteCommand";
import {codeCommand} from "./codeCommand";
import {imageCommand} from "./imageCommand";
import {unorderedListCommand} from "./listCommands";

// const getDefaultCommands: () => CommandGroup[] = () => [
//   { commands: [headerCommand, strikeThroughCommand, italicCommand, strikethroughCommand] },
//   { commands: [linkCommand, quoteCommand, codeCommand, imageCommand] },
//   { commands: [unorderedListCommand, orderedListCommand, checkListCommand] }
// ];

const getDefaultCommands: () => CommandGroup[] = () => [
    {
        commands: [headerCommand, boldCommand, italicCommand, strikeThroughCommand]
    },
    {
        commands: [linkCommand, quoteCommand, codeCommand, imageCommand]
    },
    {
        commands: [unorderedListCommand]
    }
];

export {
    boldCommand,
    getDefaultCommands
};
