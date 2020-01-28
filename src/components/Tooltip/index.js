/*
MIT LICENSE

Copyright (c) 2015-present Ant UED, https://xtech.antfin.com/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import React from "react";
import { classNames } from "~utils";
import RcTooltip from "./tooltip";
import getPlacements from "./placements";
import { ConfigConsumer } from "./context";

const { cloneElement, Component, isValidElement } = React;

const splitObject = (obj, keys) => {
  const picked = {};
  const omitted = { ...obj };
  keys.forEach(key => {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return { picked, omitted };
};

// Fix Tooltip won't hide at disabled button
// mouse events don't trigger at disabled button in Chrome
// https://github.com/react-component/tooltip/issues/18
function getDisabledCompatibleChildren(element) {
  const elementType = element.type;
  if (
    (elementType.__ANT_BUTTON === true ||
      elementType.__ANT_SWITCH === true ||
      elementType.__ANT_CHECKBOX === true ||
      element.type === "button") &&
    element.props.disabled
  ) {
    // Pick some layout related style properties up to span
    // Prevent layout bugs like https://github.com/ant-design/ant-design/issues/5254
    const { picked, omitted } = splitObject(element.props.style, [
      "position",
      "left",
      "right",
      "top",
      "bottom",
      "float",
      "display",
      "zIndex"
    ]);
    const spanStyle = {
      display: "inline-block", // default inline-block is important
      ...picked,
      cursor: "not-allowed",
      width: element.props.block ? "100%" : null
    };
    const buttonStyle = {
      ...omitted,
      pointerEvents: "none"
    };
    const child = cloneElement(element, {
      style: buttonStyle,
      className: null
    });
    return (
      <span style={spanStyle} className={element.props.className}>
        {child}
      </span>
    );
  }
  return element;
}

export class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: !!props.visible || !!props.defaultVisible
    };
  }

  static defaultProps = {
    placement: "top",
    transitionName: "zoom-big-fast",
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    arrowPointAtCenter: false,
    autoAdjustOverflow: true
  };

  static getDerivedStateFromProps(nextProps) {
    return "visible" in nextProps ? { visible: nextProps.visible } : null;
  }

  onVisibleChange = visible => {
    const { onVisibleChange } = this.props;
    if (!("visible" in this.props)) {
      this.setState({ visible: this.isNoTitle() ? false : visible });
    }
    if (onVisibleChange && !this.isNoTitle()) {
      onVisibleChange(visible);
    }
  };

  getPopupDomNode = () => this.tooltip.getPopupDomNode();

  getPlacements() {
    const {
      builtinPlacements,
      arrowPointAtCenter,
      autoAdjustOverflow
    } = this.props;
    return (
      builtinPlacements ||
      getPlacements({
        arrowPointAtCenter,
        verticalArrowShift: 8,
        autoAdjustOverflow
      })
    );
  }

  saveTooltip = node => (this.tooltip = node);

  // 动态设置动画点
  onPopupAlign = (domNode, align) => {
    const placements = this.getPlacements();
    // 当前返回的位置
    const placement = Object.keys(placements).filter(
      key =>
        placements[key].points[0] === align.points[0] &&
        placements[key].points[1] === align.points[1]
    )[0];
    if (!placement) {
      return;
    }
    // 根据当前坐标设置动画点
    const rect = domNode.getBoundingClientRect();
    const transformOrigin = {
      top: "50%",
      left: "50%"
    };
    if (placement.indexOf("top") >= 0 || placement.indexOf("Bottom") >= 0) {
      transformOrigin.top = `${rect.height - align.offset[1]}px`;
    } else if (
      placement.indexOf("Top") >= 0 ||
      placement.indexOf("bottom") >= 0
    ) {
      transformOrigin.top = `${-align.offset[1]}px`;
    }
    if (placement.indexOf("left") >= 0 || placement.indexOf("Right") >= 0) {
      transformOrigin.left = `${rect.width - align.offset[0]}px`;
    } else if (
      placement.indexOf("right") >= 0 ||
      placement.indexOf("Left") >= 0
    ) {
      transformOrigin.left = `${-align.offset[0]}px`;
    }
    domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
  };

  isNoTitle() {
    const { title, overlay } = this.props;
    return !title && !overlay && title !== 0; // overlay for old version compatibility
  }

  getOverlay() {
    const { title, overlay } = this.props;
    if (title === 0) {
      return title;
    }
    return overlay || title || "";
  }

  renderTooltip = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction
  }) => {
    const { props, state } = this;
    const {
      prefixCls: customizePrefixCls,
      openClassName,
      getPopupContainer,
      getTooltipContainer,
      overlayClassName
    } = props;
    const children = props.children;
    const prefixCls = getPrefixCls("tooltip", customizePrefixCls);
    let { visible } = state;
    // Hide tooltip when there is no title
    if (!("visible" in props) && this.isNoTitle()) {
      visible = false;
    }

    const child = getDisabledCompatibleChildren(
      isValidElement(children) ? children : <span>{children}</span>
    );

    const childProps = child.props;
    const childCls = classNames(childProps.className, {
      [openClassName || `${prefixCls}-open`]: true
    });

    const customOverlayClassName = classNames(overlayClassName, {
      [`${prefixCls}-rtl`]: direction === "rtl"
    });
    return (
      <RcTooltip
        {...this.props}
        prefixCls={prefixCls}
        overlayClassName={customOverlayClassName}
        getTooltipContainer={
          getPopupContainer || getTooltipContainer || getContextPopupContainer
        }
        ref={this.saveTooltip}
        builtinPlacements={this.getPlacements()}
        overlay={this.getOverlay()}
        visible={visible}
        onVisibleChange={this.onVisibleChange}
        onPopupAlign={this.onPopupAlign}
      >
        {visible ? cloneElement(child, { className: childCls }) : child}
      </RcTooltip>
    );
  };

  render = () => <ConfigConsumer>{this.renderTooltip}</ConfigConsumer>;
}

export default Tooltip;
