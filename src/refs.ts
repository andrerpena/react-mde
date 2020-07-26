import * as React from "react";

export interface Refs {
  textarea?: React.RefObject<HTMLTextAreaElement>;
  preview?: React.RefObject<HTMLDivElement>;
}
