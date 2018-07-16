import * as React from "react";

const containerStyle = {
  "width": "200px",
  "border": "1px solid #c8ccd0",
  "height": "50px",
  "position": "absolute",
  "background": "#fff",
  "zIndex": "999",
  "padding": "5px",
};

const buttonStyle = {
  "textAlign": "center",
  "width": "100%"
};

const imagePlaceholder = "https://www.comet.ml/images/logo_comet_dark.png"

export default class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    props.setValues(imagePlaceholder);
  }

  handleClick() {
    const {isOpen} = this.state;
    this.setState({isOpen: !isOpen});
  }

  handleTextChange(e) {
    this.props.setValues(e.target.value)
  }

  handleSubmit() {
    this.props.handleSubmit();
    this.setState({isOpen: false})
  }

  render() {
    const {isOpen} = this.state;

    return <div>
      <button onClick={this.handleClick}> Upload Image </button>
      {isOpen &&
        <div style={containerStyle}>
          <input type="text" onChange={this.handleTextChange} style={{"width": "100%"}} value={imagePlaceholder}/>
          <button onClick={this.handleSubmit} style={buttonStyle} >Submit </button>
        </div>
      }
    </div>
  }
}