import * as React from "react";
import {Command, ButtonContentOptions} from "../types";
import {MdeToolbarButtonGroup} from "./MdeToolbarButtonGroup";
import {MdeToolbarDropdown} from "./MdeToolbarDropdown";
import {MdeToolbarButton} from "./MdeToolbarButton";
import {MdeEditor} from "./index";

export interface MdeToolbarProps {
    buttonContentOptions: ButtonContentOptions;
    commands: Command[][];
    onCommand: (command: Command) => void;
    readOnly: boolean;
    mdeEditorState?: MdeEditor;
    otherProps?: any;
}

export const MdeToolbar: React.SFC<MdeToolbarProps> = (props) => {
    const {buttonContentOptions, children, commands, onCommand, readOnly, otherProps} = props;
    if ((!commands || commands.length === 0) && !children) {
        return null;
    }
    return (
        <div className="mde-header">
            <div className="mde-toolbar-children">
                {children}
            </div>
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
                                    CustomButtonComponent={c.CustomButtonComponent}
                                    setValues={c.setValues}
                                    otherProps={otherProps}
                                />;
                            })
                        }
                    </MdeToolbarButtonGroup>))
            }
        </div>
    );
};
