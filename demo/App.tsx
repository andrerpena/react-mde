import * as React from "react";
import ReactMde, { ReactMdeCommands, ReactMdeTypes } from "../src";

interface AppProps {
}

interface AppState {
    reactMdeValue: ReactMdeTypes.Value;
}

export class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props);
        this.state = {
            reactMdeValue: {text: ""},
        };
    }

    handleValueChange = (value: ReactMdeTypes.Value) => {
        this.setState({reactMdeValue: value});
    }

    render() {
        return (
            <div className="container">
                <ReactMde
                    textAreaProps={{
                        id: "ta1",
                        name: "ta1",
                    }}
                    className="column"
                    value={this.state.reactMdeValue}
                    onChange={this.handleValueChange}
                    commands={ReactMdeCommands.getDefaultCommands()}
                    showdownOptions={{tables: true}}
                />
            </div>
        );
    }
}
