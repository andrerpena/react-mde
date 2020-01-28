import React from "react";
import { Tooltip } from "~components";

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
      tabIndex="0"
      disabled={disabled}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );

  return (
    <li className="mde-header-item">
      {tooltip ? (
        <Tooltip
          placement="top"
          trigger={["hover"]}
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
