import * as React from "react";
import { Command } from "../types";
import { MdeToolbarButtonGroup } from "./MdeToolbarButtonGroup";
import { MdeToolbarDropdown } from "./MdeToolbarDropdown";
import { MdeToolbarButton } from "./MdeToolbarButton";

export interface MdeToolbarProps {
    commands: Array<Array<Command>>;
    onCommand: (command: Command) => void;
}

export const MdeToolbar: React.SFC<MdeToolbarProps> = ({commands, onCommand}) => {
    if (!commands || commands.length === 0) {
        return null;
    }
    return (
        <div className="mde-header">
            {
                commands.map((cg: Array<Command>, i: number) => (
                    <MdeToolbarButtonGroup key={i}>
                        {
                            cg.map((c: Command, j) => {
                                if (c.children) {
                                    return (
                                        <MdeToolbarDropdown
                                            key={j}
                                            icon={c.icon}
                                            tooltip={c.tooltip}
                                            commands={c.children}
                                            onCommand={(cmd) => onCommand(cmd)}
                                        />
                                    );
                                }
                                return <MdeToolbarButton
                                    key={j}
                                    icon={c.icon}
                                    tooltip={c.tooltip}
                                    onClick={() => onCommand(c as Command)}
                                />;
                            })
                        }
                    </MdeToolbarButtonGroup>))}
        </div>
    );
};
