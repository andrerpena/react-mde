# react-mde

A simple yet powerful and extensible Markdown Editor editor for React. React-mde has no 3rd party dependencies. Min + Gzipped
package is around 15KB.

> React-mde is used in another tool I made, 🌐 https://remoted.io.

## Demo

- [Demo](http://andrerpena.me/react-mde/). 
- [Demo on CodeSandbox](https://codesandbox.io/s/vm1k17ymq0).
- [Demo *source* in TypeScript](https://github.com/andrerpena/react-mde/tree/master/demo).
- [Demo *source* in JSX](https://github.com/andrerpena/react-mde-test).

## Installing

    npm i react-mde
    
## Markdown Preview

React-mde is agnostic regarding how to preview Markdown. The examples will use [Showdown](https://github.com/showdownjs/showdown)

    npm install showdown
    
## Using

React-mde is a completely controlled component.

Minimal example using Showdown:
```jsx
import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: "**Hello world!!!**"
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  handleValueChange = (value) => {
    this.setState({ value });
  };

  render () {
    return (
      <div className="container">
        <ReactMde
          onChange={this.handleValueChange}
          value={this.state.value}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
        />
      </div>
    );
  }
}


```

### Customizing Icons

React-mde comes with SVG icons extracted from [FontAwesome](https://fontawesome.com/) included.

You can customize the way icons are resolved by passing your own `getIcon` that will return a ReactNode
given a command name.

```jsx
<ReactMde
    getIcon={(commandName) => <MyCustomIcon name={commandName} />}
    onChange={this.handleValueChange}
    // ...
/>
```

## React-mde Props

The types are described below

- **value: string**: The Markdown value.
- **onChange**: (value: string): Event handler for the `onChange` event.
- **selectedTab: "write" | "preview"**: The currently selected tab.
- **onTabChange: (tab) => void**: Function called when the selected tab changes.
- **className?: string**: Optional class name to be added to the top level element.
- **commands?: CommandGroup[]**: An array of `CommandGroup`, which, each one, contain a `commands` property (array of `Command`). If no commands are specified, the default will be used. Commands are explained in more details below.
- **generateMarkdownPreview: (markdown: string) => Promise<string>;**: Function that should return the generated HTML for the preview. If this `prop` is falsy, then no preview is going to be generated.
- **getIcon?: (commandName: string) => React.ReactNode }** An optional set of button content options, including an `iconProvider` to allow custom icon rendering.
options. It is recommended to [inspect the layouts source code](https://github.com/andrerpena/react-mde/tree/master/src/components-layout) to see what options can be passed to each
while the documentation is not complete.
- **emptyPreview**: What to display in the preview in case there is no markdown. Value can be string, React Element or anything React can render.
- **emptyPreviewHtml (deprecated)**: What to display in the preview in case there is no markdown. Deprecated in favor of emptyPreview
- **readOnly?: boolean**: Flag to render the editor in read-only mode.
- **textAreaProps**: Extra props to be passed to the `textarea` component.
- **l18n**: A localization option. It contains the strings `write` and `preview`.
- **minEditorHeight (number)**: The minimum height of the editor.
- **maxEditorHeight (number)**: The max height of the editor (after that, it will scroll).
- **minPreviewHeight (number)**: The minimum height of the preview.


## Styling

The following styles from React-mde should be added: (Both .scss and .css files are available. No need to use sass-loader if you don't want)

Easiest way: import `react-mde-all.css`:

    import 'react-mde/lib/styles/css/react-mde-all.css';
    
If you want to have a more granular control over the styles, you can [import each individual file](https://github.com/andrerpena/react-mde/tree/master/src/styles).
    
If you're using SASS, you can override these variables: https://github.com/andrerpena/react-mde/blob/master/src/styles/variables.scss

## XSS concerns

React-mde does not automatically sanitize the HTML preview. If your using Showdown,
this has been taken from [their documentation](https://github.com/showdownjs/showdown/wiki/Markdown's-XSS-Vulnerability-(and-how-to-mitigate-it)):
    
> Cross-side scripting is a well known technique to gain access to private information of the users
of a website. The attacker injects spurious HTML content (a script) on the web page which will read 
the user’s cookies and do something bad with it (like steal credentials). As a countermeasure,
 you should filter any suspicious content coming from user input. Showdown doesn’t include an 
 XSS filter, so you must provide your own. But be careful in how you do it…
 
You might want to take a look at [showdown-xss-filter](https://github.com/VisionistInc/showdown-xss-filter).

## Commands

You can create your own commands or reuse existing commands. The `commands` property of React-mde
expects an array of `CommandGroup`, which contains an array of commands called `commands`. You can also
import the existing commands as displayed below:


```jsx
import ReactMde, {commands} from "react-mde";

const listCommands = [
    {
        commands: [
            commands.orderedListCommand,
            commands.unorderedListCommand,
            commands.checkedListCommand
        ]
    }
]

<ReactMde
    commands={listCommands}
    ...
/>
```

Please refer to the [commands source code](https://github.com/andrerpena/react-mde/tree/master/src/commands) to understand how they
should be implemented.

## Change log / Migrating from older versions

[Instructions here](https://github.com/andrerpena/react-mde/blob/master/docs-md/ChangeLogMigrating.md).

## Licence

React-mde is [MIT licensed](https://github.com/andrerpena/react-mde/blob/master/LICENSE).

## Third party

In order to make React-mde zero deps, I've embedded two small libraries:
- https://github.com/grassator/insert-text-at-cursor by https://twitter.com/d_kubyshkin
- https://github.com/JedWatson/classnames by https://twitter.com/JedWatson

## About the author

Made with :heart: by André Pena and [other awesome contributors](https://github.com/andrerpena/react-mde/graphs/contributors).
Check out my website: http://andrerpena.me.
