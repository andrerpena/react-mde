import React from "react";
import PropTypes from "prop-types";
import { classNames } from "~utils";

export const ToolbarButtonGroup = ({ children }) => (
  <ul className={classNames("mde-header-group")}>{children}</ul>
);

ToolbarButtonGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default ToolbarButtonGroup;
