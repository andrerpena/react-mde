import * as React from "react";

export default class FullFuplexButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const data = this.props.data;
    this.props.recieveDataFromMde(`Button got ${data}`);
  }

  render() {
    return <button onClick={this.handleSubmit} > send data back </button>
  }
}