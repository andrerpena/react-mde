import { Command, ButtonContentOptions } from "./Command";
import { EditorState } from "draft-js";
import { GenerateMarkdownPreview } from "./index";

export interface LayoutProps {
  buttonContentOptions: ButtonContentOptions;
  onChange: (editorState: EditorState) => void;
  onCommand: (command: Command) => void;
  commands?: Command[][];
  layoutOptions: any;
  editorState: EditorState;
  generateMarkdownPreview?: GenerateMarkdownPreview;
  // The default HTML that should be displayed in the preview when there is no text
  emptyPreviewHtml: string;
  readOnly: boolean;
}
