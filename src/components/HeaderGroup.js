import React, { PropTypes } from 'react';

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
