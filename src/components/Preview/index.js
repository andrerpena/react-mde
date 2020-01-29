import * as React from "react";
import ReactMarkdown from "react-markdown";
import { classNames } from "~utils";

const Preview = ({ classes, markdown, markdownProps, style }) => (
  <div className={classNames("mde-preview", classes)} style={style}>
    <ReactMarkdown skipHtml className="mde-preview-content" {...markdownProps}>
      {markdown}
    </ReactMarkdown>
  </div>
);

export default Preview;
