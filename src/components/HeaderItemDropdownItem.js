import React, { Component } from 'react';

const HeaderItemDropdownItem = ({content, onClick}) => {
    // if icon is a text, print a font-awesome <i/>, otherwise, consider it a React component and print it
    return (
        <li className="mde-dropdown-header-item">
            <button type="button" onClick={onClick}>
                {content}
            </button>
        </li>
    );
}

export default HeaderItemDropdownItem;