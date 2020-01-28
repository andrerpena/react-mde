import React from "react";
// import Tooltip from "rc-tooltip";
import Tooltip from "./Tooltip";
import { classNames } from "../util/ClassNames";
import { Separator } from "./Separator";
import { ToolbarButtonGroup } from "./ToolbarButtonGroup";
import { ToolbarDropdown } from "./ToolbarDropdown";
import { ToolbarButton } from "./ToolbarButton";
import { SvgIcon } from "../icons";

const { Fragment } = React;

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
  const disabled = isPreviewing ? true : readOnly;

  return (commands && commands.length > 0) || children ? (
    <div className={classNames("mde-header", classes)}>
      {commands.map((commandGroup, i) => (
        <Fragment key={i}>
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
                  disabled={disabled}
                />
              ) : (
                <ToolbarButton
                  {...props}
                  key={props.name}
                  buttonContent={
                    props.icon ? props.icon(getIcon) : getIcon(props.name)
                  }
                  onClick={() => onCommand(props)}
                  disabled={disabled}
                />
              )
            )}
          </ToolbarButtonGroup>
          <Separator />
        </Fragment>
      ))}
      {!disablePreview ? (
        <Fragment>
          <div className="mde-tabs">
            <Tooltip
              placement="top"
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
          </div>
          <Separator />
        </Fragment>
      ) : null}
    </div>
  ) : null;
};
