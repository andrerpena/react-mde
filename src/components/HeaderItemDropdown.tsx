import * as React from 'react';
import { HeaderItemDropdownItem } from './HeaderItemDropdownItem';
import { SubCommand } from '../types/SubCommand';

interface HeaderItemDropdownProps {
    icon: string;
    commands: SubCommand[];
    onCommand: (command: SubCommand) => void;
}

interface HeaderItemDropdownState {
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
        document.addEventListener('click', this.handleGlobalClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleGlobalClick, false);
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
        const {icon, commands} = this.props;
        const {open} = this.state;

        const items = commands.map((command, index) => (
            <HeaderItemDropdownItem key={index} onClick={(e) => this.handleOnClickCommand(e, command)}>
                {command.content}
            </HeaderItemDropdownItem>
        ));

        const dropdown = open
            ? <ul className="react-mde-dropdown" ref={(ref) => {
                this.dropdown = ref;
            }}>{items}</ul>
            : null;

        return (
            <li className="mde-header-item">
                <button type="button" ref={(ref) => {
                    this.dropdownOpener = ref;
                }} onClick={this.handleOpenDropdown}>
                    <i className={`fa fa-${icon}`} aria-hidden="true"/>
                </button>
                {dropdown}
            </li>
        );
    }
}
