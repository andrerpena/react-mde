import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

const HeaderItemDropdownItem = ({ children, onClick }) => (
    <li className="mde-dropdown-header-item">
        <button type="button" onClick={onClick}>
            {children}
        </button>
    </li>
    );

HeaderItemDropdownItem.propTypes = propTypes;

export default HeaderItemDropdownItem;
