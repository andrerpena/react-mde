import * as React from "react";

export interface MdeToolbarButtonGroupProps {
}

export const MdeToolbarButtonGroup: React.SFC<MdeToolbarButtonGroupProps> = (props) => {
    return (
        <ul className="mde-header-group">
            {props.children}
        </ul>
    );
};
