import React from "react";
import { classNames } from "~utils";

const { useCallback } = React;

export const SuggestionsDropdown = ({
  classes,
  suggestions,
  caret,
  onSuggestionSelected,
  focusIndex
}) => {
  const handleSuggestionClick = useCallback(
    event => {
      event.preventDefault();
      const index = parseInt(
        event.currentTarget.attributes["data-index"].value
      );
      onSuggestionSelected(index);
    },
    [suggestions]
  );
  // onMouseDown should be cancelled because onClick will handle it propertly. This way, the textarea does not lose
  // focus
  const handleMouseDown = useCallback(event => event.preventDefault(), []);
  return (
    <ul
      className={classNames("mde-suggestions", classes)}
      style={{ left: caret.left, top: caret.top }}
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

export default SuggestionsDropdown;
