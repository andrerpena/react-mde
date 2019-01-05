import * as React from "react";
import {
  Command,
  GenerateMarkdownPreview,
  ButtonContentOptions, CommandGroup
} from "./types";
import { getDefaultCommands } from "./commands";
import { TextArea, MdePreview, MdeToolbar, MdeFontAwesomeIcon } from "./components";
import * as classNames from "classnames";
import { extractCommandMap } from "./util/CommandUtils";
import { Tab } from "./types/Tab";
import { L18n } from "./types/L18n";
import { enL18n } from "./l18n/react-mde.en";
import { CommandOrchestrator } from "./commandOrchestrator";

export interface ReactMdeProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  commands?: CommandGroup[];
  generateMarkdownPreview: GenerateMarkdownPreview;
  buttonContentOptions?: ButtonContentOptions;
  emptyPreviewHtml?: string;
  readOnly?: boolean;
  textAreaProps?: Partial<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>>;
  l18n?: L18n;
  minEditorHeight: number;
  maxEditorHeight: number;
  minPreviewHeight: number;
}

export interface ReactMdeState {
  currentTab: Tab,
  previewLoading: boolean,
  previewHtml?: string,
  editorHeight: number
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
    buttonContentOptions: {
      iconProvider: name => <MdeFontAwesomeIcon icon={name}/>
    },
    emptyPreviewHtml: "<p>&nbsp;</p>",
    readOnly: false,
    l18n: enL18n,
    minEditorHeight: 200,
    maxEditorHeight: 500,
    minPreviewHeight: 200
  };

  constructor (props: ReactMdeProps) {
    super(props);
    this.state = {
      currentTab: "write",
      previewLoading: false,
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
      const newHeight = this.gripDrag.originalHeight + event.clientY - this.gripDrag.originalDragY;
      if (newHeight >= this.props.minEditorHeight && newHeight <= this.props.maxEditorHeight) {
        this.setState({
          ...this.state,
          editorHeight: this.gripDrag.originalHeight + (event.clientY - this.gripDrag.originalDragY)
        });
      }
    }
  };

  handleTabChange = (newTab: Tab) => {
    const { value } = this.props;

    // TODO: Prevent tab change if the preview is being loaded. The reason
    // is that, if the keeps changing text and tabs, depending on the time
    // the preview promises take to settle, there might be a race condition.
    this.setState({
      currentTab: newTab,
      // previewHtml is always set to null. If the user has clicked the
      // preview tab, previewHtml will be set as soon as the promise resolves
      previewHtml: null,
      previewLoading: newTab === "preview"
    });

    if (newTab === "preview") {
      // fire preview load
      const { generateMarkdownPreview } = this.props;
      generateMarkdownPreview(value).then((previewHtml) => {
        this.setState({
          // the current tab will be preview because changing tabs during preview
          // load should be prevented
          currentTab: "preview",
          // previewHtml is always set to null. If the user has clicked the
          // preview tab, previewHtml will be set as soon as the promise resolves
          previewHtml,
          previewLoading: false
        });
      });
    }
  };

  componentDidMount () {
    document.addEventListener<"mousemove">("mousemove", this.handleGripMouseMove);
    document.addEventListener<"mouseup">("mouseup", this.handleGripMouseUp);
  }

  handleCommand = (command: Command) => {
    this.commandOrchestrator.executeCommand(command);
  };

  render () {

    const {
      buttonContentOptions,
      commands,
      className,
      emptyPreviewHtml,
      readOnly,
      value,
      l18n,
      minPreviewHeight,
      textAreaProps
    } = this.props;

    return (
      <div className={classNames("react-mde", "react-mde-tabbed-layout", className)}>
        <MdeToolbar
          buttonContentOptions={buttonContentOptions}
          commands={commands}
          onCommand={this.handleCommand}
          onTabChange={this.handleTabChange}
          tab={this.state.currentTab}
          readOnly={readOnly}
          l18n={l18n}
        />
        {
          this.state.currentTab === "write" ?
            <>
              <TextArea
                editorRef={(c: HTMLTextAreaElement) => this.textAreaRef = c}
                onChange={this.handleTextChange}
                readOnly={readOnly}
                textAreaProps={textAreaProps}
                height={this.state.editorHeight}
                value={value}
              />
              <div className="grip"
                   onMouseDown={this.handleGripMouseDown}
              >
                <svg aria-hidden="true" data-prefix="far" data-icon="ellipsis-h" role="img"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512" className="icon">
                  <path fill="currentColor"
                        d="M304 256c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm120-48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-336 0c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"
                        className=""></path>
                </svg>
              </div>
            </>
            :
            < MdePreview
              previewRef={(c) => this.previewRef = c}
              html={this.state.previewHtml}
              loading={this.state.previewLoading}
              emptyPreviewHtml={emptyPreviewHtml}
              minHeight={minPreviewHeight}
            />
        }
      </div>
    );
  }
}
