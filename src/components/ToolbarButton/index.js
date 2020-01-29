import React from "react";
import Tooltip from "~components/Tooltip";

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
      tabIndex="0"
      className={disabled ? "disabled" : undefined}
      data-name={name}
      disabled={disabled}
      onClick={onClick}
      {...buttonProps}
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

export default ToolbarButton;
