import * as React from "react";
import {
  CommandMap,
  GenerateMarkdownPreview,
  GetIcon,
  PasteOptions,
  Suggestion,
  ToolbarCommands
} from "../types";
import { Preview, Toolbar, TextArea, ToolbarButtonData } from ".";
import { Tab } from "../types/Tab";
import {
  getDefaultCommandMap,
  getDefaultToolbarCommands
} from "../commands/default-commands/defaults";
import { Classes, L18n } from "..";
import { enL18n } from "../l18n/react-mde.en";
import { SvgIcon } from "../icons";
import { classNames } from "../util/ClassNames";
import { ChildProps } from "../child-props";
import { CommandOrchestrator } from "../commands/command-orchestrator";
import { Refs } from "../refs";
import { ButtonHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ComponentSimilarTo } from "../util/type-utils";

export interface ReactMdeProps {
  value: string;
  onChange: (value: string) => void;
  selectedTab: "write" | "preview";
  onTabChange: (tab: "write" | "preview") => void;
  generateMarkdownPreview: GenerateMarkdownPreview;
  minEditorHeight?: number;
  maxEditorHeight?: number;
  initialEditorHeight?: number;
  minPreviewHeight?: number;
  heightUnits?: string;
  classes?: Classes;
  refs?: Refs;
  toolbarCommands?: ToolbarCommands;
  commands?: CommandMap;
  getIcon?: GetIcon;
  loadingPreview?: React.ReactNode;
  readOnly?: boolean;
  disablePreview?: boolean;
  suggestionTriggerCharacters?: string[];
  suggestionsAutoplace?: boolean;
  loadSuggestions?: (
    text: string,
    triggeredBy: string
  ) => Promise<Suggestion[]>;
  childProps?: ChildProps;
  paste?: PasteOptions;
  l18n?: L18n;
  /**
   * Custom textarea component. "textAreaComponent" can be any React component which
   * props are a subset of the props of an HTMLTextAreaElement
   */
  textAreaComponent?: ComponentSimilarTo<
    HTMLTextAreaElement,
    TextareaHTMLAttributes<HTMLTextAreaElement>
  >;
  /**
   * Custom toolbar button component. "toolbarButtonComponent" can be any React component which
   * props are a subset of the props of an HTMLButtonElement
   */
  toolbarButtonComponent?: ComponentSimilarTo<
    HTMLButtonElement,
    ButtonHTMLAttributes<HTMLButtonElement>
  >;
}

export interface ReactMdeState {
  editorHeight: number;
}

const pasteOptionDefaults: Required<Omit<
  PasteOptions,
  "saveImage" | "command"
>> = {
  accept: "image/*",
  multiple: false
};

export class ReactMde extends React.Component<ReactMdeProps, ReactMdeState> {
  /**
   * "finalRefs" is a clone of "props.refs" except that undefined refs are set to default values
   */
  finalRefs: Refs;
  commandOrchestrator: CommandOrchestrator;

  static defaultProps: Partial<ReactMdeProps> = {
    commands: getDefaultCommandMap(),
    toolbarCommands: getDefaultToolbarCommands(),
    getIcon: name => <SvgIcon icon={name} />,
    readOnly: false,
    l18n: enL18n,
    minEditorHeight: 200,
    maxEditorHeight: 500,
    minPreviewHeight: 200,
    heightUnits: "px",
    selectedTab: "write",
    disablePreview: false,
    suggestionTriggerCharacters: ["@"],
    suggestionsAutoplace: false
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
      this.finalRefs.textarea,
      this.props.l18n,
      this.props.paste
        ? { ...pasteOptionDefaults, ...this.props.paste }
        : undefined
    );
    const minEditorHeight = Math.min(
      props.maxEditorHeight,
      props.minEditorHeight
    );
    this.state = {
      editorHeight: props.initialEditorHeight ?? minEditorHeight
    };
  }

  handleTextChange = (value: string) => {
    const { onChange } = this.props;
    onChange(value);
  };

  handlePaste = async (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const { paste } = this.props;
    if (!paste || !paste.saveImage) {
      return;
    }

    await this.commandOrchestrator.executePasteCommand(event);
  };

  handleDrop = async (event: React.DragEvent<HTMLTextAreaElement>) => {
    const { paste } = this.props;
    if (!paste || !paste.saveImage) {
      return;
    }

    await this.commandOrchestrator.executeDropCommand(event);
  };

  handleImageSelection = async (event: React.ChangeEvent) => {
    const { paste } = this.props;
    if (!paste || !paste.saveImage) {
      return;
    }
    await this.commandOrchestrator.executeSelectImageCommand(event);
  };

  handleTabChange = (newTab: Tab) => {
    const { onTabChange } = this.props;
    onTabChange(newTab);
  };

  handleCommand = async (commandName: string) => {
    await this.commandOrchestrator.executeCommand(commandName);
  };

  render() {
    const {
      getIcon,
      toolbarCommands,
      classes,
      loadingPreview,
      readOnly,
      disablePreview,
      value,
      l18n,
      minPreviewHeight,
      heightUnits,
      childProps,
      selectedTab,
      generateMarkdownPreview,
      loadSuggestions,
      suggestionTriggerCharacters,
      textAreaComponent
    } = this.props;

    const finalChildProps = childProps || {};

    const toolbarButtons = toolbarCommands.map(group => {
      return group.map(commandName => {
        const command = this.commandOrchestrator.getCommand(commandName);
        return {
          commandName: commandName,
          buttonContent: command.icon
            ? command.icon(getIcon)
            : getIcon(commandName),
          buttonProps: command.buttonProps,
          buttonComponentClass: command.buttonComponentClass
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
            suggestionsAutoplace={this.props.suggestionsAutoplace}
            refObject={this.finalRefs.textarea}
            onChange={this.handleTextChange}
            onPaste={this.handlePaste}
            onDrop={this.handleDrop}
            readOnly={readOnly}
            textAreaComponent={textAreaComponent}
            textAreaProps={childProps && childProps.textArea}
            height={this.state.editorHeight}
            heightUnits={this.props.heightUnits}
            value={value}
            suggestionTriggerCharacters={suggestionTriggerCharacters}
            loadSuggestions={loadSuggestions}
            onPossibleKeyCommand={
              this.commandOrchestrator.handlePossibleKeyCommand
            }
          />
          {this.props.paste && (
            <label className={classNames("image-tip")}>
              <input
                className={classNames("image-input")}
                type="file"
                accept={this.props.paste.accept ?? pasteOptionDefaults.accept}
                multiple={
                  this.props.paste.multiple ?? pasteOptionDefaults.multiple
                }
                onChange={this.handleImageSelection}
              />
              <span>{l18n.pasteDropSelect}</span>
            </label>
          )}
        </div>
        {selectedTab !== "write" && (
          <Preview
            classes={classes?.preview}
            refObject={this.finalRefs.preview}
            loadingPreview={loadingPreview}
            minHeight={minPreviewHeight}
            heightUnits={heightUnits}
            generateMarkdownPreview={generateMarkdownPreview}
            markdown={value}
          />
        )}
      </div>
    );
  }
}
