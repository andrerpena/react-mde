import * as React from "react";
import { Command, GetIcon } from "../types";
import { ToolbarButton } from "./ToolbarButton";

export interface ToolbarDropdownProps {
  getIcon: GetIcon;
  buttonContent: React.ReactNode;
  buttonProps: any;
  commands: Command[];
  onCommand: (command: Command) => void;
  readOnly: boolean;
}

export interface ToolbarDropdownState {
  open: boolean;
}

const defaultHeaderButtonProps = {
  tabIndex: -1
};

export class ToolbarDropdown extends React.Component<
  ToolbarDropdownProps,
  ToolbarDropdownState
> {
  dropdown: any; // TODO: Change this type
  dropdownOpener: any; // TODO: Change this type

  constructor(props: ToolbarDropdownProps) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleGlobalClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleGlobalClick, false);
  }

  handleGlobalClick: EventListenerOrEventListenerObject = (e: Event) => {
    if (this.clickedOutside(e)) {
      this.closeDropdown();
    }
  };

  openDropdown = () => {
    this.setState({
      open: true
    });
  };

  closeDropdown() {
    this.setState({
      open: false
    });
  }

  clickedOutside = (e: Event) => {
    const { target } = e;
    return (
      this.state.open &&
      this.dropdown &&
      this.dropdownOpener &&
      !this.dropdown.contains(target) &&
      !this.dropdownOpener.contains(target)
    );
  };

  handleOnClickCommand = (e: React.SyntheticEvent<any>, command: Command) => {
    const { onCommand } = this.props;
    onCommand(command);
    this.closeDropdown();
  };

  handleClick = () => {
    if (!this.state.open) this.openDropdown();
    else this.closeDropdown();
  };

  render() {
    const { getIcon, commands, readOnly } = this.props;
    const { open } = this.state;

    const items = commands.map((command, index) => {
      return (
        <ToolbarButton
          key={`header-item${index}`}
          name={command.name}
          buttonProps={command.buttonProps}
          buttonContent={
            command.icon ? command.icon(getIcon) : getIcon(command.name)
          }
          onClick={e => this.handleOnClickCommand(e, command)}
          readOnly={readOnly}
        />
      );
    });

    const dropdown = open ? (
      <ul
        className="react-mde-dropdown"
        ref={ref => {
          this.dropdown = ref;
        }}
      >
        {items}
      </ul>
    ) : null;

    const { buttonContent, buttonProps } = this.props;

    const finalButtonProps = {
      ...defaultHeaderButtonProps,
      ...(buttonProps || {})
    };

    return (
      <li className="mde-header-item">
        <button
          type="button"
          {...finalButtonProps}
          ref={ref => {
            this.dropdownOpener = ref;
          }}
          onClick={this.handleClick}
          disabled={readOnly}
        >
          {buttonContent}
        </button>
        {dropdown}
      </li>
    );
  }
}
