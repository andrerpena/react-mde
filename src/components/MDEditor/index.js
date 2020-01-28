import React from "react";
import { Toolbar, TextArea } from "~components";
import { getDefaultCommands } from "~commands";
import { SvgIcon } from "~icons";
import { classNames, extractCommandMap } from "~utils";
import Commander from "../Commander";

export class MDEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHeight: props.minEditorHeight
    };
    this.gripDrag = null;
    this.keyCommandMap = extractCommandMap(props.commands);
  }

  static defaultProps = {
    commands: getDefaultCommands(),
    getIcon: name => <SvgIcon icon={name} />,
    emptyPreviewHtml: "<p>&nbsp;</p>",
    readOnly: false,
    autoGrow: false,
    minEditorHeight: 200,
    maxEditorHeight: 500,
    minPreviewHeight: 200,
    selectedTab: "write",
    disablePreview: false,
    suggestionTriggerCharacters: ["@"]
  };

  componentDidMount() {
    document.addEventListener("mousemove", this.handleGripMouseMove);
    document.addEventListener("mouseup", this.handleGripMouseUp);
  }

  handleTextChange = value => this.props.onChange(value);

  handleGripMouseDown = event => {
    this.gripDrag = {
      originalHeight: this.state.editorHeight,
      originalDragY: event.clientY
    };
  };

  handleGripMouseUp = () => (this.gripDrag = null);

  handleGripMouseMove = event => {
    if (this.gripDrag !== null) {
      const newHeight =
        this.gripDrag.originalHeight +
        event.clientY -
        this.gripDrag.originalDragY;
      if (
        newHeight >= this.props.minEditorHeight &&
        newHeight <= this.props.maxEditorHeight
      ) {
        this.setState(prevState => ({
          ...prevState,
          editorHeight:
            this.gripDrag.originalHeight +
            (event.clientY - this.gripDrag.originalDragY)
        }));
      }
    }
  };

  handleTabChange = newTab => {
    this.props.onTabChange(newTab);
  };

  adjustEditorSize = () => {
    if (
      this.props.autoGrow &&
      this.textAreaRef &&
      this.textAreaRef.scrollHeight > this.textAreaRef.offsetHeight
    ) {
      this.setState({
        editorHeight: this.textAreaRef.scrollHeight + this.textAreaLineHeight
      });
    }
  };

  setPreviewRef = node => (this.previewAreaRef = node);

  setTextAreaRef = element => {
    this.textAreaRef = element;

    if (this.props.autoGrow && element) {
      const computed = window.getComputedStyle(element);
      let lineHeight = parseInt(computed.getPropertyValue("line-height"), 10);

      if (isNaN(lineHeight)) {
        lineHeight = parseInt(computed.getPropertyValue("font-size"), 10) * 1.5;
      }

      this.textAreaLineHeight = lineHeight;
    }

    this.adjustEditorSize();
  };

  handleCommand = command => {
    const { start, end } = Commander(this.textAreaRef, command.name);
    this.textAreaRef.focus();
    this.textAreaRef.selectionStart = start;
    this.textAreaRef.selectionEnd = end;
  };

  render() {
    const {
      classes,
      className,
      readOnly,
      maxEditorWidth,
      textAreaProps,
      selectedTab
    } = this.props;

    return (
      <div
        className={classNames(
          "react-mde",
          "react-mde-tabbed-layout",
          classes.reactMde,
          /**
           * "className" is OBSOLETE and will soon be removed
           */
          className
        )}
        style={{ width: maxEditorWidth || "100%" }}
      >
        <Toolbar
          {...this.props}
          classes={classes.toolbar}
          onCommand={this.handleCommand}
          onTabChange={this.handleTabChange}
          tab={selectedTab}
          readOnly={readOnly}
        />
        <TextArea
          {...this.props}
          suggestionsDropdownClasses={classes.suggestionsDropdown}
          editorRef={this.setTextAreaRef}
          onChange={this.handleTextChange}
          readOnly={readOnly}
          textAreaProps={{
            ...textAreaProps,
            onKeyDown: e => {
              this.adjustEditorSize();
              if (textAreaProps && textAreaProps.onKeyDown)
                textAreaProps.onKeyDown(e);
            }
          }}
          height={this.state.editorHeight}
          selectedTab={selectedTab === "preview"}
        />
        <div
          className={classNames("grip", classes.grip)}
          onMouseDown={this.handleGripMouseDown}
        >
          <SvgIcon icon="grip" />
        </div>
      </div>
    );
  }
}
