import * as React from "react";
import * as Showdown from "showdown";
import ReactMde, {ReactMdeTypes} from "../../../src/index";
import {storiesOf} from "@storybook/react";
import { MdeToolbarIcon } from "../../../src/components";

interface EmojiIconsStoryState {
    mdeState: ReactMdeTypes.MdeState;
}

const icons = {
  "bold": (<strong>B</strong>),
  "heading": "H",
  "italic": (<em>I</em>),
  "strikethrough": (<del>S</del>),
  "link": "🔗",
  "quote-right": (<strong>”</strong>),
  "code": "🤓",
  "image": "📸",
  "list-ul": "⏺",
  "list-ol": "#️⃣",
  "tasks": "📝",
};

const iconProvider = (name) => {
  return icons[name] || "❓";
};

class EmojiIconsStory extends React.Component<{}, EmojiIconsStoryState> {
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
    }

    render() {
        return (
            <ReactMde
                layout="horizontal"
                buttonContentOptions={{ iconProvider }}
                onChange={this.handleValueChange}
                editorState={this.state.mdeState}
                generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
            />
        );
    }
}

storiesOf("Icon Customization", module)
    .add("emojis", () => (
        <EmojiIconsStory/>
    ));
