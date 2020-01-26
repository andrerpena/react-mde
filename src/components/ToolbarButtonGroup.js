import React from "react";
import { classNames } from "../util/ClassNames";

export const ToolbarButtonGroup = ({ children }) => (
  <ul className={classNames("mde-header-group")}>{children}</ul>
);
