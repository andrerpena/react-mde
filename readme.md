# 📝 react-mde

[![MinZipped](https://badgen.net/bundlephobia/minzip/react-mde)](https://bundlephobia.com/result?p=react-mde)

A simple yet powerful and extensible **React Markdown Editor**. React-mde has no 3rd party dependencies.

## Demo

- [Demo](http://andrerpena.me/react-mde/)
- [Demo on CodeSandbox](https://codesandbox.io/s/react-mde-latest-9i70s)

## Goal

The goal is to make react-mde to look and behave like the Github's Markdown editor. These are the major remaining features:

- [ ] [Mentions support](https://github.com/andrerpena/react-mde/issues/200) (under development)
- [ ] [Image upload support](https://github.com/andrerpena/react-mde/issues/189)
- [ ] Design improvements

## Installing

    npm i react-mde
    
## Markdown Preview

React-mde is agnostic regarding how to preview Markdown. The examples will use [Showdown](https://github.com/showdownjs/showdown)

    npm install showdown
    
> from version 7.4, it is also possible to return a Promise to React Element from `generateMarkdownPreview`, which makes
it possible to use [ReactMarkdown](https://github.com/rexxars/react-markdown) as a preview. [View issue](https://github.com/andrerpena/react-mde/issues/161).
    
## Using

React-mde is a completely controlled component.

Minimal example using Showdown. [View live on CodeSandBox](https://codesandbox.io/s/react-mde-latest-9i70s):
```jsx
import * as React from "react";
import ReactMde from "react-mde";
import ReactDOM from "react-dom";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

export default function App() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">("write");
  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  );
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
- **classes?**: [An object](https://github.com/andrerpena/react-mde/blob/master/src/classes.ts) containing the following optional properties: *reactMde*, *toolbar*, *preview*, *textArea* and *grip*. 
This allows for passing class names to each of the inner components of React-mde. Classes defined in the *classes* prop
follow the specification of [Jed Watson's classNames project](https://github.com/JedWatson/classnames).
- **className?: string**: OBSOLETE - Optional class name to be added to the top level element. Use the *classes* prop instead.
- **commands?: CommandGroup[]**: An array of `CommandGroup`, which, each one, contain a `commands` property (array of `Command`). If no commands are specified, the default will be used. Commands are explained in more details below.
- **generateMarkdownPreview: (markdown: string) => Promise<string | ReactElement>;**: Function that should return a Promise to the generated HTML or a React element for the preview. If this `prop` is falsy, then no preview is going to be generated.
- **getIcon?: (commandName: string) => React.ReactNode }** An optional set of button content options, including an `iconProvider` to allow custom icon rendering.
options. It is recommended to [inspect the layouts source code](https://github.com/andrerpena/react-mde/tree/master/src/components-layout) to see what options can be passed to each
while the documentation is not complete.
- **loadingPreview**: What to display in the preview while it is loading. Value can be string, React Element or anything React can render.
- **emptyPreviewHtml (deprecated)**: What to display in the preview while it is loading. Deprecated in favor of loadingPreview
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

Starting from version 7.4, it is also possible to return a Promise to a React Element from `generateMarkdownPreview`, which makes
it possible to use [ReactMarkdown](https://github.com/rexxars/react-markdown) as a preview. [View issue](https://github.com/andrerpena/react-mde/issues/161).
ReactMarkdown has built-in XSS protection.
  

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
