# react-mde

A simple yet powerful and extensible Markdown Editor editor for React.

## Demo

- [Demo](http://andrerpena.me/react-mde/). [Source](https://github.com/andrerpena/react-mde/tree/master/demo).
- [Demo on CodeSandbox](https://codesandbox.io/s/o5vpjwyp79).

## Installing

    // 6.0.0-alpha.1 version:
    npm i react-mde@6.0.0-alpha.1

    // 5.8 version:
    npm i react-mde
    
## Using

React-mde is a completely controlled component.

Minimal example using Showdown:
```jsx
import * as React from "react";
import ReactMde from "../src";
import * as Showdown from "showdown";

export interface AppState {
  value: string;
}

export class App extends React.Component<{}, AppState> {
  converter: Showdown.Converter;

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

  handleValueChange = (value: string) => {
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

By default, React-mde will use Font Awesome class names to render icons (see above for how to install).
The default icon provider returns icons that look like the following:

```jsx
<i className={`fas fa-${icon}`} aria-hidden="true"/>
```

This can be changed by passing a `buttonContentOptions` prop to the `ReactMde` component with an `iconProvider` option to tell React-mde how to render icons.

For example, you can use your own custom icon component by changing the `iconProvider`:

```jsx
<ReactMde
    buttonContentOptions={{
        iconProvider: name => <MyCustomIcon name={name} />,
    }}
    onChange={this.handleValueChange}
    // ...
/>
```

In order to use Font Awesome 4 classes, you can pass the following prop:
```
buttonContentOptions={{
    iconProvider: name => <i className={`fa fa-${name}`} />,
}}
```
This will cause React-mde to use FA4-style classnames.

## Custom props
[See docs](docs/customButton.md "See docs")

## React-mde Props

The types are described below

- **value**: string**: The Markdown value.
- **onChange**: (value: string): Event handler for the `onChange` event.
- **className?: string**: Optional class name to be added to the top level element.
- **commands?: CommandGroup[]**: An array of `CommandGroup`, which, each one, contain a `commands` property (array of `Command`). If no commands are specified, the default will be used. Commands are explained in more details below.
- **generateMarkdownPreview: (markdown: string) => Promise<string>;**: Function that should return the generated HTML for the preview. If this `prop` is falsy, then no preview is going to be generated.
- **buttonContentOptions?: { iconProvider: (iconName: string) => React.ReactNode }** An optional set of button content options, including an `iconProvider` to allow custom icon rendering.
options. It is recommended to [inspect the layouts source code](https://github.com/andrerpena/react-mde/tree/master/src/components-layout) to see what options can be passed to each
while the documentation is not complete.
- **emptyPreviewHtml**: What to display in the preview in case there is no markdown. 
- **readOnly?: boolean**: Flag to render the editor in read-only mode.
- **draftEditorProps**: Extra props to be passed to the Draft.js `Editor` component.
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

You also need Font Awesome for the toolbar icons. Font Awesome 5 [can be installed in different ways](https://fontawesome.com/how-to-use/svg-with-js),
but the easiest is just adding this to the `<head/>`:

    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>

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

React-mde allows you to use the build-in commands, implement your own commands, or both. If you wish
to implement your own commands, please refer to the [commands source code](https://github.com/andrerpena/react-mde/tree/master/src/commands) to understand how they
should be implemented.

## Change log / Migrating from older versions

[Instructions here](https://github.com/andrerpena/react-mde/blob/master/docs-md/ChangeLogMigrating.md).

## Roadmap

Check the project here: https://github.com/andrerpena/react-mde/projects/1

## Licence

React-mde is [MIT licensed](https://github.com/andrerpena/react-mde/blob/master/LICENSE).

## About the author

Made with :heart: by André Pena and [other awesome contributors](https://github.com/andrerpena/react-mde/graphs/contributors).
Check out my website: http://andrerpena.me.
