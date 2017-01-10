import React, { PropTypes } from 'react';

const propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

const HeaderItemDropdownItem = ({ children, onClick }) => {
    return (
        <li className="mde-dropdown-header-item">
            <button type="button" onClick={onClick}>
                {children}
            </button>
        </li>
    );
};

HeaderItemDropdownItem.propTypes = propTypes;

export default HeaderItemDropdownItem;