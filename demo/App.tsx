import * as React from "react";
import ReactMde from "../src";
import * as Showdown from "showdown";

export interface AppState {
  value: string;
}

export class App extends React.Component<{}, AppState> {
  converter: Showdown.Converter;

  constructor (props) {
    super(props);
    this.state = {
      value: "**Hello world!!!**"
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  handleValueChange = (value: string) => {
    this.setState({ value });
  };

  render () {
    return (
      <div className="container">
        <ReactMde
          onChange={this.handleValueChange}
          value={this.state.value}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
        />
      </div>
    );
  }
}
