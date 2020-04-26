import * as React from "react";

export type GenerateMarkdownPreview = (
  markdown: string
) => Promise<React.ReactNode>;
