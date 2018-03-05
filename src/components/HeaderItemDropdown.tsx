import * as React from "react";
import { HeaderItemDropdownItem } from "./HeaderItemDropdownItem";
import { SubCommand } from "../types";

export interface HeaderItemDropdownProps {
    icon: React.ReactNode;
    tooltip?: string;
    commands: SubCommand[];
    onCommand: (command: SubCommand) => void;
}

export interface HeaderItemDropdownState {
    open: boolean;
}

export class HeaderItemDropdown extends React.Component<HeaderItemDropdownProps, HeaderItemDropdownState> {

    dropdown: any; // TODO: Change this type
    dropdownOpener: any; // TODO: Change this type

    constructor(props: HeaderItemDropdownProps) {
        super(props);
        this.state = {
            open: false,
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
    }

    openDropdown = () => {
        this.setState({
            open: true,
        });
    }

    closeDropdown() {
        this.setState({
            open: false,
        });
    }

    clickedOutside = (e: Event) => {
        const {target} = e;
        return this.state.open
            && this.dropdown
            && this.dropdownOpener
            && !this.dropdown.contains(target)
            && !this.dropdownOpener.contains(target);
    }

    handleOnClickCommand = (e: React.SyntheticEvent<any>, command: SubCommand) => {
        const {onCommand} = this.props;
        onCommand(command);
        this.closeDropdown();
    }

    handleOpenDropdown = () => {
        this.openDropdown();
    }

    render() {
        const {icon, commands, tooltip} = this.props;
        const {open} = this.state;

        // if icon is a text, print a font-awesome <i/>, otherwise, consider it a React component and print it
        const iconElement = React.isValidElement(icon) ? icon : <i className={`fa fa-${icon}`} aria-hidden="true"/>;

        const items = commands.map((command, index) => (
            <HeaderItemDropdownItem key={index} onClick={(e) => this.handleOnClickCommand(e, command)}>
                {command.content}
            </HeaderItemDropdownItem>
        ));

        const dropdown = open
            ? (
                <ul
                    className="react-mde-dropdown"
                    ref={(ref) => {
                        this.dropdown = ref;
                    }}
                >
                    {items}
                </ul>
            )
            : null;

        let buttonProps = {};
        if (tooltip) {
            buttonProps = {
                "aria-label": tooltip,
                "className": "tooltipped",
            };
        }

        return (
            <li className="mde-header-item">
                <button
                    type="button"
                    {...buttonProps}
                    ref={(ref) => {
                        this.dropdownOpener = ref;
                    }}
                    onClick={this.handleOpenDropdown}
                >
                    {iconElement}
                </button>
                {dropdown}
            </li>
        );
    }
}
