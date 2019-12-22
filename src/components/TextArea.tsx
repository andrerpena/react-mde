import * as React from "react";
import { classNames, ClassValue } from "../util/ClassNames";
import {
  CaretCoordinates,
  getCaretCoordinates
} from "../util/TextAreaCaretPosition";
import { Mention } from "./Mention";
import { MentionSuggestion } from "../types";
import { insertText } from "../util/InsertTextAtPosition";
import { mod } from "../util/Math";

export interface MentionState {
  status: "active" | "inactive" | "loading";
  /**
   * Selection start by the time the mention was activated
   */
  startPosition?: number;
  focusIndex?: number;
  caret?: CaretCoordinates;
  suggestions: MentionSuggestion[];
  /**
   * The character that triggered the mention. Example: @
   */
  triggeredBy?: string;
}

export interface TextAreaState {
  mention: MentionState;
}

export interface TextAreaProps {
  classes?: ClassValue;
  value: string;
  onChange: (value: string) => void;
  editorRef?: (ref: HTMLTextAreaElement) => void;
  readOnly?: boolean;
  height?: number;
  mentionStartCharacters?: string[];
  loadMentionSuggestions?: (text: string, triggeredBy: string) => Promise<MentionSuggestion[]>
  textAreaProps?: Partial<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement>>;
}

export class TextArea extends React.Component<TextAreaProps, TextAreaState> {
  textAreaElement?: HTMLTextAreaElement;
  currentLoadSuggestionsPromise?: Promise<unknown> = Promise.resolve(undefined);

  /**
   * suggestionsPromiseIndex exists as a means to cancel what happens when the suggestions promise finishes loading.
   *
   * When the user is searching for suggestions, there is a promise that, when resolved, causes a re-render.
   * However, in case there is another promise to be resolved after the current one, it does not make sense to re-render
   * only to re-render again after the next one is complete.
   *
   * When there is a promise loading and the user cancels the suggestion, you don't want the status to go back to "active"
   * when the promise resolves.
   *
   * suggestionsPromiseIndex increments every time the mentions query
   */
  suggestionsPromiseIndex: number = 0;

  constructor (props) {
    super(props);
    this.state = { mention: { status: "inactive", suggestions: [] } };
  }

  handleTextAreaRef = (element: HTMLTextAreaElement) => {
    const { editorRef } = this.props;
    this.textAreaElement = element;
    editorRef(element);
  };

  handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  handleBlur = () => {
    const { mention } = this.state;
    if (mention) {
      // this.setState({ mention: { active: false } });
    }
  };

  startLoadingSuggestions = (text: string) => {
    const promiseIndex = ++this.suggestionsPromiseIndex;
    const { loadMentionSuggestions } = this.props;
    this.currentLoadSuggestionsPromise = this.currentLoadSuggestionsPromise
      .then(() => loadMentionSuggestions(text, this.state.mention.triggeredBy))
      .then(suggestions => {
        if (this.suggestionsPromiseIndex === promiseIndex) {
          this.setState({
            mention: {
              ...this.state.mention,
              status: "active",
              suggestions,
              focusIndex: 0
            }
          });
          this.suggestionsPromiseIndex = 0;
        }
        return Promise.resolve();
      });
  };

  handleSuggestionSelected = (value: string) => {
    this.textAreaElement.selectionStart = this.state.mention.startPosition;
    insertText(this.textAreaElement, value);
    this.setState({
      mention: {
        status: "inactive",
        suggestions: []
      }
    });
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key } = event;
    const { selectionStart } = event.currentTarget;
    const { mention } = this.state;

    switch (mention.status) {
      case "loading":
      case "active":
        if (key === "Escape" || (key === "Backspace" && selectionStart <= this.state.mention.startPosition)) {
          // resetting suggestionsPromiseIndex will cause any promise that is yet to be resolved to have no effect
          // when they finish loading.
          this.suggestionsPromiseIndex = 0;
          this.setState({
            mention: {
              status: "inactive",
              suggestions: []
            }
          });
        } else if (mention.status === "active" && (key === "ArrowUp" || key === "ArrowDown")) {
          event.preventDefault();
          const focusDelta = key === "ArrowUp" ? -1 : 1;
          this.setState({
            mention: {
              ...mention,
              focusIndex: mod(mention.focusIndex + focusDelta, mention.suggestions.length)
            }
          });
        }
        break;
      default:
      // Ignore
    }
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { mentionStartCharacters } = this.props;
    const { mention } = this.state;
    const { key } = event;

    switch (mention.status) {
      case "loading":
      case "active":
        // In this case, the mentions box was open but the user typed something else
        const searchText = this.props.value.substr(mention.startPosition) + key;
        console.log(searchText);
        this.startLoadingSuggestions(searchText);
        if (mention.status !== "loading") {
          this.setState({
            mention: {
              ...this.state.mention,
              status: "loading"
            }
          });
        }
        break;
      case "inactive":
        if (mentionStartCharacters.indexOf(event.key) === -1) {
          return;
        }
        const caret = getCaretCoordinates(event.currentTarget, "@");
        this.startLoadingSuggestions("");
        this.setState({
          mention: {
            status: "loading",
            startPosition: event.currentTarget.selectionStart + 1,
            caret: caret,
            suggestions: [],
            triggeredBy: event.key
          }
        });
        break;
    }
  };

  render () {
    const {
      classes,
      readOnly,
      textAreaProps,
      height,
      value,
      mentionStartCharacters,
      loadMentionSuggestions
    } = this.props;

    const mentionsEnabled = mentionStartCharacters && mentionStartCharacters.length && loadMentionSuggestions;

    const { mention } = this.state;
    return (
      <div className="mde-textarea-wrapper">
      <textarea
        className={classNames("mde-text", classes)}
        style={{ height }}
        ref={this.handleTextAreaRef}
        onChange={this.handleOnChange}
        readOnly={readOnly}
        value={value}
        data-testid="text-area"
        onBlur={
          mentionsEnabled
            ? this.handleBlur
            : undefined
        }
        onKeyDown={
          mentionsEnabled
            ? this.handleKeyDown
            : undefined
        }
        onKeyPress={
          mentionsEnabled
            ? this.handleKeyPress
            : undefined
        }
        {...textAreaProps}
      />
        {mention.status === "active" && mention.suggestions.length && <Mention caret={mention.caret}
                                                                               suggestions={mention.suggestions}
                                                                               onSuggestionSelected={this.handleSuggestionSelected}
                                                                               focusIndex={mention.focusIndex}
        />}
      </div>
    );
  }
}
