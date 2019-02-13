import * as React from "react";
import ReactMde from "../src";
import * as Showdown from "showdown";

export interface AppState {
    value: string;
    tab: "write" | "preview"
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
        this.setState({value});
    };

    handleTabChange = (tab: "write" | "preview") => {
        this.setState({tab})
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
                />
            </div>
        );
    }
}
