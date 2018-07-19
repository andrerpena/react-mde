"use strict";
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
exports.MdeToolbarButton = function (props) {
    var buttonContent = props.buttonContent, buttonProps = props.buttonProps, onClick = props.onClick, readOnly = props.readOnly, CustomButtonComponent = props.CustomButtonComponent, setValues = props.setValues, otherProps = props.otherProps;
    var defaultButton = (React.createElement("button", __assign({ type: "button" }, buttonProps, { onClick: onClick, disabled: readOnly }), buttonContent));
    var customComponent = CustomButtonComponent ? (React.createElement(CustomButtonComponent, __assign({ handleSubmit: onClick, setValues: setValues }, otherProps))) : null;
    return (React.createElement("li", { className: "mde-header-item" }, CustomButtonComponent ? customComponent : defaultButton));
};
