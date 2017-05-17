import React, { Component } from 'react';
import { ReactMde, ReactMdeCommands } from '../src/';

class App extends Component {

    constructor() {
        super();
        this.handleValueChange = this.handleValueChange.bind(this);
        this.state = {
            mdeValue: { text: '', selection: null }
        };
    }

    handleValueChange(value) {
        this.setState({ mdeValue: value });
    }

    render() {
        // get the default commands, you can pick individual commands if you like, or add your own
        const commands = ReactMdeCommands.getDefaultCommands();
        return (
            <div className="container">
                <ReactMde
                    textareaId="ta1"
                    textareaName="ta1"
                    value={this.state.mdeValue}
                    onChange={this.handleValueChange}
                    commands={commands}
                />
            </div>
        );
    }
}

export default App;
