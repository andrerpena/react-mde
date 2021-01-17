import * as React from "react";
import { CaretCoordinates } from "../util/TextAreaCaretPosition";
import { useCallback } from "react";
import { Suggestion } from "../types";
import { classNames, ClassValue } from "../util/ClassNames";

export interface SuggestionsDropdownProps {
  classes?: ClassValue;
  caret: CaretCoordinates;
  suggestions: Suggestion[];
  onSuggestionSelected: (index: number) => void;
  /**
   * Which item is focused by the keyboard
   */
  focusIndex: number;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

export const SuggestionsDropdown: React.FunctionComponent<SuggestionsDropdownProps> = ({
  classes,
  suggestions,
  caret,
  onSuggestionSelected,
  focusIndex,
  textAreaRef
}) => {
  const handleSuggestionClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const index = parseInt(event.currentTarget.attributes["data-index"].value);
    onSuggestionSelected(index);
  };

  // onMouseDown should be cancelled because onClick will handle it propertly. This way, the textarea does not lose
  // focus
  const handleMouseDown = (event: React.MouseEvent) => event.preventDefault();

  return (
    <ul
      className={classNames("mde-suggestions", classes)}
      style={{
        left: caret.left - textAreaRef.current.scrollLeft,
        top: caret.top - textAreaRef.current.scrollTop
      }}
    >
      {suggestions.map((s, i) => (
        <li
          onClick={handleSuggestionClick}
          onMouseDown={handleMouseDown}
          key={i}
          aria-selected={focusIndex === i ? "true" : "false"}
          data-index={`${i}`}
        >
          {s.preview}
        </li>
      ))}
    </ul>
  );
};
