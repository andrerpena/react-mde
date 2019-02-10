import * as React from "react";

export interface MdeToolbarButtonProps {
  name: string;
  buttonComponentClass?: React.ComponentClass | string;
  buttonProps: any;
  buttonContent: React.ReactNode;
  onClick: React.MouseEventHandler<any>;
  readOnly: boolean;
}

export const MdeToolbarButton: React.SFC<MdeToolbarButtonProps> = (props) => {
  const { buttonComponentClass, buttonContent, buttonProps, onClick, readOnly, name } = props;
  const finalButtonComponent = buttonComponentClass || "button";
  return (
    <li className="mde-header-item">
      {React.createElement(finalButtonComponent, {
        "data-name": name,
        ...buttonProps,
        ...{
          onClick,
          disabled: readOnly,
          type: "button"
        }
      }, buttonContent)}
    </li>
  );
};
