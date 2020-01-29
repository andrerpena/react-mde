import React from "react";
import Toolbar from "~components/Toolbar";
import TextArea from "~components/TextArea";
import { getDefaultCommands } from "~commands";
import { SvgIcon } from "~icons";
import { classNames, extractCommandMap } from "~utils";
import Commander from "../Commander";

export class MDEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHeight: props.minEditorHeight,
      tab: props.selectedTab
    };
    this.gripDrag = null;
    this.keyCommandMap = extractCommandMap(props.commands);
  }

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
    const { onTabChange } = this.props;
    if (onTabChange) onTabChange(newTab);
    else this.setState({ tab: newTab });
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
    const { tab } = this.state;

    const {
      classes,
      className,
      maxEditorWidth,
      textAreaProps,
      selectedTab
    } = this.props;

    return (
      <div
        className={classNames("mde", classes.mde, className)}
        style={{ width: maxEditorWidth }}
      >
        <Toolbar
          {...this.props}
          classes={classes.toolbar}
          onCommand={this.handleCommand}
          onTabChange={this.handleTabChange}
          tab={selectedTab || tab}
        />
        <TextArea
          {...this.props}
          suggestionsDropdownClasses={classes.suggestionsDropdown}
          editorRef={this.setTextAreaRef}
          onChange={this.handleTextChange}
          textAreaProps={{
            ...textAreaProps,
            onKeyDown: e => {
              this.adjustEditorSize();
              if (textAreaProps && textAreaProps.onKeyDown)
                textAreaProps.onKeyDown(e);
            }
          }}
          height={this.state.editorHeight}
          selectedTab={selectedTab === "preview" || tab === "preview"}
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

MDEditor.defaultProps = {
  classes: {},
  commands: getDefaultCommands(),
  emptyPreviewHtml: "<p>&nbsp;</p>",
  readOnly: false,
  autoGrow: false,
  minEditorHeight: 250,
  maxEditorHeight: 500,
  minPreviewHeight: 200,
  maxEditorWidth: "100%",
  selectedTab: "",
  disablePreview: false,
  suggestionTriggerCharacters: ["@"],
  markdownProps: {}
};

export default MDEditor;
