import * as React from "react";

export interface HeaderGroupProps {
}

export const MdeToolbarButtonGroup: React.SFC<HeaderGroupProps> = (props) => {
    return (
        <ul className="mde-header-group">
            {props.children}
        </ul>
    );
};
