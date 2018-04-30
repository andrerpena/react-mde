import * as React from "react";
import {Command} from "../types";
import {MdeToolbarButtonGroup} from "./MdeToolbarButtonGroup";
import {MdeToolbarDropdown} from "./MdeToolbarDropdown";
import {MdeToolbarButton} from "./MdeToolbarButton";

export interface MdeToolbarProps {
    commands: Command[][];
    onCommand: (command: Command) => void;
}

export const MdeToolbar: React.SFC<MdeToolbarProps> = ({children, commands, onCommand}) => {
    if ((!commands || commands.length === 0) && !children) {
        return null;
    }
    return (
        <div className="mde-header">
            {
                commands.map((cg: Command[], i: number) => (
                    <MdeToolbarButtonGroup key={i}>
                        {
                            cg.map((c: Command, j) => {
                                if (c.children) {
                                    return (
                                        <MdeToolbarDropdown
                                            key={j}
                                            buttonProps={c.buttonProps}
                                            buttonContent={c.buttonContent}
                                            commands={c.children}
                                            onCommand={(cmd) => onCommand(cmd)}
                                        />
                                    );
                                }
                                return <MdeToolbarButton
                                    key={j}
                                    buttonContent={c.buttonContent}
                                    buttonProps={c.buttonProps}
                                    onClick={() => onCommand(c as Command)}
                                />;
                            })
                        }
                    </MdeToolbarButtonGroup>))
            }
            <div className="mde-toolbar-children">
                {children}
            </div>
        </div>
    );
};
