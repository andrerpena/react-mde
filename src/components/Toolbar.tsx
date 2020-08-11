import * as React from "react";
import { Tab } from "../types/Tab";
import { L18n } from "..";
import { classNames, ClassValue } from "../util/ClassNames";
import { ToolbarButtonGroup } from "./ToolbarButtonGroup";
import { ToolbarButton } from "./ToolbarButton";
import { ButtonChildProps } from "../child-props";

export interface ToolbarButtonData {
  commandName: string;
  buttonContent: React.ReactNode;
  buttonProps: any;
  buttonComponentClass: React.ComponentClass | string;
}

export interface ToolbarProps {
  classes?: ClassValue;
  buttons: ToolbarButtonData[][];
  onCommand: (commandName: string) => void;
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
      children,
      buttons,
      onCommand,
      readOnly,
      disablePreview,
      writeButtonProps,
      previewButtonProps,
      buttonProps
    } = this.props;
    if ((!buttons || buttons.length === 0) && !children) {
      return null;
    }

    const writePreviewTabs = (
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
    );

    return (
      <div className={classNames("mde-header", classes)}>
        {!disablePreview && writePreviewTabs}
        {buttons.map((commandGroup: ToolbarButtonData[], i: number) => (
          <ToolbarButtonGroup key={i} hidden={this.props.tab === "preview"}>
            {commandGroup.map((c: ToolbarButtonData, j) => {
              return (
                <ToolbarButton
                  key={j}
                  name={c.commandName}
                  buttonContent={c.buttonContent}
                  buttonProps={{ ...(buttonProps || {}), ...c.buttonProps }}
                  onClick={() => onCommand(c.commandName)}
                  readOnly={readOnly}
                  buttonComponentClass={c.buttonComponentClass}
                />
              );
            })}
          </ToolbarButtonGroup>
        ))}
      </div>
    );
  }
}
