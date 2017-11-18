import * as React from 'react';
import ReactMde, { ReactMdeCommands, ReactMdeValue } from '../src';

interface AppProps {
}

interface AppState {
    reactMdeValue: ReactMdeValue;
}

export class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props);
        this.state = {
            reactMdeValue: {text: ''},
        };
    }

    handleValueChange = (value: ReactMdeValue) => {
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
