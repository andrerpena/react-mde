import * as React from "react";
import { classNames, ClassValue } from "../util/ClassNames";

export interface TextAreaProps {
  classes?: ClassValue;
  value: string;
  onChange: (value: string) => void;
  editorRef?: (ref: HTMLTextAreaElement) => void;
  readOnly?: boolean;
  height?: number;
  textAreaProps?: Partial<
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
  >;
}

export class TextArea extends React.Component<TextAreaProps, {}> {
  handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  render() {
    const {
      classes,
      readOnly,
      textAreaProps,
      height,
      editorRef,
      value
    } = this.props;
    return (
      <textarea
        className={classNames("mde-text", classes)}
        style={{ height }}
        ref={editorRef}
        onChange={this.handleOnChange}
        readOnly={readOnly}
        value={value}
        {...textAreaProps}
        data-testid="text-area"
      />
    );
  }
}
