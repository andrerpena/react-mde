import { SubCommand } from "./SubCommand";

export interface CommandSet {
    type?: string;
    icon?: React.ReactNode;
    tooltip?: string;
    subCommands?: SubCommand[];
}
