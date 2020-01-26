import React from "react";
import { ToolbarButton } from "./ToolbarButton";

export class ToolbarDropdown extends React.Component {
  state = {
    open: false
  };

  componentDidMount() {
    document.addEventListener("click", this.handleGlobalClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleGlobalClick, false);
  }

  handleGlobalClick = e => {
    if (this.clickedOutside(e)) {
      this.closeDropdown();
    }
  };

  openDropdown = () => this.setState({ open: true });

  closeDropdown = () => this.setState({ open: false });

  clickedOutside = e => {
    const { target } = e;
    return (
      this.state.open &&
      this.dropdown &&
      this.dropdownOpener &&
      !this.dropdown.contains(target) &&
      !this.dropdownOpener.contains(target)
    );
  };

  handleOnClickCommand = (_, command) => {
    this.props.onCommand(command);
    this.closeDropdown();
  };

  handleClick = () => {
    if (!this.state.open) this.openDropdown();
    else this.closeDropdown();
  };

  render() {
    const {
      buttonContent,
      buttonProps,
      getIcon,
      disabled,
      tooltip
    } = this.props;

    const finalButtonProps = {
      ...{ tabIndex: -1 },
      ...(buttonProps || {})
    };

    return (
      <li className="mde-header-item">
        <button
          type="button"
          {...finalButtonProps}
          ref={ref => (this.dropdownOpener = ref)}
          onClick={!disabled ? this.handleClick : null}
          style={{
            ...{ transition: "none" },
            ...(disabled
              ? { cursor: "not-allowed", color: "#ccc", transition: "none" }
              : {})
          }}
        >
          {buttonContent}
        </button>
        {this.state.open ? (
          <ul className="react-mde-dropdown" ref={ref => (this.dropdown = ref)}>
            {this.props.commands.map((command, index) => (
              <ToolbarButton
                key={`header-item${index}`}
                name={command.name}
                buttonProps={command.buttonProps}
                buttonContent={
                  command.icon ? command.icon(getIcon) : getIcon(command.name)
                }
                onClick={e => this.handleOnClickCommand(e, command)}
                readOnly={disabled}
              />
            ))}
          </ul>
        ) : null}
      </li>
    );
  }
}
