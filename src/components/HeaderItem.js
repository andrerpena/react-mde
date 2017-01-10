import React, { PropTypes } from 'react';

const propTypes = {
    type: PropTypes.string,
    tooltip: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    icon: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
    ]).isRequired
};

const HeaderItem = ({ icon, onClick, tooltip }) => {
    // if icon is a text, print a font-awesome <i/>, otherwise, consider it a React component and print it
    const iconElement = React.isValidElement(icon) ? icon : <i className={`fa fa-${icon}`} aria-hidden="true"></i>;

    let buttonProps = {};

    if (tooltip) {
        buttonProps = {
            'aria-label': tooltip,
            className: 'tooltipped'
        }
    }

    return (
        <li className="mde-header-item">
            <button type="button" {...buttonProps} onClick={onClick}>
                {iconElement}
            </button>
        </li>
    );
};

HeaderItem.propTypes = propTypes;

export default HeaderItem;