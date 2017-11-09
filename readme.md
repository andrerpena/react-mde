# react-mde

A simple yet powerful and extensible Markdown Editor editor for React, inspired by GitHub.

![image](https://github.com/andrerpena/react-mde/blob/master/assets/react-mde.png)

## Demo

Checkout the [demo](http://andrerpena.me/react-mde).

## Installing

    npm install --save react-mde

## Dependencies

`React-mde` currently depends on:

- Font Awesome - For the icons (this dependency will be removed soon)
- Showdown - For rendering the markdown preview
 
So...

    npm install --save showdown font-awesome

## Using

React-mde is a completely controlled component. Example of usage:

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
                        commands={ReactMdeCommands}
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

 - **react-mde/lib/styles/react-mde.scss**: The styling of the component itself.
 - **react-mde/lib/styles/react-mde-command-styles.scss**: This is the styling for the built-in commands. If these commands are not going to be used. This doesn't have to be included.
 - **react-mde/lib/styles/markdown-default-theme.scss**: The markdown theme to be used inside the preview box.

Example in importing styles in your `[entry_point].js`:

    import '../node_modules/normalize.css/normalize.css';
    import '../node_modules/font-awesome/css/font-awesome.css';
    import 'react-mde/lib/styles/css/react-mde.css';
    import 'react-mde/lib/styles/css/react-mde-command-styles.css';
    import 'react-mde/lib/styles/css/markdown-default-theme.css';

## Couldn't make this work on your project?

This is the minimum setup app to work with `react-mde`: https://github.com/andrerpena/react-mde-js-demo

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

## Roadmap

  - Add support for undoing a command by clicking it twice
  - Add support for @mentions and #hashtags with dropdown and autocomplete.
  - Add support for optionally server-rendering the markdown preview (like GitHub does)

## Licence

React-mde is MIT licensed

## About the author

Made with :heart: by André Pena. Check out my website: http://andrerpena.me
