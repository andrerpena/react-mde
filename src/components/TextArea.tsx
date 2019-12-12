import * as React from "react";
import { classNames, ClassValue } from "../util/ClassNames";
import { getCaretCoordinates } from "../util/TextAreaCaretPosition";

function getMentionEventObject(
  type: "start" | "cancel" | "typing",
  element: HTMLTextAreaElement,
  startPoint?: number
): MentionEventArgs {
  const caret = getCaretCoordinates(element, element.selectionEnd);

  const result: MentionEventArgs = {
    hookType: type,
    cursor: {
      selectionStart: element.selectionStart,
      selectionEnd: element.selectionEnd,
      top: caret.top,
      left: caret.left,
      height: caret.height
    }
  };

  if (!startPoint) {
    return result;
  }

  result.text = element.value.substr(startPoint, element.selectionStart);

  return result;
}

export interface MentionEventArgs {
  hookType: "start" | "cancel" | "typing";
  cursor: {
    selectionStart: number;
    selectionEnd: number;
    top: number;
    left: number;
    height: number;
  };
  text?: string;
}

export interface MdeEditorState {
  mentionsTriggered: boolean;
  mentionsTriggeredStartPosition?: number;
}

export interface TextAreProps {
  classes?: ClassValue;
  value: string;
  onChange: (value: string) => void;
  editorRef?: (ref: HTMLTextAreaElement) => void;
  readOnly?: boolean;
  height?: number;
  enableMentions?: boolean;
  onMentionStart?: (hooks: MentionEventArgs) => void;
  onMentionCancel?: (hooks: MentionEventArgs) => void;
  onMentionTyping?: (hooks: MentionEventArgs) => void;
  mentionTrigger?: {
    keyCode: number;
    shiftKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
  };
  textAreaProps?: Partial<
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
  >;
}

export class TextArea extends React.Component<TextAreProps, MdeEditorState> {
  constructor(props) {
    super(props);
    this.state = {
      mentionsTriggered: false,
      mentionsTriggeredStartPosition: null
    };
  }

  handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {

    const {
      enableMentions,
      mentionTrigger,
      onMentionStart,
      onMentionCancel,
      onMentionTyping
    } = this.props;
    if (!enableMentions) {
      return;
    }

    const { which, shiftKey, metaKey, ctrlKey } = event;

    const { selectionStart } = event.currentTarget;
    const { mentionsTriggered, mentionsTriggeredStartPosition } = this.state;

    if (!mentionsTriggered) {
      if (
        which === mentionTrigger.keyCode &&
        shiftKey === !!mentionTrigger.shiftKey &&
        ctrlKey === !!mentionTrigger.ctrlKey &&
        metaKey === !!mentionTrigger.metaKey
      ) {
        this.setState(
          {
            mentionsTriggered: true,
            mentionsTriggeredStartPosition: selectionStart + 1
          },
          () => {
            setTimeout(() => {
              onMentionStart(getMentionEventObject("start", event.currentTarget));
            }, 0);
          }
        );
        return null;
      }
    } else {
      if (which === 8 && selectionStart <= mentionsTriggeredStartPosition) {
        this.setState(
          {
            mentionsTriggered: false,
            mentionsTriggeredStartPosition: null
          },
          () => {
            setTimeout(() => {
              onMentionCancel(getMentionEventObject("cancel", event.currentTarget));
            }, 0);
          }
        );

        return null;
      }

      setTimeout(() => {
        onMentionTyping(
          getMentionEventObject(
            "typing",
            event.currentTarget,
            mentionsTriggeredStartPosition
          )
        );
      }, 0);
    }

    return null;
  }

  render() {
    const {
      classes,
      readOnly,
      textAreaProps,
      height,
      editorRef,
      value
    } = this.props;
    return (
      <textarea
        className={classNames("mde-text", classes)}
        style={{ height }}
        ref={editorRef}
        onChange={this.handleOnChange}
        readOnly={readOnly}
        value={value}
        data-testid="text-area"
        onKeyDown={this.handleKeyDown}
        {...textAreaProps}
      />
    );
  }
}
