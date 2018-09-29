import * as React from "react";

export interface MdeFontAwesomeIconProps {
    icon: string;
}

export const MdeFontAwesomeIcon: React.SFC<MdeFontAwesomeIconProps> = (({icon}) => {
    return <i className={`fas fa-${icon}`} aria-hidden="true"/>;
});
