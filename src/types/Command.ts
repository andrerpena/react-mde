import * as React from "react";
import { TextSelection } from "./TextSelection";
import { Value } from "./Value";

export interface Command {
    type?: string;
    icon?: React.ReactNode;
    tooltip?: string;
    execute: (text: string, selection: TextSelection) => Value | Promise<Value>;
}
