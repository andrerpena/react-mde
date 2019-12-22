import * as React from "react";
import { CaretCoordinates } from "../util/TextAreaCaretPosition";
import { useCallback } from "react";
import { MentionSuggestion } from "../types";

export interface MentionProps {
  caret: CaretCoordinates,
  suggestions: MentionSuggestion[]
  onSuggestionSelected: (text: string) => void,
  /**
   * Which item is focused by the keyboard
   */
  focusIndex: number
}

export const Mention: React.FunctionComponent<MentionProps> = ({ suggestions, caret, onSuggestionSelected, focusIndex }) => {
  const handleSuggestionClick = useCallback((index: number) => { onSuggestionSelected(suggestions[index].value); }, [suggestions]);
  return <ul className="mde-mention"
             style={{ left: caret.left, top: caret.top }}>
    {suggestions.map((s, i) => <li onClick={e => handleSuggestionClick} key={i}
                                   aria-selected={focusIndex === i ? "true" : "false"}>
      {s.preview}
    </li>)}
  </ul>;
}
