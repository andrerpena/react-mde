import * as React from "react";
import {Command, ButtonContentOptions} from "../types";
import {MdeToolbarButton} from "./MdeToolbarButton";

export interface HeaderItemDropdownProps {
    buttonContentOptions: ButtonContentOptions;
    buttonContent: React.ReactNode;
    buttonProps: any;
    commands: Command[];
    onCommand: (command: Command) => void;
    readOnly: boolean;
}

export interface HeaderItemDropdownState {
    open: boolean;
}

export class MdeToolbarDropdown extends React.Component<HeaderItemDropdownProps, HeaderItemDropdownState> {

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

    handleOnClickCommand = (e: React.SyntheticEvent<any>, command: Command) => {
        const {onCommand} = this.props;
        onCommand(command);
        this.closeDropdown();
    }

    handleClick = () => {
        if (!this.state.open)
            this.openDropdown();
        else
            this.closeDropdown();
    }

    render() {
        const {buttonContentOptions, commands, readOnly} = this.props;
        const {open} = this.state;

        const items = commands.map((command, index) => (
            <MdeToolbarButton
                key={`header-item${index}`}
                name={command.name}
                buttonProps={command.buttonProps}
                buttonContent={command.buttonContentBuilder(buttonContentOptions)}
                onClick={(e) => this.handleOnClickCommand(e, command)}
                readOnly={readOnly}
            />
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

        const {buttonContent, buttonProps} = this.props;

        return (
            <li className="mde-header-item">
                <button
                    type="button"
                    {...buttonProps}
                    ref={(ref) => {
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
