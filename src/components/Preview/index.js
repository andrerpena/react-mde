import * as React from "react";
import { classNames } from "~utils";

export class Preview extends React.Component {
  state = {
    loading: true
  };

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
    const { classes, loadingPreview, style } = this.props;
    const { preview, loading } = this.state;
    const finalHtml = loading ? loadingPreview : preview;

    let content;

    if (typeof finalHtml === "string") {
      content = (
        <div
          className="mde-preview-content"
          dangerouslySetInnerHTML={{ __html: finalHtml || "<p>&nbsp;</p>" }}
        />
      );
    } else {
      content = <div className="mde-preview-content">{finalHtml}</div>;
    }

    return (
      <div
        className={classNames("mde-preview", classes, { loading })}
        style={style}
        data-testid="mde-preview"
      >
        {content}
      </div>
    );
  }
}

export default Preview;
