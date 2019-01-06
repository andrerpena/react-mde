import * as React from "react";
import { Command, ButtonContentOptions, CommandGroup } from "../types";
import { MdeToolbarButtonGroup } from "./MdeToolbarButtonGroup";
import { MdeToolbarDropdown } from "./MdeToolbarDropdown";
import { MdeToolbarButton } from "./MdeToolbarButton";
import * as classNames from "classnames";
import { Tab } from "../types/Tab";
import { L18n } from "..";

export interface MdeToolbarProps {
  buttonContentOptions: ButtonContentOptions;
  commands: CommandGroup[];
  onCommand: (command: Command) => void;
  onTabChange: (tab: Tab) => void;
  readOnly: boolean;
  tab: Tab,
  l18n: L18n
}

export class MdeToolbar extends React.Component<MdeToolbarProps> {

  handleTabChange = (tab: Tab) => {
    const { onTabChange } = this.props;
    onTabChange(tab);
  };

  render () {
    const { l18n } = this.props;
    const { buttonContentOptions, children, commands, onCommand, readOnly } = this.props;
    if ((!commands || commands.length === 0) && !children) {
      return null;
    }
    return (
      <div className="mde-header">
        <div className="mde-tabs">
          <button
            type="button"
            className={classNames({ "selected": this.props.tab === "write" })}
            onClick={() => this.handleTabChange("write")}
          >
            {l18n.write}
          </button>
          <button
            type="button"
            className={classNames({ "selected": this.props.tab === "preview" })}
            onClick={() => this.handleTabChange("preview")}
          >
            {l18n.preview}
          </button>
        </div>
        {
          commands.map((commandGroup: CommandGroup, i: number) => (
            <MdeToolbarButtonGroup key={i}>
              {
                commandGroup.commands.map((c: Command, j) => {
                  if (c.children) {
                    return (
                      <MdeToolbarDropdown
                        key={j}
                        buttonProps={c.buttonProps}
                        buttonContentOptions={buttonContentOptions}
                        buttonContent={c.buttonContentBuilder(buttonContentOptions)}
                        commands={c.children}
                        onCommand={(cmd) => onCommand(cmd)}
                        readOnly={readOnly}
                      />
                    );
                  }
                  return <MdeToolbarButton
                    key={j}
                    name={c.name}
                    buttonContent={c.buttonContentBuilder(buttonContentOptions)}
                    buttonProps={c.buttonProps}
                    onClick={() => onCommand(c as Command)}
                    readOnly={readOnly}
                    buttonComponentClass={c.buttonComponentClass}
                  />;
                })
              }
            </MdeToolbarButtonGroup>))
        }
      </div>
    );
  }
}
