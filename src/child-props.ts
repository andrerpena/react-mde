import * as React from "react";

export type ButtonChildProps = Partial<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement> & Record<string, any>,
    HTMLButtonElement
  >
>;
export type TextAreaChildProps = Partial<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement> & Record<string, any>,
    HTMLTextAreaElement
  >
>;

export interface ChildProps {
  writeButton?: ButtonChildProps;
  previewButton?: ButtonChildProps;
  commandButtons?: ButtonChildProps;
  textArea?: TextAreaChildProps;
}
