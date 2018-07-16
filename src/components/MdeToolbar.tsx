import * as React from "react";
import {Command, ButtonContentOptions} from "../types";
import {MdeToolbarButtonGroup} from "./MdeToolbarButtonGroup";
import {MdeToolbarDropdown} from "./MdeToolbarDropdown";
import {MdeToolbarButton} from "./MdeToolbarButton";

export interface MdeToolbarProps {
    buttonContentOptions: ButtonContentOptions;
    commands: Command[][];
    onCommand: (command: Command) => void;
    readOnly: boolean;
}

export const MdeToolbar: React.SFC<MdeToolbarProps> = (props) => {
    const {buttonContentOptions, children, commands, onCommand, readOnly} = props;
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
                                            buttonContentOptions={buttonContentOptions}
                                            buttonContent={c.buttonContentBuilder(buttonContentOptions)}
                                            commands={c.children}
                                            onCommand={(cmd) => onCommand(cmd)}
                                            readOnly={readOnly}
                                        />
                                    );
                                }
                                return <MdeToolbarButton
                                    key={j}
                                    buttonContent={c.buttonContentBuilder(buttonContentOptions)}
                                    buttonProps={c.buttonProps}
                                    onClick={() => onCommand(c as Command)}
                                    readOnly={readOnly}
                                    buttonComponentClass={c.buttonComponentClass}
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
