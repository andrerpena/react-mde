import * as React from "react";
import { GenerateMarkdownPreview } from "../types";
import { classNames } from "../util/ClassNames";

export interface ReactMdePreviewProps {
  className?: string;
  previewRef?: (ref: MdePreview) => void;
  emptyPreview?: React.ReactNode;
  minHeight: number;
  generateMarkdownPreview: GenerateMarkdownPreview;
  markdown: string;
}

export interface ReactMdePreviewState {
  loading: boolean;
  preview?: React.ReactNode;
}

export class MdePreview extends React.Component<ReactMdePreviewProps, ReactMdePreviewState> {
  previewRef: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount(): void {
    const { markdown, generateMarkdownPreview } = this.props;
    generateMarkdownPreview(markdown).then((preview) => {
      this.setState({
        preview,
        loading: false
      });
    });
  }

  render() {
    const { className, minHeight, emptyPreview } = this.props;
    const { preview, loading } = this.state;
    const finalHtml = loading ? emptyPreview : preview;

    let content;

    if (typeof finalHtml === "string") {
      content = <div
        className="mde-preview-content"
        dangerouslySetInnerHTML={{ __html: finalHtml || "<p>&nbsp;</p>" }}
        ref={(p) => this.previewRef = p}
      />;
    } else {
      content = <div className="mde-preview-content">
        {finalHtml}
      </div>;
    }

    return (
      <div className={classNames("mde-preview", { className, loading })} style={{ minHeight: minHeight + 10 }}>
        {content}
      </div>
    );
  }
}
