import * as React from "react";
import MDEditor from "../src";
import { Converter } from "showdown";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "## Hello",
      tab: "write"
    };
    this.converter = new Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  handleValueChange = value => this.setState({ value });

  handleTabChange = tab => this.setState({ tab });

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

  render() {
    return (
      <div className="container">
        <MDEditor
          onChange={this.handleValueChange}
          onTabChange={this.handleTabChange}
          value={this.state.value}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
          selectedTab={this.state.tab}
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
}
