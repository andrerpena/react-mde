import * as React from 'react';
import { TextSelection } from './TextSelection';
import { CommandResult } from './CommandResult';

export interface SubCommand {
    content: React.ReactNode;
    execute: (text: string, selection: TextSelection) => CommandResult;
}