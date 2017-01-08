# react-mde

A simple yet powerful and extensible Markdown Editor editor for React, inspired by GitHub.

Demo
---

Checkout the [demo](http://andrerpena.me/react-mde)

Installing
---

    npm install --save react-mde

Using
---

React-mde is a completely controlled component. Example of usage:

    import React, { Component } from 'react';
    import { ReactMde, ReactMdeCommands } from 'react-mde';

    class App extends Component {

        state = {
            mdeValue: {text: "", selection: null}
        }

        handleValueChange(value) {
            this.setState({mdeValue: value});
        }

        render() {
            // get the default commands, you can pick individual commands if you like, or add your own
            let commands = ReactMdeCommands.getDefaultCommands()
            return (
                <div className="container">
                    <ReactMde value={this.state.mdeValue} onChange={this.handleValueChange.bind(this)} commands={commands} />
                </div>
            );
        }
    }

    export default App;

Props:

 - **value**: The current value. This property should look like `{text: "", selection: [2, 3]}` where `text` is the text and `selection` is an array with
 the beggining and the end of the selection. Passing null to `selection` is perfectly fine.
 - **onChange**: Function that should handle the value. The `value` passed as a parameter to the `onChange` function is of the same type as the `value` prop above.
 - **commands**: An array or array of command objects. The first array represents groups, the second array represents commands inside that group. Take a look of how to create a custom command below.

Styling
---

2 styles from React-mde should be added:

 - **react-mde.scss**: The styling of the component itself.
 - **markdown-default-theme.scss**: The markdown theme to be used inside the preview box.

Example:

    import '../node_modules/normalize.css/normalize.css';
    import '../node_modules/font-awesome/css/font-awesome.css';
    import '../node_modules/react-mde/styles/react-mde.scss';
    import '../node_modules/react-mde/markdown-default-theme.scss';

Commands
---

React-mde allows you to implement your own commands.

Anatomy of a command:

    {
        icon: 'bold',
        tooltip: 'Add bold text',
        execute: function (text, selection) {
            if (text && text.length && selection[0] == selection[1]) {
                // the user is pointing to a word
                selection = getSurroundingWord(text, selection[0]).position;
            }
            // the user is selecting a word section
            var {newText, insertionLength} = insertText(text, '**', selection[0]);
            newText = insertText(newText, '**', selection[1] + insertionLength).newText;
            return {
                text: newText,
                selection: [selection[0] + insertionLength, selection[1] + insertionLength]
            }
        }
    }

props:

 - **icon**: If this is a text, it will print a `font-awesome` `<i/>` element with the classes `fa fa-${icon}`. Passing `bold` will print `<i className="fa fa-bold"></i>`.
 If the passing value is a React element, it will print the react element.
 - **tooltip**: If any, it will print a tooltip with the passed text.
 - **execute**: The actual function that will execute the command. This function accepts 2 parameters: `text`, which is the whole textarea text before your command, and `selection`, a 2 items array containing the beggining and end of the current selection.
 Your function should return the current `text` (after your command) and the current `selection` (after your command).

 Next steps
 ---

  - [] Add commands for headings
  - [] Add support for @mentions and #hashtags with dropdown and autocomplete

  Licence
  ---

  React-mde is MIT licensed

  About the author
  ---

  Made with :heart: by André Pena. Check out my website: http://andrerpena.me