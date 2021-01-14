import * as React from "react";
import { GenerateMarkdownPreview } from "../types";
import { classNames, ClassValue } from "../util/ClassNames";

export interface PreviewProps {
  classes?: ClassValue;
  refObject?: React.RefObject<HTMLDivElement>;
  loadingPreview?: React.ReactNode;
  minHeight: number;
  heightUnits: string;
  generateMarkdownPreview: GenerateMarkdownPreview;
  markdown: string;
}

export interface ReactMdePreviewState {
  loading: boolean;
  preview?: React.ReactNode;
}

export class Preview extends React.Component<
  PreviewProps,
  ReactMdePreviewState
> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount(): void {
    this.generatePreview();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.markdown !== prevProps.markdown) {
      this.generatePreview();
    }
  }

  generatePreview(): void {
    const { markdown, generateMarkdownPreview } = this.props;
    generateMarkdownPreview(markdown).then(preview => {
      this.setState({
        preview,
        loading: false
      });
    });
  }

  render() {
    const { classes, minHeight, loadingPreview, refObject, heightUnits } = this.props;
    const { preview, loading } = this.state;
    const finalHtml = loading ? loadingPreview : preview;

    let content;

    if (typeof finalHtml === "string") {
      content = (
        <div
          className="mde-preview-content"
          dangerouslySetInnerHTML={{ __html: finalHtml || "<p>&nbsp;</p>" }}
          ref={refObject}
        />
      );
    } else {
      content = <div className="mde-preview-content">{finalHtml}</div>;
    }

    const minHeightVal = (minHeight && heightUnits) ? (minHeight + 10) + heightUnits : minHeight + 10;

    return (
      <div
        className={classNames("mde-preview", classes, { loading })}
        style={{ minHeight: minHeightVal }}
        data-testid="mde-preview"
      >
        {content}
      </div>
    );
  }
}
