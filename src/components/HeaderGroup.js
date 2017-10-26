import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node.isRequired
};

const HeaderGroup = ({ children }) => (
    <ul className="mde-header-group">
        {children}
    </ul>
);

HeaderGroup.propTypes = propTypes;

export default HeaderGroup;
