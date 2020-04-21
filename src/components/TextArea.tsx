import * as React from "react";
import { classNames, ClassValue } from "../util/ClassNames";
import {
  CaretCoordinates,
  getCaretCoordinates
} from "../util/TextAreaCaretPosition";
import { Suggestion, Highlight } from "../types";
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
  highlight?: (text: string) => Highlight[];
  textAreaProps?: Partial<
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
  >;
}

export class TextArea extends React.Component<TextAreaProps, TextAreaState> {
  textAreaElement?: HTMLTextAreaElement;
  highlightBackdropElement?: HTMLDivElement;
  highlightContainerElement?: HTMLDivElement;

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

  loadEmptySuggestion = (target: HTMLTextAreaElement, key: string) => {
    const caret = getCaretCoordinates(target, key);
    this.startLoadingSuggestions("");
    this.setState({
      mention: {
        status: "loading",
        startPosition: target.selectionStart + 1,
        caret: caret,
        suggestions: [],
        triggeredBy: key
      }
    });
  }

  handleSuggestionSelected = (index: number) => {
    const { mention } = this.state;

    this.textAreaElement.selectionStart = mention.startPosition - 1
    const textForInsert = this.props.value
      .substr(this.textAreaElement.selectionStart, this.textAreaElement.selectionEnd - this.textAreaElement.selectionStart)


    insertText(this.textAreaElement, mention.suggestions[index].value + ' ');
    this.setState({
      mention: {
        status: "inactive",
        suggestions: []
      }
    });
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key, shiftKey, currentTarget } = event;
    const { selectionStart } = currentTarget;
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

  handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key } = event;
    const { mention } = this.state;
    const { suggestionTriggerCharacters, value } = this.props;

    switch (mention.status) {
      case "loading":
      case "active":
        if (key === "Backspace") {
          const searchText = value.substr(mention.startPosition, this.textAreaElement.selectionStart - mention.startPosition)

          this.startLoadingSuggestions(searchText);
          if (mention.status !== "loading") {
            this.setState({
              mention: {
                ...this.state.mention,
                status: "loading"
              }
            });
          }
        }
        break;
      case "inactive":
        if (key === "Backspace") {
          const prevChar = value.charAt(this.textAreaElement.selectionStart - 1)
          const isAtMention = suggestionTriggerCharacters.includes(
            value.charAt(this.textAreaElement.selectionStart - 1)
          )

          if (isAtMention) {
            this.loadEmptySuggestion(event.currentTarget, prevChar)
          }
        }
        break;
      default:
      // Ignore
    }
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { suggestionTriggerCharacters, value } = this.props;
    const { mention } = this.state;
    const { key } = event;

    switch (mention.status) {
      case "loading":
      case "active":
        if (key === " ") {
          this.setState({
            mention: {
              ...this.state.mention,
              status: "inactive"
            }
          });

          return
        }

        const searchText = value.substr(
          mention.startPosition,
          this.textAreaElement.selectionStart - mention.startPosition
        ) + key

        // In this case, the mentions box was open but the user typed something else
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
        if (
          suggestionTriggerCharacters.indexOf(event.key) === -1 ||
          !/\s|\(|\[|^.{0}$/.test(value.charAt(this.textAreaElement.selectionStart - 1))
        ) {
          return;
        }

        this.loadEmptySuggestion(event.currentTarget, event.key)
        break;
    }
  };

  handleHighlightBackdropRef = (element: HTMLDivElement) => {
    this.highlightBackdropElement = element;
  }

  handleHighlightContainerRef = (element: HTMLDivElement) => {
    this.highlightContainerElement = element
  }
  

  handleScroll = (ev: React.UIEvent<HTMLTextAreaElement>) => {
    const {scrollTop, scrollLeft} = (ev.target as HTMLElement);
    if (this.highlightBackdropElement && this.highlightContainerElement) {
      this.highlightContainerElement.style.height = this.textAreaElement.scrollHeight  + "px"
      this.highlightBackdropElement.scrollTop = scrollTop
      this.highlightBackdropElement.style.transform = (scrollLeft > 0) ? 'translateX(' + -scrollLeft + 'px)' : '';
    }
    if (this.props.textAreaProps && this.props.textAreaProps.onScroll) {
      this.props.textAreaProps.onScroll(ev);
    }
  }

  generateHighlightTextPartials(text: string, highlights: Highlight[]): React.ReactNode[] {
    let offset = 0;
    let elements: React.ReactNode[] = [];
    highlights.forEach(({ color, range: [start, end] }) => {
      const part = text.slice(offset, start)
      if (part) {
        elements.push(part)
      }

      elements.push(React.createElement("mark", { className: "mde-highlight", key: `${start}_${end}`, style: { backgroundColor: color }}, text.slice(start, end).replace(/\n$/g, "\n\n")))
      offset = end;
    })
    if (offset < text.length - 1) {
      elements.push(text.slice(offset, text.length - 1))
    }
    return elements;
  }

  onScrollHighlightContainer = (ev: React.UIEvent<HTMLDivElement>) => {
    if (ev.target instanceof Element) {
      ev.target.scrollLeft = 0
    }
  }

  renderHighlights() {
    const { value, highlight } = this.props
    if (!highlight) return null
    const highlightElements = this.generateHighlightTextPartials(value, highlight(value))
    if (highlightElements.length === 0) return null

    return (
      <div
        ref={this.handleHighlightBackdropRef} 
        className="mde-highlight-backdrop"
      >
        <div
          ref={this.handleHighlightContainerRef}
          className="mde-highlights"
          onScroll={this.onScrollHighlightContainer}
        >
          {highlightElements}
        </div>
      </div>
    )
  }

  render() {
    const {
      classes,
      readOnly,
      textAreaProps,
      height,
      value,
      suggestionTriggerCharacters,
      loadSuggestions,
      suggestionsDropdownClasses,
      highlight,
    } = this.props;

    const suggestionsEnabled =
      suggestionTriggerCharacters &&
      suggestionTriggerCharacters.length &&
      loadSuggestions;

    const highlightsEnabled = !!highlight

    const { mention } = this.state;
    return (
      <div className="mde-textarea-wrapper">
        {this.renderHighlights()}
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
          onKeyUp={suggestionsEnabled ? this.handleKeyUp : undefined}
          onKeyPress={suggestionsEnabled ? this.handleKeyPress : undefined}
          onScroll={highlightsEnabled ? this.handleScroll : undefined}
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
