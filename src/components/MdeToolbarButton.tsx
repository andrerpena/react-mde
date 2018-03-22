import * as React from "react";

export interface MdeToolbarButtonProps {
    buttonContent: React.ReactNode;
    buttonProps: any;
    onClick: React.MouseEventHandler<any>;
}

export const MdeToolbarButton: React.SFC<MdeToolbarButtonProps> = (props) => {
    const {buttonContent, buttonProps, onClick} = props;
    return (
        <li className="mde-header-item">
            <button type="button" {...buttonProps} onClick={onClick}>
                {buttonContent}
            </button>
        </li>
    );
};
