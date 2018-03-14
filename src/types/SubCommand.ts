import * as React from "react";
import { TextSelection } from "./TextSelection";
import { MdeState } from "./MdeState";

export interface SubCommand {
    content: React.ReactNode;
    execute: (text: string, selection: TextSelection) => MdeState;
}
