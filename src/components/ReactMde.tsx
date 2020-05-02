import * as React from "react";
import {
  Command,
  CommandMap,
  GenerateMarkdownPreview,
  GetIcon,
  Suggestion,
  ToolbarCommands
} from "../types";
import { Preview, Toolbar, TextArea, ToolbarButtonData } from ".";
import { Tab } from "../types/Tab";
import { Classes, L18n } from "..";
import { enL18n } from "../l18n/react-mde.en";
import { SvgIcon } from "../icons";
import { classNames } from "../util/ClassNames";
import { ChildProps } from "../child-props";
import { CommandOrchestrator } from "../commands/command-orchestrator";
import { Refs } from "../refs";
import {
  ButtonHTMLAttributes,
  DetailedHTMLFactory,
  TextareaHTMLAttributes
} from "react";
import {
  getDefaultCommandMap,
  getDefaultToolbarCommands
} from "../commands/default-commands/defaults";
import { ComponentSubsetOf } from "../util/type-utils";

export interface ReactMdeProps {
  value: string;
  onChange: (value: string) => void;
  selectedTab: "write" | "preview";
  onTabChange: (tab: "write" | "preview") => void;
  generateMarkdownPreview: GenerateMarkdownPreview;
  minEditorHeight: number;
  maxEditorHeight: number;
  minPreviewHeight: number;
  classes?: Classes;
  refs?: Refs;
  toolbarCommands?: ToolbarCommands;
  commands?: CommandMap;
  getIcon?: GetIcon;
  loadingPreview?: React.ReactNode;
  readOnly?: boolean;
  disablePreview?: boolean;
  suggestionTriggerCharacters?: string[];
  loadSuggestions?: (text: string) => Promise<Suggestion[]>;
  childProps?: ChildProps;
  l18n?: L18n;
  /**
   * Custom textarea component. "textAreaComponent" can be any React component which
   * props are a subset of the props of an HTMLTextAreaElement
   */
  textAreaComponent?: ComponentSubsetOf<
    HTMLTextAreaElement,
    TextareaHTMLAttributes<HTMLTextAreaElement>
  >;
  /**
   * Custom toolbar button component. "toolbarButtonComponent" can be any React component which
   * props are a subset of the props of an HTMLButtonElement
   */
  toolbarButtonComponent?: ComponentSubsetOf<
    HTMLButtonElement,
    ButtonHTMLAttributes<HTMLButtonElement>
  >;
}

export interface ReactMdeState {
  editorHeight: number;
}

export class ReactMde extends React.Component<ReactMdeProps, ReactMdeState> {
  /**
   * "finalRefs" is a clone of "props.refs" except that undefined refs are set to default values
   */
  finalRefs: Refs;
  commandOrchestrator: CommandOrchestrator;

  // resizeYStart will be null when it is not resizing
  gripDrag: {
    originalDragY: number;
    originalHeight: number;
  } = null;

  static defaultProps: Partial<ReactMdeProps> = {
    commands: getDefaultCommandMap(),
    toolbarCommands: getDefaultToolbarCommands(),
    getIcon: name => <SvgIcon icon={name} />,
    readOnly: false,
    l18n: enL18n,
    minEditorHeight: 200,
    maxEditorHeight: 500,
    minPreviewHeight: 200,
    selectedTab: "write",
    disablePreview: false,
    suggestionTriggerCharacters: ["@"]
  };

  constructor(props: ReactMdeProps) {
    super(props);
    this.finalRefs = { ...(props.refs || {}) };
    if (!this.finalRefs.textarea) {
      this.finalRefs.textarea = React.createRef<HTMLTextAreaElement>();
    }
    if (!this.finalRefs.preview) {
      this.finalRefs.preview = React.createRef<HTMLDivElement>();
    }
    this.commandOrchestrator = new CommandOrchestrator(
      this.props.commands,
      this.finalRefs.textarea
    );
    this.state = {
      editorHeight: props.minEditorHeight
    };
  }

  handleTextChange = (value: string) => {
    const { onChange } = this.props;
    onChange(value);
  };

  handleGripMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    this.gripDrag = {
      originalHeight: this.state.editorHeight,
      originalDragY: event.clientY
    };
  };

  handleGripMouseUp = () => {
    this.gripDrag = null;
  };

  handleGripMouseMove = (event: MouseEvent) => {
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

  handleTabChange = (newTab: Tab) => {
    const { onTabChange } = this.props;
    onTabChange(newTab);
  };

  componentDidMount() {
    document.addEventListener<"mousemove">(
      "mousemove",
      this.handleGripMouseMove
    );
    document.addEventListener<"mouseup">("mouseup", this.handleGripMouseUp);
  }

  handleCommand = async (commandName: string) => {
    await this.commandOrchestrator.executeCommand(commandName);
  };

  render() {
    const {
      getIcon,
      commands,
      toolbarCommands,
      classes,
      loadingPreview,
      readOnly,
      disablePreview,
      value,
      l18n,
      minPreviewHeight,
      childProps,
      selectedTab,
      generateMarkdownPreview,
      loadSuggestions,
      suggestionTriggerCharacters,
      textAreaComponent
    } = this.props;

    const finalChildProps = childProps || {};

    const toolbarButtons = toolbarCommands.map(group => {
      return group.map(c => {
        const command = commands[c];
        return {
          commandName: c,
          buttonContent: command.icon
            ? command.icon(getIcon)
            : getIcon(command.name),
          buttonProps: command.buttonProps
        } as ToolbarButtonData;
      });
    });

    return (
      <div
        className={classNames(
          "react-mde",
          "react-mde-tabbed-layout",
          classes?.reactMde
        )}
      >
        <Toolbar
          classes={classes?.toolbar}
          buttons={toolbarButtons}
          onCommand={this.handleCommand}
          onTabChange={this.handleTabChange}
          tab={selectedTab}
          readOnly={readOnly}
          disablePreview={disablePreview}
          l18n={l18n}
          buttonProps={finalChildProps.commandButtons}
          writeButtonProps={finalChildProps.writeButton}
          previewButtonProps={finalChildProps.previewButton}
        />
        <div className={classNames({ invisible: selectedTab !== "write" })}>
          <TextArea
            classes={classes?.textArea}
            suggestionsDropdownClasses={classes?.suggestionsDropdown}
            refObject={this.finalRefs.textarea}
            onChange={this.handleTextChange}
            readOnly={readOnly}
            textAreaComponent={textAreaComponent}
            textAreaProps={childProps && childProps.textArea}
            height={this.state.editorHeight}
            value={value}
            suggestionTriggerCharacters={suggestionTriggerCharacters}
            loadSuggestions={loadSuggestions}
            onPossibleKeyCommand={
              this.commandOrchestrator.handlePossibleKeyCommand
            }
          />
          <div
            className={classNames("grip", classes?.grip)}
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
        </div>
        {selectedTab !== "write" && (
          <Preview
            classes={classes?.preview}
            refObject={this.finalRefs.preview}
            loadingPreview={loadingPreview}
            minHeight={minPreviewHeight}
            generateMarkdownPreview={generateMarkdownPreview}
            markdown={value}
          />
        )}
      </div>
    );
  }
}
