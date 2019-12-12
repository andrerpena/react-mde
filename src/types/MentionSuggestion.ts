import * as React from "react";

export interface MentionSuggestion {
  /**
   * React element to be used as the preview
   */
  preview: React.ReactNode,
  /**
   * Value that is going to be used in the text in case this suggestion is selected
   */
  value: string
}
