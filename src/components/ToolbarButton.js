import React from "react";
import Tooltip from "rc-tooltip";

export const ToolbarButton = ({
  buttonContent,
  buttonProps,
  onClick,
  disabled,
  name,
  tooltip
}) => {
  const button = (
    <button
      {...buttonProps}
      type="button"
      data-name={name}
      data-tip={tooltip}
      tabIndex="-1"
      style={disabled ? { cursor: "not-allowed", color: "#ccc" } : undefined}
      onClick={!disabled ? onClick : null}
    >
      {buttonContent}
    </button>
  );

  return (
    <li className="mde-header-item">
      {!disabled && tooltip ? (
        <Tooltip
          placement="bottom"
          trigger={["hover"]}
          transitionName="fade"
          overlay={<span>{tooltip}</span>}
        >
          {button}
        </Tooltip>
      ) : (
        button
      )}
    </li>
  );
};
