import * as React from "react";
import {
  Command,
  GenerateMarkdownPreview,
  ButtonContentOptions, CommandGroup
} from "./types";
import { getDefaultCommands } from "./commands";
import { ContentState, EditorProps, EditorState } from "draft-js";
import { getPlainText } from "./util/DraftUtil";
import { MdeEditor, MdePreview, MdeToolbar, MdeToolbarIcon } from "./components";
import * as classNames from "classnames";
import { extractCommandMap } from "./util/CommandUtils";
import { Tab } from "./types/Tab";

export interface ReactMdeProps {
  onChange: (value: string) => void;
  value: string;
  className?: string;
  commands?: CommandGroup[];
  buttonContentOptions?: ButtonContentOptions;
  generateMarkdownPreview: GenerateMarkdownPreview;
  emptyPreviewHtml?: string;
  readOnly?: boolean;
  draftEditorProps?: Partial<EditorProps>;
}

export interface ReactMdeState {
  currentTab: Tab,
  previewLoading: boolean,
  previewHtml?: string
}

export class ReactMde extends React.Component<ReactMdeProps, ReactMdeState> {

  cachedDraftState: EditorState;
  cachedValue: string;

  editorRef: MdeEditor;
  previewRef: MdePreview;

  keyCommandMap: { [key: string]: Command };

  static defaultProps: Partial<ReactMdeProps> = {
    commands: getDefaultCommands(),
    buttonContentOptions: {
      iconProvider: name => <MdeToolbarIcon icon={name}/>
    },
    emptyPreviewHtml: "<p>&nbsp;</p>",
    readOnly: false
  };

  constructor (props: ReactMdeProps) {
    super(props);
    this.rebuildCache(props.value);
    this.state = {
      currentTab: "write",
      previewLoading: false
    };
    this.keyCommandMap = {};
    const { commands } = this.props;
    this.keyCommandMap = extractCommandMap(commands);
  }

  rebuildCache = (value: string) => {
    this.cachedValue = value;
    this.cachedDraftState = value
      ? EditorState.createWithContent(ContentState.createFromText(value))
      : EditorState.createEmpty();
  };

  handleTextChange = (editorState: EditorState) => {
    const { onChange } = this.props;
    this.cachedValue = getPlainText(editorState);
    this.cachedDraftState = editorState;
    onChange(this.cachedValue);
  };

  handleTabChange = (newTab: Tab) => {
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
      generateMarkdownPreview(this.cachedValue).then((previewHtml) => {
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

  handleCommand = (command: Command) => {
    if (!command.execute) return;
    const newEditorState = command.execute(this.cachedDraftState);
    this.handleTextChange(newEditorState);
  };

  componentDidUpdate (prevProps: ReactMdeProps) {
    if (prevProps.value !== this.props.value) {
      this.rebuildCache(this.props.value);
    }
  }

  handleKeyCommand = (command: string) => {
    const { onChange } = this.props;
    if (this.keyCommandMap[command]) {
      this.handleCommand(this.keyCommandMap[command]);
      return "handled";
    }
    return "not-handled";
  };

  render () {

    const {
      buttonContentOptions,
      commands,
      className,
      emptyPreviewHtml,
      readOnly,
      draftEditorProps
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
        />
        {
          this.state.currentTab === "write" ?
            <MdeEditor
              editorRef={(c) => this.editorRef = c}
              onChange={this.handleTextChange}
              editorState={this.cachedDraftState}
              readOnly={readOnly}
              draftEditorProps={draftEditorProps}
              handleKeyCommand={this.handleKeyCommand}
            />
            :
            < MdePreview
              previewRef={(c) => this.previewRef = c}
              html={this.state.previewHtml}
              loading={this.state.previewLoading}
              emptyPreviewHtml={emptyPreviewHtml}
            />
        }
      </div>
    );
  }
}
