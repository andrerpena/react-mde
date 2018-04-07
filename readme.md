# react-mde

A simple yet powerful and extensible Markdown Editor editor for React. React-mde is built on top of [Draft.js](https://draftjs.org/).

![image](https://github.com/andrerpena/react-mde/blob/master/assets/react-mde-5.png)

## Demos

[Demo](http://andrerpena.me/react-mde/)

## Installing

    npm i --save react-mde

## Dependencies

React-mde currently depends on:

- [Draft.js](https://draftjs.org/). This facilitates features that would otherwise be quite
difficult. The best examples being history management, mentions and pasting files.
<!-- -->

    npm i --save draft-js

- [Font Awesome 5.*](https://fontawesome.com/) for the icons. This is not a hard dependency and there are plans to eliminate it altogether, but for now,
the button classes are meant to be resolved by Font Awesome, which can be installed [using your preferred method](https://fontawesome.com/how-to-use/svg-with-js).
The easiest is just add this to `<head/>`:
<!-- -->

    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
 
## Optional dependencies

- [Showdown](https://github.com/showdownjs/showdown). React-mde is not opinionated as to how to transform markdown into HTML and this can be done both in client-side,
like StackOverflow, or in server-side, like GitHub. The easiest way is to use Showdown and process it in client-side. If you
decide to do so, install Showdown:
<!-- -->

    npm i --save showdown

## Using

React-mde is a completely controlled component.
    
    Minimal example using Showdown:
    
    import * as React from "react";
    import ReactMde, {ReactMdeTypes} from "../src";
    import * as Showdown from "showdown";
    
    export interface AppState {
        mdeState: ReactMdeTypes.MdeState;
    }
    
    export class App extends React.Component<{}, AppState> {
    
        converter: Showdown.Converter;
    
        constructor(props) {
            super(props);
            this.state = {
                mdeState: null,
            };
            this.converter = new Showdown.Converter({tables: true, simplifiedAutoLink: true});
        }
    
        handleValueChange = (mdeState: ReactMdeTypes.MdeState) => {
            this.setState({mdeState});
        }
    
        render() {
            return (
                <div className="container">
                    <ReactMde
                        onChange={this.handleValueChange}
                        editorState={this.state.mdeState}
                        generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
                    />
                </div>
            );
        }
    }


## React-mde Props

The types are described below

- **editorState: MdeState**: The state of the editor. This contains the markdown, the HTML and the underlying Draft.js state.
- **className?: string**: Optional class name to be added to the top level element.
- **commands?: Command[][]**: An array of array of commands. If no commands are specified, the default will be used. Commands are explained in more details below.
- **onChange: (value: MdeState) => void**: Event handler for the `onChange` event.
- **generateMarkdownPreview: (markdown: string) => Promise<string>;**: Function that should return the generated HTML for the preview.
- **layout?: string**: The name of the layout to be used. For now, the only supported layout is the default: `vertical`.

## Styling

The following styles from React-mde should be added: (Both .scss and .css files are available. No need to use sass-loader if you don't want)

Easiest way: import `react-mde-all.css`:

    import 'react-mde/lib/styles/css/react-mde-all.css';
    
If you want to have a more granular control over the styles, you can import each individual file.
    
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

React-mde allows you to use the build-in commands, implement your own commands, or both.

## Composition and custom layouts

React-mde is designed to be composable and to facilitate new layouts

![architecture](https://github.com/andrerpena/react-mde/blob/master/assets/architecture.png)

## Change log / Migrating

[Instructions here](https://github.com/andrerpena/react-mde/blob/master/docs-md/ChangeLogMigrating.md).

## Roadmap

Check the project here: https://github.com/andrerpena/react-mde/projects/1

## Licence

React-mde is MIT licensed

## About the author

Made with :heart: by André Pena. Check out my website: http://andrerpena.me
