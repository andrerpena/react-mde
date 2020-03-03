import * as React from "react";
import { Command, CommandGroup, GetIcon } from "../types";
import { Tab } from "../types/Tab";
import { L18n } from "..";
import { classNames, ClassValue } from "../util/ClassNames";
import { ToolbarButtonGroup } from "./ToolbarButtonGroup";
import { ToolbarDropdown } from "./ToolbarDropdown";
import { ToolbarButton } from "./ToolbarButton";
import { ButtonChildProps } from "../child-props";

export interface ToolbarProps {
  classes?: ClassValue;
  getIcon: GetIcon;
  commands: CommandGroup[];
  onCommand: (command: Command) => void;
  onTabChange: (tab: Tab) => void;
  readOnly: boolean;
  disablePreview: boolean;
  tab: Tab;
  l18n: L18n;
  writeButtonProps: ButtonChildProps;
  previewButtonProps: ButtonChildProps;
  buttonProps: ButtonChildProps;
}

export class Toolbar extends React.Component<ToolbarProps> {
  handleTabChange = (tab: Tab) => {
    const { onTabChange } = this.props;
    onTabChange(tab);
  };

  render() {
    const { l18n } = this.props;
    const {
      classes,
      getIcon,
      children,
      commands,
      onCommand,
      readOnly,
      disablePreview,
      writeButtonProps,
      previewButtonProps,
      buttonProps
    } = this.props;
    if ((!commands || commands.length === 0) && !children) {
      return null;
    }
    return (
      <div className={classNames("mde-header", classes)}>
        {!disablePreview && (
          <div className="mde-tabs">
            <button
              type="button"
              className={classNames({ selected: this.props.tab === "write" })}
              onClick={() => this.handleTabChange("write")}
              {...writeButtonProps}
            >
              {l18n.write}
            </button>
            <button
              type="button"
              className={classNames({ selected: this.props.tab === "preview" })}
              onClick={() => this.handleTabChange("preview")}
              {...previewButtonProps}
            >
              {l18n.preview}
            </button>
          </div>
        )}
        {commands.map((commandGroup: CommandGroup, i: number) => (
          <ToolbarButtonGroup key={i} hidden={this.props.tab === "preview"}>
            {commandGroup.commands.map((c: Command, j) => {
              if (c.children) {
                return (
                  <ToolbarDropdown
                    key={j}
                    buttonProps={{ ...(buttonProps || {}), ...c.buttonProps }}
                    getIcon={getIcon}
                    buttonContent={c.icon ? c.icon(getIcon) : getIcon(c.name)}
                    commands={c.children}
                    onCommand={cmd => onCommand(cmd)}
                    readOnly={readOnly}
                  />
                );
              }
              return (
                <ToolbarButton
                  key={j}
                  name={c.name}
                  buttonContent={c.icon ? c.icon(getIcon) : getIcon(c.name)}
                  buttonProps={{ ...(buttonProps || {}), ...c.buttonProps }}
                  onClick={() => onCommand(c as Command)}
                  readOnly={readOnly}
                />
              );
            })}
          </ToolbarButtonGroup>
        ))}
      </div>
    );
  }
}
