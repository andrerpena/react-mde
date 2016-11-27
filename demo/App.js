import React, { Component } from 'react';
import ReactMde from '../src/ReactMde';

class App extends Component {

    state = {
        value: ""
    }

    handleValueChange(value) {

    }

    render() {
        return (
            <div className="container">
                <ReactMde value={this.state.value} onChange={this.handleValueChange.bind(this)} />
            </div>
        );
    }
}

export default App;