import React from 'react';
import PropTypes from 'prop-types';

const HeaderItem = ({ icon, onClick, tooltip }) => {
    // if icon is a text, print a font-awesome <i/>, otherwise, consider it a React component and print it
    const iconElement = React.isValidElement(icon) ? icon : <i className={`fa fa-${icon}`} aria-hidden="true" />;

    let buttonProps = {};

    if (tooltip) {
        buttonProps = {
            'aria-label': tooltip,
            className: 'tooltipped'
        };
    }

    return (
        <li className="mde-header-item">
            <button type="button" {...buttonProps} onClick={onClick}>
                {iconElement}
            </button>
        </li>
    );
};

HeaderItem.propTypes = {
    tooltip: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    icon: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
    ]).isRequired
};

HeaderItem.defaultProps = {
    tooltip: undefined
};

export default HeaderItem;
