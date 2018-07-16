import * as React from "react";
import * as Showdown from "showdown";
import ReactMde, {ReactMdeTypes} from "../../../src/index";
import {storiesOf} from "@storybook/react";
import CustomCommand from "../../customButton/FullDuplexCommand";

const commands = [
    [CustomCommand],
];

interface State {
    mdeState: ReactMdeTypes.MdeState;
}

class VerticalLayoutStoryFullDuplexComponent extends React.Component<{}, State> {
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
    }
    receiveDataFromMde(data) {
        console.log(`parent got: "${data}"`);
    }
    render() {
        const otherProps = {
            data: "yo",
            recieveDataFromMde: (data)=>console.log(data),
        };
        return (
            <ReactMde
                layout="vertical"
                onChange={this.handleValueChange}
                editorState={this.state.mdeState}
                generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
                commands={commands}
                otherProps={otherProps}
            />
        );
    }
}

storiesOf("Custom", module)
    .add("full duplex", () => (
        <VerticalLayoutStoryFullDuplexComponent/>
    ));
