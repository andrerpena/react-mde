import * as React from "react";
import { CaretCoordinates } from "../util/TextAreaCaretPosition";
import { useCallback } from "react";
import { Suggestion } from "../types";

export interface SuggestionsDropdownProps {
  caret: CaretCoordinates,
  suggestions: Suggestion[]
  onSuggestionSelected: (index: number) => void,
  /**
   * Which item is focused by the keyboard
   */
  focusIndex: number
}

export const SuggestionsDropdown: React.FunctionComponent<SuggestionsDropdownProps> = ({ suggestions, caret, onSuggestionSelected, focusIndex }) => {
  const handleSuggestionClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    const index = parseInt(event.currentTarget.attributes["data-index"].value);
    onSuggestionSelected(index);
  }, [suggestions]);
  // onMouseDown should be cancelled because onClick will handle it propertly. This way, the textarea does not lose
  // focus
  const handleMouseDown = useCallback((event: React.MouseEvent) => event.preventDefault(), []);
  return <ul className="mde-suggestions"
             style={{ left: caret.left, top: caret.top }}>
    {suggestions.map((s, i) => <li onClick={handleSuggestionClick}
                                   onMouseDown={handleMouseDown}
                                   key={i}
                                   aria-selected={focusIndex === i ? "true" : "false"}
                                   data-index={`${i}`}>
      {s.preview}
    </li>)}
  </ul>;
};
