import * as React from "react";
import * as Showdown from "showdown";
import ReactMde from "../../../src/index";
import { storiesOf } from "@storybook/react";

interface State {
  value: string;
}

class VerticalLayoutStoryComponent extends React.Component<{}, State> {
  converter: Showdown.Converter;

  constructor(props) {
    super(props);
    this.state = { value: "**Hello world!**" };
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

  render() {
    return (
      <ReactMde
        layout="horizontal"
        onChange={this.handleValueChange}
        value={this.state.value}
        generateMarkdownPreview={markdown =>
          Promise.resolve(this.converter.makeHtml(markdown))
        }
      />
    );
  }
}

storiesOf("Layouts", module).add("horizontal", () => (
  <VerticalLayoutStoryComponent />
));
