import * as React from "react";
export interface MdeToolbarButtonProps {
    buttonContent: React.ReactNode;
    buttonProps?: any;
    onClick: React.MouseEventHandler<any>;
    readOnly: boolean;
    setValues?: any;
    CustomButtonComponent?: any;
    otherProps?: any;
}
export declare const MdeToolbarButton: React.SFC<MdeToolbarButtonProps>;
//# sourceMappingURL=MdeToolbarButton.d.ts.map