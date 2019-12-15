import * as React from "react";

export interface ToolbarButtonProps {
  name: string;
  buttonComponentClass?: React.ComponentClass | string;
  buttonProps: any;
  buttonContent: React.ReactNode;
  onClick: React.MouseEventHandler<any>;
  readOnly: boolean;
}

const defaultButtonProps = {
  tabIndex: -1
};

export const ToolbarButton: React.FunctionComponent<ToolbarButtonProps> = props => {
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
