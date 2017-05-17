import React, { Component, PropTypes } from 'react';
import HeaderItemDropdownItem from './HeaderItemDropdownItem';

const propTypes = {
    icon: PropTypes.string.isRequired,
    commands: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.node.isRequired
    })).isRequired,
    onCommand: PropTypes.func.isRequired
};

class DropdownHeaderItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleGlobalClick = this.handleGlobalClick.bind(this);
        this.handleOpenDropdown = this.handleOpenDropdown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleGlobalClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleGlobalClick, false);
    }

    handleGlobalClick(e) {
        if (this.clickedOutside(e)) {
            this.closeDropdown();
        }
    }

    openDropdown() {
        this.setState({
            open: true
        });
    }

    closeDropdown() {
        this.setState({
            open: false
        });
    }

    clickedOutside({ target }) {
        return this.state.open
            && this.dropdown
            && this.dropdownOpener
            && !this.dropdown.contains(target)
            && !this.dropdownOpener.contains(target);
    }

    handleOnClickCommand(e, command) {
        const { onCommand } = this.props;
        onCommand(command);
        this.closeDropdown();
    }

    handleOpenDropdown() {
        this.openDropdown();
    }

    render() {
        const { icon, commands } = this.props;
        const { open } = this.state;

        const items = commands.map((command, index) => (
            <HeaderItemDropdownItem key={index} onClick={e => this.handleOnClickCommand(e, command)}>
                {command.content}
            </HeaderItemDropdownItem>
        ));

        const dropdown = open
            ? <ul className="react-mde-dropdown" ref={(ref) => { this.dropdown = ref; }}>{items}</ul>
            : null;

        return (
            <li className="mde-header-item">
                <button type="button" ref={(ref) => { this.dropdownOpener = ref; }} onClick={this.handleOpenDropdown}>
                    <i className={`fa fa-${icon}`} aria-hidden="true" />
                </button>
                {dropdown}
            </li>
        );
    }
}

DropdownHeaderItem.propTypes = propTypes;

export default DropdownHeaderItem;
