import * as React from "react";

export interface MdeToolbarButtonProps {
    buttonContent: React.ReactNode;
    buttonProps?: any;
    onClick: React.MouseEventHandler<any>;
    readOnly: boolean;
    setValues?: any;
    CustomButtonComponent?: any; /* TODO (bnbarak): set the right type - Component/PureComponent */
    otherProps?: any;
}

export const MdeToolbarButton: React.SFC<MdeToolbarButtonProps> = (props) => {
    const {buttonContent, buttonProps, onClick, readOnly, CustomButtonComponent, setValues, otherProps} = props;
    const defaultButton = (
        <button
            type="button"
            {...buttonProps}
            onClick={onClick}
            disabled={readOnly}
        >
            {buttonContent}
        </button>
    );
    const customComponent = CustomButtonComponent ? (<CustomButtonComponent
        handleSubmit={onClick}
        setValues={setValues}
        {...otherProps}
    />) : null;
    return (
        <li className="mde-header-item">
            {CustomButtonComponent ? customComponent : defaultButton}
        </li>
    );
};
