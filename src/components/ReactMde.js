import React from "react";
import { Toolbar, TextArea } from ".";
import { getDefaultCommands } from "../commands";
import { TextAreaCommandOrchestrator } from "../commandOrchestrator";
import { SvgIcon } from "../icons";
import { extractCommandMap } from "../util/CommandUtils";
import { classNames } from "../util/ClassNames";

export class ReactMde extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHeight: props.minEditorHeight
    };
    this.gripDrag = null;
    this.keyCommandMap = {};
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
        this.setState({
          ...this.state,
          editorHeight:
            this.gripDrag.originalHeight +
            (event.clientY - this.gripDrag.originalDragY)
        });
      }
    }
  };

  handleTabChange = newTab => this.props.onTabChange(newTab);

  adjustEditorSize = () => {
    if (!this.props.autoGrow || !this.textAreaRef) {
      return;
    }

    if (this.textAreaRef.scrollHeight > this.textAreaRef.offsetHeight) {
      this.setState({
        editorHeight: this.textAreaRef.scrollHeight + this.textAreaLineHeight
      });
    }
  };

  setTextAreaRef = element => {
    this.textAreaRef = element;
    this.commandOrchestrator = new TextAreaCommandOrchestrator(
      this.textAreaRef
    );

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

  handleCommand = command => this.commandOrchestrator.executeCommand(command);

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
