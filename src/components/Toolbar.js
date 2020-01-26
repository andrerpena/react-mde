import React from "react";
import { classNames } from "../util/ClassNames";
import { ToolbarButtonGroup } from "./ToolbarButtonGroup";
import { ToolbarDropdown } from "./ToolbarDropdown";
import { ToolbarButton } from "./ToolbarButton";
import { SvgIcon } from "../icons";

export class Toolbar extends React.Component {
  handleTabChange = tab => {
    const { onTabChange } = this.props;
    onTabChange(tab);
  };

  render() {
    const {
      classes,
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
      <div className={classNames("mde-header", classes)}>
        {commands.map((commandGroup, i) => (
          <React.Fragment key={i}>
            <ToolbarButtonGroup>
              {commandGroup.commands.map(c => {
                if (c.children) {
                  return (
                    <ToolbarDropdown
                      key={c.name}
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
                  <ToolbarButton
                    key={c.name}
                    name={c.name}
                    buttonContent={c.icon ? c.icon(getIcon) : getIcon(c.name)}
                    buttonProps={c.buttonProps}
                    onClick={() => onCommand(c)}
                    readOnly={readOnly}
                    buttonComponentClass={c.buttonComponentClass}
                  />
                );
              })}
            </ToolbarButtonGroup>
            <i className="separator">|</i>
          </React.Fragment>
        ))}
        <div className="mde-tabs">
          {!disablePreview ? (
            this.props.tab === "preview" ? (
              <button
                type="button"
                className={classNames({ selected: this.props.tab === "write" })}
                onClick={() => this.handleTabChange("write")}
              >
                <SvgIcon icon="eye-closed" />
              </button>
            ) : (
              <button
                type="button"
                className={classNames({
                  selected: this.props.tab === "preview"
                })}
                onClick={() => this.handleTabChange("preview")}
              >
                <SvgIcon icon="eye-open" />
              </button>
            )
          ) : null}
          {!disablePreview && <i className="separator">|</i>}
        </div>
      </div>
    );
  }
}
