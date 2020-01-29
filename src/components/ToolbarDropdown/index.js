import React from "react";
import ClickHandler from "~components/ClickHandler";
import Tooltip from "~components/Tooltip";
import ToolbarButton from "~components/ToolbarButton";

const { Fragment } = React;

export const ToolbarDropdown = ({
  buttonContent,
  buttonProps,
  commands,
  disabled,
  onCommand,
  tooltip
}) => {
  const additionalButtonProps = {
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
                {...additionalButtonProps}
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
                    buttonContent={command.icon}
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

export default ToolbarDropdown;
