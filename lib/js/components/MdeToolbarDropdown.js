"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MdeToolbarButton_1 = require("./MdeToolbarButton");
var MdeToolbarDropdown = /** @class */ (function (_super) {
    __extends(MdeToolbarDropdown, _super);
    function MdeToolbarDropdown(props) {
        var _this = _super.call(this, props) || this;
        _this.handleGlobalClick = function (e) {
            if (_this.clickedOutside(e)) {
                _this.closeDropdown();
            }
        };
        _this.openDropdown = function () {
            _this.setState({
                open: true,
            });
        };
        _this.clickedOutside = function (e) {
            var target = e.target;
            return _this.state.open
                && _this.dropdown
                && _this.dropdownOpener
                && !_this.dropdown.contains(target)
                && !_this.dropdownOpener.contains(target);
        };
        _this.handleOnClickCommand = function (e, command) {
            var onCommand = _this.props.onCommand;
            onCommand(command);
            _this.closeDropdown();
        };
        _this.handleClick = function () {
            if (!_this.state.open)
                _this.openDropdown();
            else
                _this.closeDropdown();
        };
        _this.state = {
            open: false,
        };
        return _this;
    }
    MdeToolbarDropdown.prototype.componentDidMount = function () {
        document.addEventListener("click", this.handleGlobalClick, false);
    };
    MdeToolbarDropdown.prototype.componentWillUnmount = function () {
        document.removeEventListener("click", this.handleGlobalClick, false);
    };
    MdeToolbarDropdown.prototype.closeDropdown = function () {
        this.setState({
            open: false,
        });
    };
    MdeToolbarDropdown.prototype.render = function () {
        var _this = this;
        var _a = this.props, buttonContentOptions = _a.buttonContentOptions, commands = _a.commands, readOnly = _a.readOnly;
        var open = this.state.open;
        var items = commands.map(function (command, index) { return (React.createElement(MdeToolbarButton_1.MdeToolbarButton, { key: "header-item" + index, buttonProps: command.buttonProps, buttonContent: command.buttonContentBuilder(buttonContentOptions), onClick: function (e) { return _this.handleOnClickCommand(e, command); }, readOnly: readOnly })); });
        var dropdown = open
            ? (React.createElement("ul", { className: "react-mde-dropdown", ref: function (ref) {
                    _this.dropdown = ref;
                } }, items))
            : null;
        var _b = this.props, buttonContent = _b.buttonContent, buttonProps = _b.buttonProps;
        return (React.createElement("li", { className: "mde-header-item" },
            React.createElement("button", __assign({ type: "button" }, buttonProps, { ref: function (ref) {
                    _this.dropdownOpener = ref;
                }, onClick: this.handleClick, disabled: readOnly }), buttonContent),
            dropdown));
    };
    return MdeToolbarDropdown;
}(React.Component));
exports.MdeToolbarDropdown = MdeToolbarDropdown;
