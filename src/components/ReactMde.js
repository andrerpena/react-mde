import React from "react";
import { getDefaultCommands } from "../commands";
import { Preview, Toolbar, TextArea } from ".";
import { extractCommandMap } from "../util/CommandUtils";
import { enL18n } from "../l18n/react-mde.en";
import { TextAreaCommandOrchestrator } from "../commandOrchestrator";
import { SvgIcon } from "../icons";
import { classNames } from "../util/ClassNames";

export class ReactMde extends React.Component {
  // resizeYStart will be null when it is not resizing
  gripDrag = null;
  keyCommandMap = {};

  static defaultProps = {
    commands: getDefaultCommands(),
    getIcon: name => <SvgIcon icon={name} />,
    emptyPreviewHtml: "<p>&nbsp;</p>",
    readOnly: false,
    autoGrow: false,
    l18n: enL18n,
    minEditorHeight: 200,
    maxEditorHeight: 500,
    minPreviewHeight: 200,
    selectedTab: "write",
    disablePreview: false,
    suggestionTriggerCharacters: ["@"]
  };

  constructor(props) {
    super(props);
    this.state = {
      editorHeight: props.minEditorHeight
    };
    this.keyCommandMap = {};
    const { commands } = this.props;
    this.keyCommandMap = extractCommandMap(commands);
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

  componentDidMount() {
    document.addEventListener("mousemove", this.handleGripMouseMove);
    document.addEventListener("mouseup", this.handleGripMouseUp);
  }

  adjustEditorSize = () => {
    const { autoGrow } = this.props;

    if (!autoGrow || !this.textAreaRef) {
      return;
    }

    if (this.textAreaRef.scrollHeight > this.textAreaRef.offsetHeight) {
      this.setState({
        editorHeight: this.textAreaRef.scrollHeight + this.textAreaLineHeight
      });
    }
  };

  setTextAreaRef = element => {
    const { autoGrow } = this.props;

    this.textAreaRef = element;
    this.commandOrchestrator = new TextAreaCommandOrchestrator(
      this.textAreaRef
    );

    if (autoGrow && element) {
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
    this.commandOrchestrator.executeCommand(command);
  };

  render() {
    const {
      getIcon,
      commands,
      classes,
      className,
      loadingPreview,
      emptyPreviewHtml,
      readOnly,
      disablePreview,
      value,
      l18n,
      minPreviewHeight,
      textAreaProps,
      selectedTab,
      generateMarkdownPreview,
      loadSuggestions,
      suggestionTriggerCharacters
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
      >
        <Toolbar
          classes={classes.toolbar}
          getIcon={getIcon}
          commands={commands}
          onCommand={this.handleCommand}
          onTabChange={this.handleTabChange}
          tab={selectedTab}
          readOnly={readOnly}
          disablePreview={disablePreview}
          l18n={l18n}
        />
        <>
          <TextArea
            classes={classes.textArea}
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
            value={value}
            suggestionTriggerCharacters={suggestionTriggerCharacters}
            loadSuggestions={loadSuggestions}
            selectedTab={selectedTab === "preview"}
          />
          {selectedTab === "preview" && (
            <Preview
              classes={classes.preview}
              previewRef={c => (this.previewRef = c)}
              loadingPreview={loadingPreview || emptyPreviewHtml}
              minHeight={minPreviewHeight}
              generateMarkdownPreview={generateMarkdownPreview}
              markdown={value}
            />
          )}
          <div
            className={classNames("grip", classes.grip)}
            onMouseDown={this.handleGripMouseDown}
          >
            <svg
              aria-hidden="true"
              data-prefix="far"
              data-icon="ellipsis-h"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="icon"
            >
              <path
                fill="currentColor"
                d="M304 256c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm120-48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-336 0c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"
                className=""
              />
            </svg>
          </div>
        </>
      </div>
    );
  }
}
