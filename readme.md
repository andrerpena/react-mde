# 📝 react-mde

[![npm](https://img.shields.io/npm/dt/react-mde)](https://www.npmjs.com/package/react-mde)
[![MinZipped](https://badgen.net/bundlephobia/minzip/react-mde)](https://bundlephobia.com/result?p=react-mde)
[![twitter](https://img.shields.io/twitter/follow/andrerpena?style=social)](https://twitter.com/andrerpena)

A simple yet powerful and extensible **React Markdown Editor**. React-mde has no 3rd party dependencies.

- Check the 10.0.0 breaking changes on how to migrate from 9.*: https://github.com/andrerpena/react-mde/releases/tag/10.0.0
- Check the 9.0.0 breaking changes on how to migrate from 8.*: https://github.com/andrerpena/react-mde/releases/tag/9.0.0.

## Demo

- [Demo](http://andrerpena.me/react-mde/)
- [CodeSandbox Demo JSX ](https://codesandbox.io/s/react-mde-latest-5i5ov?file=/src/index.js)
- [CodeSandbox Demo TSX ](https://codesandbox.io/s/react-typescript-i3wju?file=/src/index.tsx)
- [CodeSandbox Demo TSX - Customized toolbar](https://codesandbox.io/s/react-typescript-m7cbx?file=/src/index.tsx)
- [CodeSandbox Demo TSX - Custom command](https://codesandbox.io/s/react-typescript-icqgv?file=/src/index.tsx)

## Goal

The goal is to make react-mde to look and behave like the Github's Markdown editor. These are the major remaining features/changes. I plan to tackle them in orde but if you want to help, that would be amazing.

- [ ] [Design improvements](https://github.com/andrerpena/react-mde/issues/207)
- [ ] [Image upload support](https://github.com/andrerpena/react-mde/issues/189)


## Installing

    npm i react-mde
    
## Markdown Preview

React-mde is agnostic regarding how to preview Markdown. The examples will use [Showdown](https://github.com/showdownjs/showdown)

    npm install showdown
    
It is also possible to return a Promise to React Element from `generateMarkdownPreview`, which makes
it possible to use [ReactMarkdown](https://github.com/rexxars/react-markdown) as a preview. [View issue](https://github.com/andrerpena/react-mde/issues/161).
    
## Using

React-mde is a completely controlled component.

Minimal example using Showdown. [View live on CodeSandBox](https://codesandbox.io/s/react-mde-latest-bm6p3):
```jsx
import * as React from "react";
import ReactMde from "react-mde";
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

React-mde comes with SVG icons extracted from [FontAwesome](https://fontawesome.com/).

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
- **classes?: [Object](https://github.com/andrerpena/react-mde/blob/master/src/classes.ts) **: An object containing the following optional properties: *reactMde*, *toolbar*, *preview*, *textArea*, *grip* and *suggestionsDropdown*. 
This allows for passing class names to each of the inner components of React-mde. Classes defined in the *classes* prop
follow the specification of [Jed Watson's classNames project](https://github.com/JedWatson/classnames).
- **commands?: Record<string, Command>**: An object with string properties representing keys, and a Command object as value for each key. These are custom commands. Commands are explained in more details below.
- **toolbarCommands?: string[][]**: Array of array of strings, indicating which commands should be displayed. Each outer array is a group. Example: `[["code", "bold"], ["italic"]]`
- **generateMarkdownPreview: (markdown: string) => Promise<string | ReactElement>;**: Function that should return a Promise to the generated HTML or a React element for the preview. If this `prop` is falsy, then no preview is going to be generated.
- **getIcon?: (commandName: string) => React.ReactNode }** An optional set of button content options, including an `iconProvider` to allow custom icon rendering.
options. It is recommended to [inspect the layouts source code](https://github.com/andrerpena/react-mde/tree/master/src/components-layout) to see what options can be passed to each
while the documentation is not complete.
- **loadingPreview**: What to display in the preview while it is loading. Value can be string, React Element or anything React can render.
- **readOnly?: boolean**: Flag to render the editor in read-only mode.
- **textAreaProps?**: Extra props to be passed to the `textarea` component.
- **l18n?**: A localization option. It contains the strings `write`, `preview` and `uploadingImage`.
- **minEditorHeight?: number**: The minimum height of the editor.
- **maxEditorHeight?: number**: The max height of the editor (after that, it will scroll).
- **minPreviewHeight?: number**: The minimum height of the preview.
- **loadSuggestions?: (text: string, triggeredBy: string) => Promise<Suggestion[]>**: Function to load mention suggestions based on the
given `text` and `triggeredBy` (character that triggered the suggestions). The result should be an array of `{preview: React.ReactNode, value: string}`.
The `preview` is what is going to be displayed in the suggestions box. The `value` is what is going to be inserted in the `textarea` on click or enter.
- **suggestionTriggerCharacters (string[])**: Characters that will trigger mention suggestions to be loaded. This property is useless
without `loadSuggestions`.
- **childProps?: [Object](https://github.com/andrerpena/react-mde/blob/master/src/child-props.ts#L16)**: An object containing props to be passed to `writeButton`, `previewButton`, `commandButtons` and `textArea`.

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

It is also possible to return a Promise to a React Element from `generateMarkdownPreview`, which makes
it possible to use [ReactMarkdown](https://github.com/rexxars/react-markdown) as a preview. [View issue](https://github.com/andrerpena/react-mde/issues/161).
ReactMarkdown has built-in XSS protection.

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

[![twitter](https://img.shields.io/twitter/follow/andrerpena?style=social)](https://twitter.com/andrerpena)
