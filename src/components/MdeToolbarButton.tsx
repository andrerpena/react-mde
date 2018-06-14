import * as React from "react";

export interface MdeToolbarButtonProps {
    buttonContent: React.ReactNode;
    buttonProps: any;
    onClick: React.MouseEventHandler<any>;
    readOnly: boolean;
}

export const MdeToolbarButton: React.SFC<MdeToolbarButtonProps> = (props) => {
    const {buttonContent, buttonProps, onClick, readOnly} = props;
    return (
        <li className="mde-header-item">
            <button type="button" {...buttonProps} onClick={onClick} disabled={readOnly}>
                {buttonContent}
            </button>
        </li>
    );
};
