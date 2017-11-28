import { SubCommand } from "./SubCommand";

export interface CommandSet {
    type?: string;
    icon?: string;
    tooltip?: string;
    subCommands?: SubCommand[];
}
