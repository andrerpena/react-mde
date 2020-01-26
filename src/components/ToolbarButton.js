import React from "react";
import Tooltip from "rc-tooltip";

export const ToolbarButton = ({
  buttonComponentClass,
  buttonContent,
  buttonProps,
  onClick,
  readOnly,
  name,
  tooltip
}) => {
  const button = React.createElement(
    buttonComponentClass || "button",
    {
      "data-name": name,
      ...{ tabIndex: -1, ...(buttonProps || {}) },
      ...{
        onClick,
        disabled: readOnly,
        type: "button"
      }
    },
    buttonContent
  );

  return (
    <li className="mde-header-item">
      {tooltip ? (
        <Tooltip
          placement="bottom"
          trigger={["hover"]}
          transitionName="fade"
          overlay={<span>{tooltip}</span>}
        >
          {button}
        </Tooltip>
      ) : (
        <>{button}</>
      )}
    </li>
  );
};
