import * as React from "react";
import ReactMde, { ReactMdeTypes, ReactMdeCommands } from "../src";

interface AppState {
    mdeState: ReactMdeTypes.MdeState;
}

export class App extends React.Component<{}, AppState> {

    constructor(props) {
        super(props);
        this.state = {
            mdeState: null,
        };
    }

    handleValueChange = (mdeState: ReactMdeTypes.MdeState) => {
        this.setState({mdeState: mdeState});
    }

    render() {
        return (
            <div className="container">
                <ReactMde
                    textAreaProps={{
                        id: "ta1",
                        name: "ta1",
                    }}
                    value={this.state.mdeState}
                    onChange={this.handleValueChange}
                    commands={ReactMdeCommands.getDefaultCommands()}
                    showdownOptions={{tables: true, simplifiedAutoLink: true}}
                />
            </div>
        );
    }
}
