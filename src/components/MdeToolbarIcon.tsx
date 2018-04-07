import * as React from "react";

export interface MdeToolbarIconProps {
    icon: string;
}

export const MdeToolbarIcon: React.SFC<MdeToolbarIconProps> = (({icon}) => {
    return <i className={`fas fa-${icon}`} aria-hidden="true"/>;
});
