import React, { Component } from 'react';
import ReactMde from '../src/ReactMde';
import ReactMdeCommands  from '../src/ReactMdeCommands'

class App extends Component {

    state = {
        mdeValue: {text: "", selection: null}
    }

    handleValueChange(value) {
        this.setState({mdeValue: value});
    }

    render() {
        let commands = ReactMdeCommands.getDefaultCommands()
        return (
            <div className="container">
                <ReactMde value={this.state.mdeValue} onChange={this.handleValueChange.bind(this)} commands={commands} />
            </div>
        );
    }
}

export default App;