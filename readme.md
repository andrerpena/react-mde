# react-mde

A simple yet powerful and extensible Markdown Editor editor for React, inspired by GitHub.

![image](https://github.com/andrerpena/react-mde/blob/master/assets/react-mde.png)

## Demo

**Live** [demo](http://andrerpena.me/react-mde).

**JavaScript** demo project: https://github.com/andrerpena/react-mde-js-demo

**TypeScript** demo project: https://github.com/andrerpena/react-mde-ts-demo

## Installing

    npm install --save react-mde

## Dependencies

`React-mde` currently depends on:

- Font Awesome - For the icons (this dependency will be removed soon)
- Showdown - For rendering the markdown preview
 
So...

    npm install --save showdown font-awesome

## Using

React-mde is a completely controlled component. 

**Example in JavaScript:**

    import React, { Component } from 'react';
    import ReactMde, { ReactMdeCommands } from 'react-mde';
    
    export default class App extends Component {
    
        constructor() {
            super();
            this.state = {
                reactMdeValue: {text: '', selection: null},
            };
        }
    
        handleValueChange = (value) => {
            this.setState({reactMdeValue: value});
        }
    
        render() {
            return (
                <div className="container">
                    <ReactMde
                        textAreaProps={{
                            id: 'ta1',
                            name: 'ta1',
                        }}
                        value={this.state.reactMdeValue}
                        onChange={this.handleValueChange}
                        commands={ReactMdeCommands.getDefaultCommands()}
                    />
                </div>
            );
        }
    }
    
**Example in TypeScript**:

    import * as React from 'react';
    import ReactMde, { ReactMdeCommands, ReactMdeTypes } from 'react-mde';
    
    interface AppProps {
    }
    
    interface AppState {
        reactMdeValue: ReactMdeTypes.Value;
    }
    
    export class App extends React.Component<AppProps, AppState> {
    
        constructor(props: AppProps) {
            super(props);
            this.state = {
                reactMdeValue: {text: ''},
            };
        }
    
        handleValueChange = (value: ReactMdeTypes.Value) => {
            this.setState({reactMdeValue: value});
        }
    
        render() {
            return (
                <div className="container">
                    <ReactMde
                        textAreaProps={{
                            id: 'ta1',
                            name: 'ta1',
                        }}
                        value={this.state.reactMdeValue}
                        onChange={this.handleValueChange}
                        commands={ReactMdeCommands.getDefaultCommands()}
                    />
                </div>
            );
        }
    }
   

Props:

- **textAreaProps**: Whatever you want to pass to the `textarea` component.
- **value**: The current value. This property should look like `{text: "", selection: {start:0, end:2}` where `text` is the text and `selection` is
an object containint `start` and `end` representing what should be selected. Passing null to `selection` is perfectly fine.
- **onChange**: Function that should handle the value. The `value` passed as a parameter to the `onChange` function is of the same type as the `value` prop above.
- **commands**: An array or array of command objects. The first array represents groups, the second array represents commands inside that group. Take a look of how to create a custom command below.

## Styling

The following tyles from React-mde should be added: (Both .scss and .css files are available. No need to use sass-loader if you don't want)

Easiest way: import `react-mde-all.css`:

    import 'react-mde/lib/styles/css/react-mde-all.css';
    
If you want to have a more granular control over the styles, you can import each individual file:

    import 'react-mde/lib/styles/css/react-mde.css';
    import 'react-mde/lib/styles/css/react-mde-toolbar.css';
    import 'react-mde/lib/styles/css/react-mde-textarea.css';
    import 'react-mde/lib/styles/css/react-mde-preview.css';

You still have to import `font-awesome` while we don't embed the icons for the toolbar commands, `normalize` is optional:

    import '../node_modules/normalize.css/normalize.css';
    import '../node_modules/font-awesome/css/font-awesome.css';

## Commands

React-mde allows you to use the build-in commands, implement your own commands, or both.

There are two types of commands, the `button` commands (default if you don't say anything), and the `dropdown` commands.
`button` commands appear as button and execute a single action when clicked. `dropdown` commands have `subCommands` and
will display a dropdown when you click them.

### Anatomy of a button command

You don't have to create your own commands at all, but if you want, this is how a command looks like:

    const makeLinkCommand = {
        icon: 'link',
        tooltip:
            'Insert a link',
        execute:
            (text: string, selection: TextSelection) => {
                const {newText, insertionLength} = insertText(text, '[', selection.start);
                const finalText = insertText(newText, '](url)', selection.end + insertionLength).newText;
                return {
                    text: finalText,
                    selection: {
                        start: selection.start + insertionLength,
                        end: selection.end + insertionLength,
                    },
                };
            },
    };


**props:**

- **type**: The type of the command.
- **icon**: If this is a text, it will print a `font-awesome` `<i/>` element with the classes `fa fa-${icon}`. Passing `bold` will print `<i className="fa fa-bold"></i>`.
 If the passing value is a React element, it will print the react element.
- **tooltip**: If any, it will print a tooltip with the passed text.
- **execute**: The function that will actually execute the command. This function accepts 2 parameters: `text`, which is the whole textarea text before your command, and `selection`, a 2 items array containing the beggining and end of the current selection. Your function should return the current `text` (after your command) and the current `selection` (after your command).


### Anatomy of a dropdown command

    {
		type: 'dropdown',
		icon: 'header',
		subCommands: [
			{
				content: <p className="header-1">Header</p>,
				execute: function (text, selection) {
					return makeHeader(text, selection, '# ');
				}
			},
			{
				content: <p className="header-2">Header</p>,
				execute: function (text, selection) {
					return makeHeader(text, selection, '## ');
				}
			},
			{
				content: <p className="header-3">Header</p>,
				execute: function (text, selection) {
					return makeHeader(text, selection, '### ');
				}
			}
		]
	}


**props:**


 - **type**: The type of the command.
 - **icon**: If this is a text, it will print a `font-awesome` `<i/>` element with the classes `fa fa-${icon}`. Passing `bold` will print `<i className="fa fa-bold"></i>`.
 If the passing value is a React element, it will print the react element.
 - **subCommands**: A list of commands that will dropdown when you click the button.

**subCommands** is an array of objects with the following props:

 - **content**: A React component that will be displayed within the `li`.
 - **execute**: The function that will actually execute the command. This function accepts 2 parameters: `text`, which is the whole textarea text before your command, and `selection`, a 2 items array containing the beggining and end of the current selection.
 Your function should return the current `text` (after your command) and the current `selection` (after your command).

## Migrating from 1.* to 2.*

2.* is a major refactoring of the code to improve composability

Major differences:

- Now the main `react-mde` component is composed of 3 sub-components, the `ReactMdeToolbar`, the `ReactMdeTextArea` and the `ReactMdePreview`.
You can import `react-mde` directly or import each of the sub-components and have more flexibility building your own layout.
- Each sub-component now has its own CSS/SCSS file and we're now including a `react-mde-all.css`, or the SCSS alternative, for simplicity.
- We realized that on version 1.*, it was difficult to select which components you wanted to use. So now...


    import * as ReactMde from 'react-mde';
    ReactMde.ReactMdeComponents // contains all components and you can select your own components
    ReactMde.getDefaultComponents() // will return an array with all components
    
    
How to upgrade an existing 1.* JavaScript project: https://github.com/andrerpena/react-mde-js-demo/commit/e62af170fa258f7f17f29d41f395f24e9eaf3b72

How to upgrade an existing 1.* TypeScript project: https://github.com/andrerpena/react-mde-ts-demo/commit/d6718305c0132649cabca432e1e9415ea06cd643

## Migrating from the 0.* versions to 1.*

Major differences:

- Instead of using the `getDefaultCommands` function, now the default commands are exported directly.
- The `textAreaId` and `textareaName` props were replaced by `textAreaProps` that allows you to pass whatever you want to the `textarea` component.
- The paths of the CSS and SCSS have changed.

## Roadmap

Check the project here: https://github.com/andrerpena/react-mde/projects/1

## Licence

React-mde is MIT licensed

## About the author

Made with :heart: by André Pena. Check out my website: http://andrerpena.me
