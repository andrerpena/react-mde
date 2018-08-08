import * as React from "react";
import {
  Command,
  GenerateMarkdownPreview,
  ButtonContentOptions
} from "./types";
import { getDefaultCommands } from "./commands";
import { LayoutMap } from "./LayoutMap";
import { ContentState, EditorProps, EditorState } from "draft-js";
import { getPlainText } from "./util/DraftUtil";
import { MdeEditor, MdePreview, MdeToolbar, MdeToolbarIcon } from "./components";
import { isPromiseLike } from "./util/Promise";
import { TAB_CODE, TAB_PREVIEW } from "./components-layout";
import * as classNames from 'classnames'

export interface ReactMdeProps {
  onChange: (value: string) => void;
  value: string;
  className?: string;
  commands?: Command[][];
  buttonContentOptions?: ButtonContentOptions;
  generateMarkdownPreview: GenerateMarkdownPreview;
  layout?: keyof LayoutMap;
  emptyPreviewHtml?: string;
  readOnly?: boolean;
  draftEditorProps?: Partial<EditorProps>;
}

export interface ReactMdeState {
  currentTab: Tab,
  previewLoading: boolean,
  previewHtml?: string
}

export type Tab = "write" | "preview"

export class ReactMde extends React.Component<ReactMdeProps, ReactMdeState> {

  cachedDraftState: EditorState;
  cachedValue: string;

  editorRef: MdeEditor;
  previewRef: MdePreview;

  static defaultProps: Partial<ReactMdeProps> = {
    commands: getDefaultCommands(),
    buttonContentOptions: {
      iconProvider: name => <MdeToolbarIcon icon={name}/>
    },
    layout: "vertical",
    emptyPreviewHtml: "<p>&nbsp;</p>",
    readOnly: false
  };

  constructor (props: ReactMdeProps) {
    super(props);
    this.rebuildCache(props.value);
    this.state = {
      currentTab: 'write',
      previewLoading: false
    };
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
      previewLoading: newTab === 'preview'
    });

    if(newTab === 'preview') {
      // fire preview load
      const { generateMarkdownPreview } = this.props;
      generateMarkdownPreview(this.cachedValue).then((previewHtml) => {
        this.setState({
          // the current tab will be preview because changing tabs during preview
          // load should be prevented
          currentTab: 'preview',
          // previewHtml is always set to null. If the user has clicked the
          // preview tab, previewHtml will be set as soon as the promise resolves
          previewHtml,
          previewLoading: false
        });
      })
    }
  };

  onCommand = (command: Command) => {
    if (!command.execute) return;
    const executedCommand = command.execute(this.cachedDraftState);
    if (isPromiseLike(executedCommand)) {
      executedCommand.then(result => this.handleTextChange(result));
    } else {
      this.handleTextChange(executedCommand);
    }
  };

  componentDidUpdate (prevProps: ReactMdeProps) {
    if (prevProps.value !== this.props.value) {
      this.rebuildCache(this.props.value);
    }
  }

  render () {

    const {
      buttonContentOptions,
      commands,
      className,
      emptyPreviewHtml,
      readOnly,
      draftEditorProps
    } = this.props;

    let styleTabCode = "mde-tab";
    let styleTabPreview = "mde-tab";
    switch (this.state.currentTab) {
      case TAB_CODE:
        styleTabCode += " mde-tab-activated";
        break;
      case TAB_PREVIEW:
        styleTabPreview += " mde-tab-activated";
        break;
    }

    const reactMdeClassNames = classNames(
      "react-mde",
      "react-mde-tabbed-layout",
      className,
      {
        "react-mde-tab-write": this.state.currentTab === "write",
        "react-mde-tab-preview": this.state.currentTab === "preview"
      });

    return (
      <div className={reactMdeClassNames}>
        <MdeToolbar
          buttonContentOptions={buttonContentOptions}
          commands={commands}
          onCommand={this.onCommand}
          readOnly={readOnly}
        >
          <div className="mde-tabs">
            <button
              type="button"
              className={styleTabCode}
              onClick={() => this.handleTabChange('write')}
            >
              Code
            </button>
            <button
              type="button"
              className={styleTabPreview}
              onClick={() => this.handleTabChange('preview')}
            >
              Preview
            </button>
          </div>
        </MdeToolbar>
        {
          this.state.currentTab === 'write' ?
            <MdeEditor
              editorRef={(c) => this.editorRef = c}
              onChange={this.handleTextChange}
              editorState={this.cachedDraftState}
              readOnly={readOnly}
              draftEditorProps={draftEditorProps}
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
