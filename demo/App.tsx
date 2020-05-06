import * as React from "react";
import ReactMde from "../src";
import * as Showdown from "showdown";
import { SaveImageHandler, Suggestion } from "../src/types";

export interface AppState {
  value: string;
  tab: "write" | "preview";
}

export class App extends React.Component<{}, AppState> {
  converter: Showdown.Converter;

  constructor(props) {
    super(props);
    this.state = {
      value: "**Hello world!!!**",
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
    const save: SaveImageHandler = async function*(data: ArrayBuffer) {
      // Promise that waits for "time" milliseconds
      const wait = function(time: number) {
        return new Promise((a, r) => {
          setTimeout(() => a(), time);
        });
      };

      // Upload "data" to your server
      // Use XMLHttpRequest.send to send a FormData object containing
      // "data"
      // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

      await wait(2000);
      // yields the URL that should be inserted in the markdown
      yield "https://picsum.photos/300";
      await wait(2000);

      // returns true meaning that the save was successful
      return true;
    };

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
          paste={{
            saveImage: save
          }}
        />
      </div>
    );
  }
}
