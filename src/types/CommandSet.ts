import * as React from "react";
import {Command} from "./Command";

export interface CommandSet {
    type?: string;
    icon?: React.ReactNode;
    tooltip?: string;
    commands?: Command[];
}
