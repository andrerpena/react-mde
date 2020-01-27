import React from "react";
import Tooltip from "rc-tooltip";
import { classNames } from "../util/ClassNames";
import { Separator } from "./Separator";
import { ToolbarButtonGroup } from "./ToolbarButtonGroup";
import { ToolbarDropdown } from "./ToolbarDropdown";
import { ToolbarButton } from "./ToolbarButton";
import { SvgIcon } from "../icons";

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
          <Separator />
        </div>
      ) : null}
    </div>
  ) : null;
};
