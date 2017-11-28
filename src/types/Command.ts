import { TextSelection } from "./TextSelection";
import { Value } from "./Value";

export interface Command {
    type?: string;
    icon?: string;
    tooltip?: string;
    execute: (text: string, selection: TextSelection) => Value;
}
