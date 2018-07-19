import * as React from "react";
import { Command, ButtonContentOptions } from "../types";
export interface HeaderItemDropdownProps {
    buttonContentOptions: ButtonContentOptions;
    buttonContent: React.ReactNode;
    buttonProps: any;
    commands: Command[];
    onCommand: (command: Command) => void;
    readOnly: boolean;
}
export interface HeaderItemDropdownState {
    open: boolean;
}
export declare class MdeToolbarDropdown extends React.Component<HeaderItemDropdownProps, HeaderItemDropdownState> {
    dropdown: any;
    dropdownOpener: any;
    constructor(props: HeaderItemDropdownProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleGlobalClick: EventListenerOrEventListenerObject;
    openDropdown: () => void;
    closeDropdown(): void;
    clickedOutside: (e: Event) => boolean;
    handleOnClickCommand: (e: React.SyntheticEvent<any>, command: Command) => void;
    handleClick: () => void;
    render(): JSX.Element;
}
//# sourceMappingURL=MdeToolbarDropdown.d.ts.map