import React from "react";
import { classNames } from "../util/ClassNames";
import { ToolbarButtonGroup } from "./ToolbarButtonGroup";
import { ToolbarDropdown } from "./ToolbarDropdown";
import { ToolbarButton } from "./ToolbarButton";
import { SvgIcon } from "../icons";
import Tooltip from "rc-tooltip";

export const Toolbar = ({
  classes,
  getIcon,
  children,
  commands,
  onCommand,
  readOnly,
  disablePreview,
  onTabChange,
  tab
}) => {
  const isPreviewing = tab === "preview";
  return (commands && commands.length > 0) || children ? (
    <div className={classNames("mde-header", classes)}>
      {commands.map((commandGroup, i) => (
        <React.Fragment key={i}>
          <ToolbarButtonGroup>
            {commandGroup.commands.map(props =>
              props.children ? (
                <ToolbarDropdown
                  {...props}
                  key={props.name}
                  buttonContent={
                    props.icon ? props.icon(getIcon) : getIcon(props.name)
                  }
                  commands={props.children}
                  onCommand={cmd => onCommand(cmd)}
                />
              ) : (
                <ToolbarButton
                  {...props}
                  key={props.name}
                  buttonContent={
                    props.icon ? props.icon(getIcon) : getIcon(props.name)
                  }
                  onClick={() => onCommand(props)}
                  readOnly={readOnly}
                />
              )
            )}
          </ToolbarButtonGroup>
          <i className="separator">|</i>
        </React.Fragment>
      ))}
      {!disablePreview ? (
        <div className="mde-tabs">
          <Tooltip
            placement="bottom"
            trigger={["hover"]}
            overlay={<span>{isPreviewing ? "Hide Preview" : "Preview"}</span>}
          >
            <button
              type="button"
              onClick={() => onTabChange(isPreviewing ? "write" : "preview")}
            >
              <SvgIcon icon={isPreviewing ? "eye-closed" : "eye-open"} />
            </button>
          </Tooltip>
          <i className="separator">|</i>
        </div>
      ) : null}
    </div>
  ) : null;
};
