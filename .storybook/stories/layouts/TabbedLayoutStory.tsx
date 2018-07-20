import * as React from "react";
import * as Showdown from "showdown";
import ReactMde, {ReactMdeTypes} from "../../../src/index";
import {storiesOf} from "@storybook/react";

interface State {
    mdeState: ReactMdeTypes.MdeState;
}

class VerticalLayoutStoryComponent extends React.Component<{}, State> {
    converter: Showdown.Converter;

    constructor(props) {
        super(props);
        this.state = {
            mdeState: {
                markdown: "**Hello world!**",
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
    onTabChange(tab) {
        console.log("tab", tab)
    };

    render() {
        return (
            <ReactMde
                layout="tabbed"
                onChange={this.handleValueChange}
                editorState={this.state.mdeState}
                generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
                readOnly={false}
                onTabChange={this.onTabChange}
            />
        );
    }
}

storiesOf("Layouts", module)
    .add("tabbed", () => (
        <VerticalLayoutStoryComponent/>
    ));
