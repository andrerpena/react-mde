⚠️ Attention 
===
This repository is fork from original repo of andrerpena.

This repository is undergoing a huge refactoring and react-mde will now be headless, starting from version 12. Meaning, it won't be opinionated about styles anymore. The `master` branch now contains the new version. No updates to the 11.5.0 will ever come.

You can check out the headless version (12.*) with the `next` tag. [Here is a demo](https://codesandbox.io/s/keen-bash-9nv0q0?file=/src/index.tsx).

I will close all issues related to the 11.* version since that's no longer being maintained.

# 📝 The original react-mde (11.5.0)

[![npm](https://img.shields.io/npm/dt/react-mde)](https://www.npmjs.com/package/react-mde)
[![MinZipped](https://badgen.net/bundlephobia/minzip/react-mde)](https://bundlephobia.com/result?p=react-mde)
[![twitter](https://img.shields.io/twitter/follow/andrerpena?style=social)](https://twitter.com/andrerpena)

A simple yet powerful and extensible **React Markdown Editor** that aims to have feature parity with the Github Markdown editor. React-mde has no 3rd party dependencies.

## Demo

- [Demo JSX ](https://codesandbox.io/s/react-mde-latest-5i5ov?file=/src/index.js)
- [Demo JSX - Using ReactMarkdown instead of Showdown](https://codesandbox.io/s/react-mde-latest-forked-f9ti5?file=/src/index.js)
- [Demo TSX ](https://codesandbox.io/s/react-typescript-i3wju?file=/src/index.tsx)
- [Demo TSX - Customized toolbar](https://codesandbox.io/s/react-typescript-m7cbx?file=/src/index.tsx)
- [Demo TSX - Custom command](https://codesandbox.io/s/react-typescript-icqgv?file=/src/index.tsx)


## Installing

    npm i react-mde

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
