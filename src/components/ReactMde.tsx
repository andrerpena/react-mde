import * as React from "react";
import {
  Command,
  CommandGroup,
  GenerateMarkdownPreview,
  GetIcon
} from "../types";
import { getDefaultCommands } from "../commands";
import { MdePreview, MdeToolbar, TextArea } from ".";
import { extractCommandMap } from "../util/CommandUtils";
import { Tab } from "../types/Tab";
import { L18n } from "..";
import { enL18n } from "../l18n/react-mde.en";
import {
  CommandOrchestrator,
  TextAreaCommandOrchestrator
} from "../commandOrchestrator";
import { SvgIcon } from "../icons";
import { classNames } from "../util/ClassNames";

export interface ReactMdeProps {
  value: string;
  onChange: (value: string) => void;
  selectedTab: "write" | "preview";
  onTabChange: (tab: "write" | "preview") => void;
  generateMarkdownPreview: GenerateMarkdownPreview;
  minEditorHeight: number;
  maxEditorHeight: number;
  minPreviewHeight: number;
  className?: string;
  commands?: CommandGroup[];
  getIcon?: GetIcon;
  // deprecated. Use emptyPreview instead
  emptyPreviewHtml?: string;
  loadingPreview?: React.ReactNode;
  readOnly?: boolean;
  disablePreview?: boolean;
  textAreaProps?: Partial<
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
  >;
  l18n?: L18n;
}

export interface ReactMdeState {
  editorHeight: number;
}

export class ReactMde extends React.Component<ReactMdeProps, ReactMdeState> {
  commandOrchestrator: CommandOrchestrator;

  textAreaRef: HTMLTextAreaElement;
  previewRef: MdePreview;

  // resizeYStart will be null when it is not resizing
  gripDrag: {
    originalDragY: number;
    originalHeight: number;
  } = null;

  keyCommandMap: { [key: string]: Command };

  static defaultProps: Partial<ReactMdeProps> = {
    commands: getDefaultCommands(),
    getIcon: name => <SvgIcon icon={name} />,
    emptyPreviewHtml: "<p>&nbsp;</p>",
    readOnly: false,
    l18n: enL18n,
    minEditorHeight: 200,
    maxEditorHeight: 500,
    minPreviewHeight: 200,
    selectedTab: "write",
    disablePreview: false
  };

  constructor(props: ReactMdeProps) {
    super(props);
    this.state = {
      editorHeight: props.minEditorHeight
    };
    this.keyCommandMap = {};
    const { commands } = this.props;
    this.keyCommandMap = extractCommandMap(commands);
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

  setTextAreaRef = (element: HTMLTextAreaElement) => {
    this.textAreaRef = element;
    this.commandOrchestrator = new TextAreaCommandOrchestrator(
      this.textAreaRef
    );
  };

  handleCommand = (command: Command) => {
    this.commandOrchestrator.executeCommand(command);
  };

  render() {
    const {
      getIcon,
      commands,
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
      generateMarkdownPreview
    } = this.props;

    return (
      <div
        className={classNames(
          "react-mde",
          "react-mde-tabbed-layout",
          className
        )}
      >
        <MdeToolbar
          getIcon={getIcon}
          commands={commands}
          onCommand={this.handleCommand}
          onTabChange={this.handleTabChange}
          tab={selectedTab}
          readOnly={readOnly}
          disablePreview={disablePreview}
          l18n={l18n}
        />
        {selectedTab === "write" ? (
          <>
            <TextArea
              editorRef={this.setTextAreaRef}
              onChange={this.handleTextChange}
              readOnly={readOnly}
              textAreaProps={textAreaProps}
              height={this.state.editorHeight}
              value={value}
            />
            <div className="grip" onMouseDown={this.handleGripMouseDown}>
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
        ) : (
          <MdePreview
            previewRef={c => (this.previewRef = c)}
            loadingPreview={loadingPreview || emptyPreviewHtml}
            minHeight={minPreviewHeight}
            generateMarkdownPreview={generateMarkdownPreview}
            markdown={value}
          />
        )}
      </div>
    );
  }
}
