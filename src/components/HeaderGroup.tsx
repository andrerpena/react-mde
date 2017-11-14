import * as React from 'react';

export interface HeaderGroupProps {
}

export const HeaderGroup: React.SFC<HeaderGroupProps> = (props) => {
    return (
        <ul className="mde-header-group">
            {props.children}
        </ul>
    );
};
