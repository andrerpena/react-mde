import React from "react";

const defaultButtonProps = {
  tabIndex: -1
};

export const ToolbarButton = props => {
  const {
    buttonComponentClass,
    buttonContent,
    buttonProps,
    onClick,
    readOnly,
    name
  } = props;
  const finalButtonProps = { ...defaultButtonProps, ...(buttonProps || {}) };
  const finalButtonComponent = buttonComponentClass || "button";
  return (
    <li className="mde-header-item">
      {React.createElement(
        finalButtonComponent,
        {
          "data-name": name,
          ...finalButtonProps,
          ...{
            onClick,
            disabled: readOnly,
            type: "button"
          }
        },
        buttonContent
      )}
    </li>
  );
};
