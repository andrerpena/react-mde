import * as React from "react";
import { CaretCoordinates } from "../util/TextAreaCaretPosition";
import { useCallback } from "react";
import { Suggestion } from "../types";
import { classNames, ClassValue } from "../util/ClassNames";

export interface SuggestionsDropdownProps {
  classes?: ClassValue;
  caret: CaretCoordinates;
  suggestions: Suggestion[];
  suggestionsAutoplace: boolean;
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
  suggestionsAutoplace,
  focusIndex,
  textAreaRef
}) => {
  const handleSuggestionClick = useCallback(
    (event: React.MouseEvent) => {
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
  const handleMouseDown =
    (event: React.MouseEvent) => event.preventDefault();

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  
  const left = caret.left - textAreaRef.current.scrollLeft;
  const top = caret.top - textAreaRef.current.scrollTop;

  const style = {} as React.CSSProperties;
  if (suggestionsAutoplace && top +
    textAreaRef.current.getBoundingClientRect().top +
    textAreaRef.current.ownerDocument.defaultView.pageYOffset +
    caret.lineHeight * 1.5 * suggestions.length > vh)
    style.bottom = textAreaRef.current.offsetHeight - caret.top;
  else
    style.top = top;
  
  if (suggestionsAutoplace && left +
    textAreaRef.current.getBoundingClientRect().left +
    textAreaRef.current.ownerDocument.defaultView.pageXOffset +
    caret.lineHeight * 1.5 * Math.max.apply(Math, suggestions.map(x => x.preview.toString().length)) > vw)
    style.right = textAreaRef.current.offsetWidth - caret.left;
  else
    style.left = left;
  
  return (
    <ul
      className={classNames("mde-suggestions", classes)}
      style={style}
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
