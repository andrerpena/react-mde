import * as React from "react";
import { Command, CommandGroup, GetIcon } from "../types";
import { MdeToolbarButtonGroup } from "./MdeToolbarButtonGroup";
import { MdeToolbarDropdown } from "./MdeToolbarDropdown";
import { MdeToolbarButton } from "./MdeToolbarButton";
import { Tab } from "../types/Tab";
import { L18n } from "..";
import { classNames } from "../util/ClassNames";

export interface MdeToolbarProps {
  getIcon: GetIcon;
  commands: CommandGroup[];
  onCommand: (command: Command) => void;
  onTabChange: (tab: Tab) => void;
  readOnly: boolean;
  disablePreview: boolean;
  tab: Tab;
  l18n: L18n;
}

export class MdeToolbar extends React.Component<MdeToolbarProps> {
  handleTabChange = (tab: Tab) => {
    const { onTabChange } = this.props;
    onTabChange(tab);
  };

  render() {
    const { l18n } = this.props;
    const {
      getIcon,
      children,
      commands,
      onCommand,
      readOnly,
      disablePreview
    } = this.props;
    if ((!commands || commands.length === 0) && !children) {
      return null;
    }
    return (
      <div className="mde-header">
        {!disablePreview && (
          <div className="mde-tabs">
            <button
              type="button"
              className={classNames({ selected: this.props.tab === "write" })}
              onClick={() => this.handleTabChange("write")}
            >
              {l18n.write}
            </button>
            <button
              type="button"
              className={classNames({ selected: this.props.tab === "preview" })}
              onClick={() => this.handleTabChange("preview")}
            >
              {l18n.preview}
            </button>
          </div>
        )}
        {commands.map((commandGroup: CommandGroup, i: number) => (
          <MdeToolbarButtonGroup key={i} hidden={this.props.tab === "preview"}>
            {commandGroup.commands.map((c: Command, j) => {
              if (c.children) {
                return (
                  <MdeToolbarDropdown
                    key={j}
                    buttonProps={c.buttonProps}
                    getIcon={getIcon}
                    buttonContent={c.icon ? c.icon(getIcon) : getIcon(c.name)}
                    commands={c.children}
                    onCommand={cmd => onCommand(cmd)}
                    readOnly={readOnly}
                  />
                );
              }
              return (
                <MdeToolbarButton
                  key={j}
                  name={c.name}
                  buttonContent={c.icon ? c.icon(getIcon) : getIcon(c.name)}
                  buttonProps={c.buttonProps}
                  onClick={() => onCommand(c as Command)}
                  readOnly={readOnly}
                  buttonComponentClass={c.buttonComponentClass}
                />
              );
            })}
          </MdeToolbarButtonGroup>
        ))}
      </div>
    );
  }
}
