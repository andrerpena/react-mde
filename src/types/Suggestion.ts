import * as React from "react";

export interface Suggestion {
  /**
   * React element to be used as the preview
   */
  preview: React.ReactNode,
  /**
   * Value that is going to be used in the text in case this suggestion is selected
   */
  value: string
}
