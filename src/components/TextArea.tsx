import * as React from "react";
import { classNames, ClassValue } from "../util/ClassNames";
import {
  CaretCoordinates,
  getCaretCoordinates
} from "../util/TextAreaCaretPosition";
import { Suggestion } from "../types";
import { insertText } from "../util/InsertTextAtPosition";
import { mod } from "../util/Math";
import { SuggestionsDropdown } from "./SuggestionsDropdown";

export interface MentionState {
  status: "active" | "inactive" | "loading";
  /**
   * Selection start by the time the mention was activated
   */
  startPosition?: number;
  focusIndex?: number;
  caret?: CaretCoordinates;
  suggestions: Suggestion[];
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
  suggestionsDropdownClasses?: ClassValue;
  value: string;
  onChange: (value: string) => void;
  editorRef?: (ref: HTMLTextAreaElement) => void;
  readOnly?: boolean;
  height?: number;
  suggestionTriggerCharacters?: string[];
  loadSuggestions?: (
    text: string,
    triggeredBy: string
  ) => Promise<Suggestion[]>;
  textAreaProps?: Partial<
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
  >;
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

  constructor(props) {
    super(props);
    this.state = { mention: { status: "inactive", suggestions: [] } };
  }

  handleTextAreaRef = (element: HTMLTextAreaElement) => {
    const { editorRef } = this.props;
    if (editorRef) {
      this.textAreaElement = element;
      editorRef(element);
    }
  };

  handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  handleBlur = () => {
    const { mention } = this.state;
    if (mention) {
      this.setState({ mention: { status: "inactive", suggestions: [] } });
    }
  };

  startLoadingSuggestions = (text: string) => {
    const promiseIndex = ++this.suggestionsPromiseIndex;
    const { loadSuggestions } = this.props;
    this.currentLoadSuggestionsPromise = this.currentLoadSuggestionsPromise
      .then(() => loadSuggestions(text, this.state.mention.triggeredBy))
      .then(suggestions => {
        if (this.state.mention.status === "inactive") {
          // This means this promise resolved too late when the status has already been set to inactice
          return;
        } else if (this.suggestionsPromiseIndex === promiseIndex) {
          if (!suggestions || !suggestions.length) {
            this.setState({
              mention: {
                status: "inactive",
                suggestions: []
              }
            });
          } else {
            this.setState({
              mention: {
                ...this.state.mention,
                status: "active",
                suggestions,
                focusIndex: 0
              }
            });
          }
          this.suggestionsPromiseIndex = 0;
        }
        return Promise.resolve();
      });
  };

  handleSuggestionSelected = (index: number) => {
    const { mention } = this.state;
    this.textAreaElement.selectionStart = mention.startPosition - 1;
    insertText(this.textAreaElement, mention.suggestions[index].value + " ");
    this.setState({
      mention: {
        status: "inactive",
        suggestions: []
      }
    });
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key, shiftKey } = event;
    const { selectionStart } = event.currentTarget;
    const { mention } = this.state;

    switch (mention.status) {
      case "loading":
      case "active":
        if (
          key === "Escape" ||
          (key === "Backspace" &&
            selectionStart <= this.state.mention.startPosition)
        ) {
          // resetting suggestionsPromiseIndex will cause any promise that is yet to be resolved to have no effect
          // when they finish loading.
          this.suggestionsPromiseIndex = 0;
          this.setState({
            mention: {
              status: "inactive",
              suggestions: []
            }
          });
        } else if (key === "Backspace") {
          const searchText = this.props.value.substr(mention.startPosition + 1);
          this.startLoadingSuggestions(searchText);
          if (mention.status !== "loading") {
            this.setState({
              mention: {
                ...this.state.mention,
                status: "loading"
              }
            });
          }
        } else if (
          mention.status === "active" &&
          (key === "ArrowUp" || key === "ArrowDown") &&
          !shiftKey
        ) {
          event.preventDefault();
          const focusDelta = key === "ArrowUp" ? -1 : 1;
          this.setState({
            mention: {
              ...mention,
              focusIndex: mod(
                mention.focusIndex + focusDelta,
                mention.suggestions.length
              )
            }
          });
        } else if (
          key === "Enter" &&
          mention.status === "active" &&
          mention.suggestions.length
        ) {
          event.preventDefault();
          this.handleSuggestionSelected(mention.focusIndex);
        }
        break;
      default:
      // Ignore
    }
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { suggestionTriggerCharacters } = this.props;
    const { mention } = this.state;
    const { key } = event;

    switch (mention.status) {
      case "loading":
      case "active":
        // In this case, the mentions box was open but the user typed something else
        const searchText = this.props.value.substr(mention.startPosition) + key;
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
        if (suggestionTriggerCharacters.indexOf(event.key) === -1) {
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

  render() {
    const {
      classes,
      readOnly,
      textAreaProps,
      height,
      value,
      suggestionTriggerCharacters,
      loadSuggestions,
      suggestionsDropdownClasses
    } = this.props;

    const suggestionsEnabled =
      suggestionTriggerCharacters &&
      suggestionTriggerCharacters.length &&
      loadSuggestions;

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
          onBlur={suggestionsEnabled ? this.handleBlur : undefined}
          onKeyDown={suggestionsEnabled ? this.handleKeyDown : undefined}
          onKeyPress={suggestionsEnabled ? this.handleKeyPress : undefined}
          {...textAreaProps}
        />
        {mention.status === "active" && mention.suggestions.length && (
          <SuggestionsDropdown
            classes={suggestionsDropdownClasses}
            caret={mention.caret}
            suggestions={mention.suggestions}
            onSuggestionSelected={this.handleSuggestionSelected}
            focusIndex={mention.focusIndex}
          />
        )}
      </div>
    );
  }
}
