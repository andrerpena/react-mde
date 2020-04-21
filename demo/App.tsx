import * as React from "react";
import ReactMde from "../src";
import * as Showdown from "showdown";
import { Suggestion } from "../src/types";

export interface AppState {
  value: string;
  tab: "write" | "preview";
}

const findIndicies = (source: string, needle: string): number[]  => {
  if (!source) {
    return [];
  }
  // if find is empty string return all indexes.
  if (!needle) {
    // or shorter arrow function:
    // return source.split('').map((_,i) => i);
    return source.split('').map(function(_, i) { return i; });
  }
  var result = [];
  for (let i = 0; i < source.length; ++i) {
    // If you want to search case insensitive use 
    // if (source.substring(i, i + find.length).toLowerCase() == find) {
    if (source.substring(i, i + needle.length) == needle) {
      result.push(i);
    }
  }
  return result;
}

const text = `
**Lorem** ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt 
ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo 
duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
`

export class App extends React.Component<{}, AppState> {
  converter: Showdown.Converter;

  constructor(props) {
    super(props);
    this.state = {
      value: text,
      tab: "write"
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

  handleTabChange = (tab: "write" | "preview") => {
    this.setState({ tab });
  };

  loadSuggestions = async (text: string) => {
    return new Promise<Suggestion[]>((accept, reject) => {
      setTimeout(() => {
        const suggestions: Suggestion[] = [
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
        accept(suggestions);
      }, 250);
    });
  };

  render() {
    return (
      <div className="container">
        <ReactMde
          onChange={this.handleValueChange}
          onTabChange={this.handleTabChange}
          value={this.state.value}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
          selectedTab={this.state.tab}
          loadSuggestions={this.loadSuggestions}
          suggestionTriggerCharacters={["@"]}
          classes={{
            suggestionsDropdown: "bbbb"
          }}
          highlight={(content) => {
            return findIndicies(content, "Lorem").map(startIndex => ({
              color: "pink",
              range: [startIndex, startIndex + "Lorem".length] as [number, number]
            }))
          }}
        />
        value:{" "}
        <input
          type="text"
          value={this.state.value}
          onChange={e => {
            this.handleValueChange(e.target.value);
          }}
        />
      </div>
    );
  }
}
