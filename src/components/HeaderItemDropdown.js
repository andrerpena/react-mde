import React, { Component } from 'react';
import HeaderItemDropdownItem from './HeaderItemDropdownItem';

class DropdownHeaderItem extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false };
    }

    handleOpenDropdown() {
        this.openDropdown();
    }

    handleOnClickCommand(e, c) {
        let onCommand = this.props.onCommand;
        onCommand(c);
        this.closeDropdown();
    }

    handleGlobalClick(e) {
        if (this.state.open && this.refs.dropdown && this.refs.dropdownOpener && !this.refs.dropdown.contains(e.target) && !this.refs.dropdownOpener.contains(e.target)) {
            // clicked outside the dropdown and the opener button
            this.closeDropdown();
        }
    }

    openDropdown() {
        this.setState({ open: true });
    }

    closeDropdown() {
        this.setState({ open: false });
    }

    componentDidMount() {
        this._handleGlobalClick = this.handleGlobalClick.bind(this);
        document.addEventListener('click', this._handleGlobalClick, false);
    }

    componentWillUnmount() {
        if (this._handleGlobalClick)
            document.removeEventListener('click', this._handleGlobalClick, false);
    }

    render() {
        const icon = this.props.icon;
        const open = this.state.open;
        const commands = this.props.commands;

        const dropdown = open
            ? <ul className="react-mde-dropdown" ref="dropdown" >
                {
                    commands.map((c, i) => {
                        return <HeaderItemDropdownItem key={i} content={c.content} onClick={(e) => this.handleOnClickCommand(e, c)} />
                    })
                }
            </ul>
            : null;

        return (
            <li className="mde-header-item">
                <button type="button" ref="dropdownOpener" onClick={this.handleOpenDropdown.bind(this)}>
                    <i className={`fa fa-${icon}`} aria-hidden="true"></i>
                </button>
                {dropdown}
            </li>
        );
    }
}

export default DropdownHeaderItem;