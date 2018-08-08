import * as React from "react";
import {
  Command,
  GenerateMarkdownPreview,
  ButtonContentOptions
} from "./types";
import { getDefaultCommands } from "./commands";
import { layoutMap, LayoutMap } from "./LayoutMap";
import { ContentState, EditorState } from "draft-js";
import { getPlainText } from "./util/DraftUtil";
import { MdeToolbarIcon } from "./components";
import { isPromiseLike } from "./util/Promise";

export interface ReactMdeProps {
  onChange: (value: string) => void;
  value: string;
  className?: string;
  commands?: Command[][];
  buttonContentOptions?: ButtonContentOptions;
  generateMarkdownPreview?: GenerateMarkdownPreview;
  layout?: keyof LayoutMap;
  layoutOptions?: any;
  emptyPreviewHtml?: string;
  readOnly?: boolean;
}

export class ReactMde extends React.Component<ReactMdeProps> {
  cachedDraftState: EditorState;
  cachedValue: string;

  static defaultProps: Partial<ReactMdeProps> = {
    commands: getDefaultCommands(),
    buttonContentOptions: {
      iconProvider: name => <MdeToolbarIcon icon={name} />
    },
    layout: "vertical",
    emptyPreviewHtml: "<p>&nbsp;</p>",
    readOnly: false
  };

  constructor(props: ReactMdeProps) {
    super(props);
    this.rebuildCache(props.value);
  }

  rebuildCache = (value: string) => {
    this.cachedValue = value;
    this.cachedDraftState = value
      ? EditorState.createWithContent(ContentState.createFromText(value))
      : EditorState.createEmpty();
  };

  handleOnChange = (editorState: EditorState) => {
    const { onChange } = this.props;
    const value = getPlainText(editorState);

    this.cachedValue = value;
    this.cachedDraftState = editorState;

    onChange(this.cachedValue);
  };

  onCommand = (command: Command) => {
    if (!command.execute) return;
    const executedCommand = command.execute(this.cachedDraftState);
    if (isPromiseLike(executedCommand)) {
      executedCommand.then(result => this.handleOnChange(result));
    } else {
      this.handleOnChange(executedCommand);
    }
  };

  componentDidUpdate(prevProps: ReactMdeProps) {
    if (prevProps.value !== this.props.value) {
      this.rebuildCache(this.props.value);
    }
  }

  render() {
    const Layout = layoutMap[this.props.layout];
    const {
      buttonContentOptions,
      commands,
      layoutOptions,
      className,
      emptyPreviewHtml,
      readOnly
    } = this.props;
    return (
      <div className={`react-mde ${className || ""}`}>
        <Layout
          buttonContentOptions={buttonContentOptions}
          onChange={this.handleOnChange}
          onCommand={this.onCommand}
          commands={commands}
          layoutOptions={layoutOptions}
          mdeEditorState={this.cachedDraftState}
          emptyPreviewHtml={emptyPreviewHtml}
          readOnly={readOnly}
        />
      </div>
    );
  }
}
