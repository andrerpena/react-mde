# react-component-boilerplate

A dead simple and little opinionated template for creating react-components that will be published to NPM.

## Features

 - Dead simple
 - Demo and publish scripts. The publish script uses Babel to export a ES5 compatible version of your component. 
 The Styles (CSS, LESS or SASS) are copied as is to the lib folder. It's responsability of the consumer app to add the styles to its bundle using Webpack or whatever.
 - Hot module replacement in demo
 - Webpack configuration for the demo and production
 - Sass and LESS loaders for the demo
 - Absolutely no dependencies on the final component besides `react` and `react-dom`.

## Non-Features, pick your own...

 - No Redux or any state management
 - No Routing
 - No Testing
 
## Using

 - Create a GitHub repo for your awesome component
 - Clone the boilerplate -> `git clone https://github.com/andrerpena/react-component-boilerplate.git `
 - Copy its contents to the folder of your awesome component
 - Open the `package.json` file and change these properties: `name`, `version`, `description`, `repository.url`, `author`, `bugs.url` and `homepage`.
 - Set `NODE_ENV` to developoment and `npm install`.
 - Commit and push your awesome component

*I know you can clone the boilerplate directly to directory of your component and change the remote but let's keep it simple.

## Commands

 - `npm start`: Starts the demo
 - `npm run publsh`: Creates a `lib` folder containing what is going to be published to NPM.

## Publishing to NPM

  - `npm-adduser` // will let you create a user / login
  - `npm-publish` // will deploy your binaries to `npmjs.org`.

## File structure:

 - `demo`: Contains the demo. The `server.js` is what is triggered when you type `npm start`
 - `src`: Contains the source code of your awesome component. `index.js` is the entry point of your library.
