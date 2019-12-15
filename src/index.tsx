import * as MarkdownUtil from "./util/MarkdownUtil";
import * as commands from "./commands";
import {
  ReactMde,
  ReactMdeProps,
  TextArea,
  TextAreaProps,
  Preview,
  PreviewProps,
  Toolbar,
  ToolbarProps,
  ToolbarButtonGroup,
  ToolbarButtonGroupProps,
  ToolbarDropdown,
  ToolbarDropdownProps
} from "./components";
import { IconProviderProps, SvgIcon, MdeFontAwesomeIcon } from "./icons";
import { L18n } from "./types/L18n";
import { TextState, TextApi } from "./types/CommandOptions";
import { Command } from "./types";
import { Classes } from "./classes";

export {
  ReactMdeProps,
  TextArea,
  TextAreaProps,
  Preview,
  PreviewProps,
  Toolbar,
  ToolbarProps,
  ToolbarButtonGroup,
  ToolbarButtonGroupProps,
  ToolbarDropdown,
  ToolbarDropdownProps,
  MarkdownUtil,
  L18n,
  SvgIcon,
  MdeFontAwesomeIcon,
  IconProviderProps,
  commands,
  TextState,
  TextApi,
  Command,
  Classes
};

export default ReactMde;
