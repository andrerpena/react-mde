import * as React from 'react';

interface HeaderItemDropdownItemProps {
    onClick: React.MouseEventHandler<any>;
}

export const HeaderItemDropdownItem: React.SFC<HeaderItemDropdownItemProps> = (props) => {
    const {onClick, children} = props;
    return (
        <li className="mde-dropdown-header-item">
            <button type="button" onClick={onClick}>
                {children}
            </button>
        </li>
    );
};