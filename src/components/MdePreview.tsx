import * as React from "react";
import { GenerateMarkdownPreview } from "../types";
import { classNames, ClassValue } from "../util/ClassNames";

export interface ReactMdePreviewProps {
  classes?: ClassValue;
  previewRef?: (ref: MdePreview) => void;
  loadingPreview?: React.ReactNode;
  minHeight: number;
  generateMarkdownPreview: GenerateMarkdownPreview;
  markdown: string;
}

export interface ReactMdePreviewState {
  loading: boolean;
  preview?: React.ReactNode;
}

export class MdePreview extends React.Component<
  ReactMdePreviewProps,
  ReactMdePreviewState
> {
  previewRef: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount(): void {
    const { markdown, generateMarkdownPreview } = this.props;
    generateMarkdownPreview(markdown).then(preview => {
      this.setState({
        preview,
        loading: false
      });
    });
  }

  render() {
    const { classes, minHeight, loadingPreview } = this.props;
    const { preview, loading } = this.state;
    const finalHtml = loading ? loadingPreview : preview;

    let content;

    if (typeof finalHtml === "string") {
      content = (
        <div
          className="mde-preview-content"
          dangerouslySetInnerHTML={{ __html: finalHtml || "<p>&nbsp;</p>" }}
          ref={p => (this.previewRef = p)}
        />
      );
    } else {
      content = <div className="mde-preview-content">{finalHtml}</div>;
    }

    return (
      <div
        className={classNames("mde-preview", classes, { loading })}
        style={{ minHeight: minHeight + 10 }}
        data-testid="mde-preview"
      >
        {content}
      </div>
    );
  }
}
