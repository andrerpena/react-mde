Introduction 
===
A simple yet powerful and extensible **React Markdown Editor** that aims to have feature parity with the Github Markdown editor. 
React-mde has no 3rd party dependencies.

## [Demo](https://codesandbox.io/s/charming-marco-9m4z93?file=/src/index.tsx)

## Installing

    npm i react-headless-mde

## Using

```jsx
import {
 boldCommand,
 italicCommand,
 linkCommand,
 useTextAreaMarkdownEditor,
} from 'react-mde';

export const MarkdownEditor = () => {
  const { ref, commandController } = useTextAreaMarkdownEditor({
    commandMap: {
      bold: boldCommand, 
      italic: italicCommand,
      link: linkCommand,
    },
  });
 
  return (
    <div className={'mb-4'}>
      <div className={'mb-3 gap-1 flex flex-wrap'}>
        <button
          onClick={() => {
           commandController.executeCommand('bold')
          }}        
        >B</button>
      </div>

      <textarea ref={ref} />
  </div>
  );
};
```

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
