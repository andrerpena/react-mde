import * as React from "react";
import { classNames } from "../util/ClassNames";

export class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
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
        style={{
          maxHeight: minHeight,
          position: "absolute",
          top: "52px",
          width: "100%",
          overflowY: "scroll"
        }}
        data-testid="mde-preview"
      >
        {content}
      </div>
    );
  }
}
