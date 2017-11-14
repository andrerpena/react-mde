import * as React from 'react';
import { TextSelection } from './TextSelection';
import { Value } from './Value';

export interface SubCommand {
    content: React.ReactNode;
    execute: (text: string, selection: TextSelection) => Value;
}
