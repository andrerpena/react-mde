import * as React from "react";
import ReactMde from "../src";
import {Value} from "../src/types";

interface AppState {
    reactMdeValue: Value;
}

export class App extends React.Component<{}, AppState> {

    constructor(props) {
        super(props);
        this.state = {
            reactMdeValue: {text: ""},
        };
    }

    handleValueChange = (value: Value) => {
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
                    value={this.state.reactMdeValue}
                    onChange={this.handleValueChange}
                    showdownOptions={{tables: true, simplifiedAutoLink: true}}
                />
            </div>
        );
    }
}
