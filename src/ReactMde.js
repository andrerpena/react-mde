import React, { Component } from 'react';

const HeaderGroup = (props) => (
    <ul className="mde-header-group">
        {props.children}
    </ul>
);

const HeaderItem = ({icon, onClick}) => (
    <li className="mde-header-item">
        <i className={`fa fa-${icon}`} aria-hidden="true"></i>
    </li>
);

class ReactMde extends Component {

    handleValueChange(e) {
        let {
            onChange
        } = this.props;
        onChange({value: e.target.value, selection: null});
    }

    render() {

        let {
            value,
            onChange
        } = this.props;

        return (
            <div className="react-mde">
                <div className="mde-header">
                    <HeaderGroup>
                        <HeaderItem icon="bold" />
                        <HeaderItem icon="italic" />
                    </HeaderGroup>
                    <HeaderGroup>
                        <HeaderItem icon="link" />
                        <HeaderItem icon="quote-right" />
                        <HeaderItem icon="picture-o" />
                    </HeaderGroup>
                    <HeaderGroup>
                        <HeaderItem icon="list-ol" />
                        <HeaderItem icon="list" />
                    </HeaderGroup>
                    <HeaderGroup>
                        <HeaderItem icon="at" />
                        <HeaderItem icon="bookmark" />
                    </HeaderGroup>
                </div>
                <div className="mde-text">
                    <textarea onChange={this.handleValueChange.bind(this)} value={value} />
                </div>
                <div className="mde-preview"></div>
            </div>
        );
    }
}

export default ReactMde;
