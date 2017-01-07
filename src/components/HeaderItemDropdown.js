import React, { Component } from 'react';

class DropdownHeaderItem extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false };
    }
    handleOnClick() {
        this.setState({ open: !this.state.open });
    }

    handleOnBlur() {
        //this.setState({ open: false });
    }

    render() {
        let icon = this.props.icon;
        let open = this.state.open;

        let dropdown = open
            ? <ul className="react-mde-dropdown">
                {this.props.children}
            </ul>
            : null;

        return (
            <li className="mde-header-item" onBlur={this.handleOnBlur.bind(this)}>
                <button type="button">
                    <i className={`fa fa-${icon}`} aria-hidden="true" onClick={this.handleOnClick.bind(this)}></i>
                </button>
                {dropdown}
            </li>
        );
    }
}

export default DropdownHeaderItem;