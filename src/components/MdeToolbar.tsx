import * as React from "react";
import { Command } from "../types";
import { MdeToolbarButtonGroup } from "./MdeToolbarButtonGroup";
import { HeaderItemDropdown } from "./MdeToolbarDropdown";
import { MdeToolbarButton } from "./MdeToolbarButton";

export interface ReactMdeToolbarProps {
    commands: Array<Array<Command>>;
    onCommand: (command: Command) => void;
}

export const ReactMdeToolbar: React.SFC<ReactMdeToolbarProps> = ({commands, onCommand}) => {
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
                                if (c.commands) {
                                    return (
                                        <HeaderItemDropdown
                                            key={j}
                                            icon={c.icon}
                                            tooltip={c.tooltip}
                                            commands={(c as CommandSet).subCommands}
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
