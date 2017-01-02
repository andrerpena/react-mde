import React, { Component } from 'react';
import ReactMde from '../src/ReactMde';

class App extends Component {

    state = {
        mdeValue: {text: "", selection: null}
    }

    handleValueChange(value) {
        this.setState({mdeValue: value});
    }

    render() {
        return (
            <div className="container">
                <ReactMde value={this.state.mdeValue} onChange={this.handleValueChange.bind(this)} />
            </div>
        );
    }
}

export default App;