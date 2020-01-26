import React from "react";
import { classNames } from "../util/ClassNames";

export const ToolbarButtonGroup = props => {
  return <ul className={classNames("mde-header-group")}>{props.children}</ul>;
};
