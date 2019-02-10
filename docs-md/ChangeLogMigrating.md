# Change log / Migrating

## From 6.* to 7.*

Major differences

- No more Draft.js
- No more FontAwesome, even though you can still use it if you want 
- No more external dependencies

## From 5.* to 6.*

Major differences

- The `value` now is a simple markdown string. Under the hoods, `react-mde` will cache the Draft.js state
and only update it when the new provided string value is different than the last one emitted in the `onChange` event.
- The `commands` used to be an array of array of `Command`. Now they are an array of `CommandGroup` that contains a property 
`commands` which is an array of `Command`.
- There are no built in support of custom layouts anymore. This was necessary because I am not able
to maintain multiple layouts. In case it does'nt suit your needs, you can inspect the [supported layout implementation](https://github.com/andrerpena/react-mde/blob/master/src/ReactMde.tsx)
and implement your own. All the required dependencies are exported.

[More information here]: https://github.com/andrerpena/react-mde/issues/136

## From 4.\* to 5.\*

Major differences:

- `React-mde` is now built on top of `Draft.js`. This facilitates features that would otherwise be quite
difficult, the best examples being history management, mentions and pasting files.
- Showdown is no longer a dependency and server side markdown generation is now possible.
- The Command API is now much more capable and stable. For example, it now allows commands to be 
executed asynchronously.
- The default styling is now self-contained and easier to integrate into existing applications.

## From 3.\* to 4.\*

Major differences:

- Passing `commands` to `React-Mde` is now optional. If none is passed, it will automatically
use the default ones.
- Now the `React-mde` sub-components cannot be imported directly from the main package.
This change will not affect you if you don't using sub-components. This will not affect the majority
of the users.

    // 3.\* and below:
    import { ReactMarkdownTextArea } from "react-mde"
    // 4.\* and after:
    import { ReactMdeComponents } from "react-mde"
    const { ReactMarkdownTextArea } = ReactMdeComponents

Architectural differences:

- Now the layout is decoupled from `React-Mde` in such a way that now, introducing new layouts, like
horizontal and tabs, will not require breaking changes. The only layout available now is `Vertical`.

## From 2.* to 3.\*

Font Awesome 5 is now used, and it's not a NPM peer dependency anymore. 
It's up to you how to install it, it [can be installed in different ways](https://fontawesome.com/how-to-use/svg-with-js), but the easiest is just adding this to the `<head/>`:

    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>

## From 1.\* to 2.\*

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

## From 0.* to 1.*

Major differences:

- Instead of using the `getDefaultCommands` function, now the default commands are exported directly.
- The `textAreaId` and `textareaName` props were replaced by `textAreaProps` that allows you to pass whatever you want to the `textarea` component.
- The paths of the CSS and SCSS have changed.
