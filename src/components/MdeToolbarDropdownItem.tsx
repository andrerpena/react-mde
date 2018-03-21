import * as React from "react";

export interface HeaderItemDropdownItemProps {
    onClick: React.MouseEventHandler<any>;
}

export const MdeToolbarDropdownItem: React.SFC<HeaderItemDropdownItemProps> = (props) => {
    const {onClick, children} = props;
    return (
        <li className="mde-dropdown-header-item">
            <button type="button" onClick={onClick}>
                {children}
            </button>
        </li>
    );
};
