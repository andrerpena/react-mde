import * as React from 'react';
import ReactMde, { ReactMdeCommands, ReactMdeValue, ReactMdeTextSelection } from '../src';

interface AppProps {
}

interface AppState {
    reactMdeValue: ReactMdeValue;
}

export class App extends React.Component<AppProps, AppState> {

    constructor() {
        super();
        this.state = {
            reactMdeValue: {text: '', selection: null},
        };
    }

    handleValueChange = (value) => {
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
                    commands={ReactMdeCommands}
                />
            </div>
        );
    }
}
