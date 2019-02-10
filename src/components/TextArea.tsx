import * as React from "react";

export interface MdeEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  editorRef?: (ref: HTMLTextAreaElement) => void;
  readOnly?: boolean;
  height?: number;
  textAreaProps?: Partial<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>>
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
      editorRef,
      value
    } = this.props;
    return (
      <div className={`mde-text ${className || ""}`} style={{ height }}>
        <textarea
          ref={editorRef}
          onChange={this.handleOnChange}
          readOnly={readOnly}
          value={value}
          {...textAreaProps}
        />
      </div>
    );
  }
}
