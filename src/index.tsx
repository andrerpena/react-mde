import * as MarkdownUtil from "./util/MarkdownUtil";
import {
  ReactMde,
  ReactMdeProps,
  TextArea,
  TextAreaProps,
  SuggestionsDropdown,
  SuggestionsDropdownProps,
  Preview,
  PreviewProps,
  Toolbar,
  ToolbarProps,
  ToolbarButtonGroup,
  ToolbarButtonGroupProps
} from "./components";
import { IconProviderProps, SvgIcon, MdeFontAwesomeIcon } from "./icons";
import { L18n } from "./types/L18n";
import { TextState, TextApi } from "./types/CommandOptions";
import { Command, ExecuteOptions, Suggestion } from "./types";
import { Classes } from "./classes";
import {
  ChildProps,
  ButtonChildProps,
  TextAreaChildProps
} from "./child-props";
import {
  CommandContext,
  PasteCommandContext,
  SaveImageHandler
} from "./commands/command";
import {
  getDefaultCommandMap,
  getDefaultToolbarCommands
} from "./commands/default-commands/defaults";

export {
  ReactMdeProps,
  TextArea,
  TextAreaProps,
  SuggestionsDropdown,
  SuggestionsDropdownProps,
  Suggestion,
  Preview,
  PreviewProps,
  Toolbar,
  ToolbarProps,
  ToolbarButtonGroup,
  ToolbarButtonGroupProps,
  MarkdownUtil,
  L18n,
  SvgIcon,
  MdeFontAwesomeIcon,
  IconProviderProps,
  TextState,
  TextApi,
  Command,
  Classes,
  ChildProps,
  ButtonChildProps,
  TextAreaChildProps,
  SaveImageHandler,
  getDefaultCommandMap,
  getDefaultToolbarCommands,
  CommandContext,
  PasteCommandContext,
  ExecuteOptions
};

export default ReactMde;
