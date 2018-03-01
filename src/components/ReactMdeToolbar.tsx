import * as React from "react";
import { Command, CommandSet } from "../types/index";
import { HeaderGroup } from "./HeaderGroup";
import { HeaderItemDropdown } from "./HeaderItemDropdown";
import { HeaderItem } from "./HeaderItem";

export interface ReactMdeToolbarProps {
    commands: Array<Array<Command | CommandSet>>;
    onCommand: (command: Command) => void;
}

export const ReactMdeToolbar: React.SFC<ReactMdeToolbarProps> = ({commands, onCommand}) => {
    if (!commands || commands.length === 0) {
        return null;
    }
    return (
        <div className="mde-header">
            {
                commands.map((cg: Array<Command | CommandSet>, i: number) => (
                    <HeaderGroup key={i}>
                        {
                            cg.map((c: Command | CommandSet, j) => {
                                if (c.type === "dropdown") {
                                    return (
                                        <HeaderItemDropdown
                                            key={j}
                                            icon={c.icon}
                                            commands={(c as CommandSet).subCommands}
                                            onCommand={(cmd) => onCommand(cmd)}
                                        />
                                    );
                                }
                                return <HeaderItem
                                    key={j}
                                    icon={c.icon}
                                    tooltip={c.tooltip}
                                    onClick={() => onCommand(c as Command)}
                                />;
                            })
                        }
                    </HeaderGroup>))}
        </div>
    );
};
