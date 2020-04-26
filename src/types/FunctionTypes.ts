import * as React from "react";

export type GenerateMarkdownPreview = (
  markdown: string
) => Promise<React.ReactNode>;

export type HandleKeyCommand = (
  e: React.KeyboardEvent<HTMLTextAreaElement>
) => boolean;
