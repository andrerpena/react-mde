import * as React from 'react';
import { Value } from '../src/types/Value';
import { ReactMde } from '../src/ReactMde';
import { defaultCommands } from '../src/ReactMdeCommands';

interface AppProps {
}

interface AppState {
    reactMdeValue: Value;
}

export class App extends React.Component<AppProps, AppState> {

    constructor() {
        super();
        this.handleValueChange = this.handleValueChange.bind(this);
        this.state = {
            reactMdeValue: {text: '', selection: null},
        };
    }

    handleValueChange(value) {
        this.setState({reactMdeValue: value});
    }

    render() {
        return (
            <div className="container">
                <ReactMde
                    textAreaProps={{
                        id: 'ta1',
                        name: 'ta1',
                    }}
                    value={this.state.reactMdeValue}
                    onChange={this.handleValueChange}
                    commands={defaultCommands}
                />
            </div>
        );
    }
}
