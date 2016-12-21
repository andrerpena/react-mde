import React, { Component } from 'react';
import ReactMde from '../src/ReactMde';

class App extends Component {

    state = {
        mdeValue: {text: "abcde", selection: null}
    }

    handleValueChange(value) {
        this.setState({mdeValue: value});
    }

    render() {
        return (
            <div className="react-mde-demo container">
                <ReactMde value={this.state.mdeValue} onChange={this.handleValueChange.bind(this)} />
            </div>
        );
    }
}

export default App;