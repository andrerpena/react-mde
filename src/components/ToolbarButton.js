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
      type="button"
      {...buttonProps}
      className={disabled ? "disabled" : undefined}
      data-name={name}
      tabIndex="-1"
      onClick={!disabled ? onClick : null}
    >
      {buttonContent}
    </button>
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
        button
      )}
    </li>
  );
};
