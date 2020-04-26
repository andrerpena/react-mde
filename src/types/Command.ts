import * as React from "react";
import { TextApi, TextState } from "./CommandOptions";

export type GetIcon = (iconName: string) => React.ReactNode;

export interface Command {
  name: string;
  buttonComponentClass?: React.ComponentClass | string;
  icon?: (getIconFromProvider: GetIcon) => React.ReactNode;
  buttonProps?: any;
  children?: Command[];
  execute?: (state: TextState, api: TextApi) => void;
  // Draft.js triggers Key Commands. the keyCommand property determines
  // which Draft.js key command should be handled by this react-mde command
  keyCommand?: string;
}
