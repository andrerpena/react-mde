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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MdePreview = /** @class */ (function (_super) {
    __extends(MdePreview, _super);
    function MdePreview(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            safeHtml: "",
        };
        var html = _this.props.html;
        _this.cleanHtml(html);
        return _this;
    }
    MdePreview.prototype.componentWillReceiveProps = function (newProps) {
        var html = newProps.html;
        this.cleanHtml(html);
    };
    MdePreview.prototype.cleanHtml = function (html) {
        var _this = this;
        this.props.cleanHtml(html).then(function (safeHtml) {
            _this.setState({ safeHtml: safeHtml });
        });
    };
    MdePreview.prototype.render = function () {
        var _this = this;
        var className = this.props.className;
        var safeHtml = this.state.safeHtml;
        return (React.createElement("div", { className: "mde-preview " + (className || "") },
            React.createElement("div", { className: "mde-preview-content", dangerouslySetInnerHTML: { __html: safeHtml || "<p>&nbsp;</p>" }, ref: function (p) { return _this.previewRef = p; } })));
    };
    return MdePreview;
}(React.Component));
exports.MdePreview = MdePreview;
