import * as React from "react";
import * as classNames from "classnames";

export interface MdeEditorProps {
  className?: string;
  onChange: (value: string) => void;
  editorRef: (ref: HTMLTextAreaElement) => void;
  value: string;
  readOnly: boolean;
  height: number;
  textAreaProps: Partial<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>>
}

export class TextArea extends React.Component<MdeEditorProps, {}> {

  handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  render () {
    const {
      className,
      readOnly,
      textAreaProps,
      height,
      editorRef
    } = this.props;
    return (
      <div className={`mde-text ${className || ""}`} style={{ height }}>
        <textarea
          ref={editorRef}
          onChange={this.handleOnChange}
          readOnly={readOnly}
          {...textAreaProps}
        />
      </div>
    );
  }
}
