## Custom Buttons

1. `ImageUploaderCommand.js` file:
```
import {Command} from "../types";
import ButtonComponent from "./ButtonComponent";
let myVal = "def";
const customCommand: Command = {
    buttonContentBuilder: ({ iconProvider }) => iconProvider("bold"),
    execute: (state) => {
        /*...*/
    },
    CustomButtonComponent: ButtonComponent,
    setValues: (value) => {
        myVal = value;
    },
};
export default customCommand;
```

2. Set the `commands` prop in `<ReactMde />`:

```
import * as React from "react";
import * as Showdown from "showdown";
import ReactMde, {ReactMdeTypes} from "../../../src/index";
import {storiesOf} from "@storybook/react";
import CustomCommand from "./path/to/ImageUploaderCommand";

const commands = [
    [CustomCommand],
];

interface State {
    mdeState: ReactMdeTypes.MdeState;
}

class ReactMdeButtonExample extends React.Component {
    converter: Showdown.Converter;

    constructor(props) {
        super(props);
        this.state = {
            mdeState: {
                markdown: "Custom Button with functionality",
            },
        };
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true,
        });
    }

    handleValueChange = (mdeState: ReactMdeTypes.MdeState) => {
        this.setState({mdeState});
    };

    render() {
        return (
            <ReactMde
                onChange={this.handleValueChange}
                editorState={this.state.mdeState}
                generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
                commands={commands}
            />
        );
    }
}
```

3.  Invoke `this.props.setValues()` and `this.props.handleSubmit()` in `ButtonComponent.tsx`:

```
export default class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    props.setValues(imagePlaceholder);
  }

  handleTextChange(e) {
    this.props.setValues(e.target.value)
  }

  handleSubmit() {
    this.props.handleSubmit();
  }

  render() {
    return <div>
      <button onClick={this.handleClick}> Upload Image </button>
        <div>
          <input  onChange={this.handleTextChange}  />
          <button onClick={this.handleSubmit} >Submit </button>
        </div>
      }
    </div>
  }
}
```