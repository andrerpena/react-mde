import * as React from "react";
import { GenerateMarkdownPreview } from "../types";
import { classNames, ClassValue } from "../util/ClassNames";

export interface PreviewProps {
  classes?: ClassValue;
  previewRef?: React.Ref<any>;
  loadingPreview?: React.ReactNode;
  minHeight: number;
  generateMarkdownPreview: GenerateMarkdownPreview;
  markdown: string;
}

export type Preview = React.FunctionComponent<PreviewProps>;

export const Preview: Preview = ({
  classes,
  minHeight,
  loadingPreview,
  generateMarkdownPreview,
  markdown,
  previewRef
}) => {
  const [preview, loading] = useMarkdownPreview(
    generateMarkdownPreview,
    markdown
  );
  const finalHtml = loading ? loadingPreview : preview;

  return (
    <div
      className={classNames("mde-preview", classes, { loading })}
      style={{ minHeight: minHeight + 10 }}
      data-testid="mde-preview"
    >
      <div className="mde-preview-content" ref={previewRef}>
        {typeof finalHtml === "string" ? (
          <div
            dangerouslySetInnerHTML={{ __html: finalHtml || "<p>&nbsp;</p>" }}
          />
        ) : (
          finalHtml
        )}
      </div>
    </div>
  );
};

/**
 * Hook that asynchronously generates the markdown preview
 */
function useMarkdownPreview(
  generateMarkdownPreview: GenerateMarkdownPreview,
  markdown: string
): [React.ReactNode, boolean] {
  const [markdownPreview, setMarkdownPreview] = React.useState(
    "" as React.ReactNode
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    generateMarkdownPreview(markdown).then(preview => {
      setMarkdownPreview(preview);
    });
    setLoading(false);
  }, [generateMarkdownPreview, markdown]);
  return [markdownPreview, loading];
}
