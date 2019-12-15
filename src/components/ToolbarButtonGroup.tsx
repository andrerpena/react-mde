import * as React from "react";
import { classNames } from "../util/ClassNames";

export interface ToolbarButtonGroupProps {
  hidden: boolean;
}

export const ToolbarButtonGroup: React.FunctionComponent<ToolbarButtonGroupProps> = props => {
  return (
    <ul className={classNames("mde-header-group", { hidden: props.hidden })}>
      {props.children}
    </ul>
  );
};
