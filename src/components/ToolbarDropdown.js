import React from "react";
import Tooltip from "./Tooltip";
import ClickHandler from "./ClickHandler";
import { ToolbarButton } from "./ToolbarButton";

const { Fragment } = React;

export const ToolbarDropdown = ({
  buttonContent,
  buttonProps,
  commands,
  getIcon,
  disabled,
  onCommand,
  tooltip
}) => {
  const finalButtonProps = {
    ...{ tabIndex: 0 },
    ...(buttonProps || {})
  };

  return (
    <li className="mde-header-item">
      <ClickHandler>
        {({ isVisible, closeDropdown, handleClick }) => (
          <Fragment>
            <Tooltip
              placement="top"
              trigger={["hover"]}
              overlay={<span>{tooltip}</span>}
            >
              <button
                type="button"
                {...finalButtonProps}
                className={disabled ? "disabled" : undefined}
                onClick={handleClick}
                disabled={disabled}
              >
                {buttonContent}
              </button>
            </Tooltip>
            {isVisible ? (
              <ul className="react-mde-dropdown">
                {commands.map((command, index) => (
                  <ToolbarButton
                    key={`header-item${index}`}
                    name={command.name}
                    buttonProps={command.buttonProps}
                    buttonContent={
                      command.icon
                        ? command.icon(getIcon)
                        : getIcon(command.name)
                    }
                    onClick={() => {
                      onCommand(command);
                      closeDropdown();
                    }}
                    readOnly={disabled}
                  />
                ))}
              </ul>
            ) : null}
          </Fragment>
        )}
      </ClickHandler>
    </li>
  );
};
