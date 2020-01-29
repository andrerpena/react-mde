import React, { Component } from "react";
import { render } from "react-dom";
import { Converter } from "showdown";
import MDEditor from "../../src/index.js";
import "../../src/styles/all.scss";
import "./styles/demo.scss";
import "./styles/variables.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "## Hello"
    };
    this.converter = new Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  handleValueChange = value => this.setState({ value });

  loadSuggestions = async text => {
    return new Promise(resolve => {
      setTimeout(() => {
        const suggestions = [
          {
            preview: "Andre",
            value: "@andre"
          },
          {
            preview: "Angela",
            value: "@angela"
          },
          {
            preview: "David",
            value: "@david"
          },
          {
            preview: "Louise",
            value: "@louise"
          }
        ].filter(i => i.preview.toLowerCase().includes(text.toLowerCase()));
        resolve(suggestions);
      }, 250);
    });
  };

  render = () => (
    <div className="container">
      <MDEditor
        onChange={this.handleValueChange}
        value={this.state.value}
        generateMarkdownPreview={markdown =>
          Promise.resolve(this.converter.makeHtml(markdown))
        }
        loadSuggestions={this.loadSuggestions}
        suggestionTriggerCharacters={["@"]}
        minEditorHeight={300}
        classes={{
          suggestionsDropdown: "bbbb"
        }}
      />
    </div>
  );
}

render(<App />, document.getElementById("root"));
