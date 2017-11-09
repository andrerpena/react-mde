import { CommandResult } from './CommandResult';
import { TextSelection } from './TextSelection';

export interface Command {
    type?: string;
    icon?: string,
    tooltip?: string,
    execute: (text: string, selection: TextSelection) => CommandResult;
}
