import React, { Component } from 'react';

const HeaderGroup = (props) => (
    <ul className="mde-header-group">
        {props.children}
    </ul>
);

export default HeaderGroup;